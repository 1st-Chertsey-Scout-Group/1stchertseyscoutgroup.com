import { cn } from "@/lib/utils";
import { MenuButton, MenuItems, MenuItem, Menu } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useShop, type ShopStateSort } from "../state/shop.store";

type ShopSortProps = {
    sortOptions: ShopStateSort[]
};

export const ShopSort: React.FC<ShopSortProps> = ({ sortOptions }) => {
    return (<>
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium">
                    Sort
                    <ChevronDown
                        aria-hidden="true"
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0"
                    />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-background shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    {sortOptions.map((option) => (
                        <ShopSortOption key={option.name} option={option} />
                    ))}
                </div>
            </MenuItems>
        </Menu>
    </>)
}

type ShopSortOptionProps = {
    option: ShopStateSort
};

export const ShopSortOption: React.FC<ShopSortOptionProps> = ({ option }) => {
    const shop = useShop();

    const selectSortOption = () => {
        shop.actions.selectSortOption(option.name)
    }

    return (<>

        <MenuItem key={option.name}>
            <div
                className={cn(
                    'font-medium block px-4 py-2 text-sm data-[focus]:bg-gray-100 hover:text-primary cursor-pointer',
                )}
                onClick={selectSortOption}
            >
                {option.name}
            </div>
        </MenuItem>
    </>)
}