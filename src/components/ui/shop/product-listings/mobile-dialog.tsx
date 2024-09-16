import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useShop } from "../shop.store";
import { X } from "lucide-react";
import { ShopFilterList } from "./filter-list";

export const MobileDialog: React.FC = () => {
    const shop = useShop();

    return (
        <>
            <Dialog open={shop.mobileFiltersOpen} onClose={shop.actions.setMobileFiltersOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-background py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                    >
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-lg font-medium text-foreground">Filters</h2>
                            <button
                                type="button"
                                onClick={() => shop.actions.setMobileFiltersOpen(false)}
                                className="-mr-2 flex h-10 w-10 items-center justify-center bg-background p-2"
                            >
                                <span className="sr-only">Close menu</span>
                                <X aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4 border-t border-gray-200">
                            {shop.filters.map((filter, index) => (
                                <ShopFilterList key={index} type="mobile" filter={filter} />
                            ))}
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}