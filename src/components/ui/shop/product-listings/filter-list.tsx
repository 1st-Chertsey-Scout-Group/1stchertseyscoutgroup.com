import { cn } from "@/lib/utils";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus } from "lucide-react";
import { useShop, type ShopStateFilter, type ShopStateFilterOption } from "../state/shop.store";

type FilterProps = {
    type: "mobile" | "desktop";
    filter: ShopStateFilter
}

export const ShopFilterList: React.FC<FilterProps> = ({ type, filter }) => {
    return (
        <>
            <Disclosure key={filter.id} as="div" className={cn(
                type == "mobile" ? "border-t px-4" : "border-b",
                "border-gray-200 py-6"

            )}>
                <h3 className={cn(
                    type == "mobile" ? "-mx-2" : "", "-my-3 text-lg font-medium flow-root")}>
                    <DisclosureButton className={cn(type == "mobile" ? "px-2" : "", "group flex w-full items-center justify-between bg-background py-3")}>
                        <span className="font-medium">{filter.name}</span>
                        <span className="ml-6 flex items-center">
                            <Plus aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                            <Minus aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                    </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                    <div className={cn(
                        type == "mobile" ? "space-y-6" : "space-y-4")}>
                        {filter.options.map((option, index) => (
                            <FilterOption type={type} key={index} filterId={filter.id} option={option} />
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </>
    )
}

type FilterOptionProps = {
    type: "mobile" | "desktop";
    filterId: string;
    option: ShopStateFilterOption
}

const FilterOption: React.FC<FilterOptionProps> = ({ filterId, option, type }) => {
    const shop = useShop();

    const toggleFilterOption = () => {
        shop.actions.toggleFilterOption(filterId, option.value)
    }

    return (
        <>
            <div className="flex items-center">
                <input
                    defaultValue={option.value}
                    checked={option.checked}
                    id={`filter-${type}-${filterId}-${option.value}`}
                    name={`${filterId}[]`}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={toggleFilterOption}
                />
                <label
                    htmlFor={`filter-${type}-${filterId}-${option.value}`}
                    className={cn(type == "mobile" ? "min-w-0 flex-1" : "text-sm", "ml-3")}
                >
                    {option.label}
                </label>
            </div>
        </>)
}
