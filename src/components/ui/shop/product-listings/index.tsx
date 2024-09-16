import { Filter } from "lucide-react";
import { useShop } from "../shop.store";
import { ShopFilterList } from "./filter-list";
import { MobileDialog } from "./mobile-dialog";
import { ProductList } from "./product-list";
import { ShopSort } from "./sort-menu";

export const ShopProductListingsView: React.FC = () => {
    const shop = useShop();

    return (
        <>
            <MobileDialog />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
                    <div className="text-4xl font-bold tracking-tight"></div>

                    <div className="flex items-center">
                        <ShopSort sortOptions={shop.sortOptions} />
                        <button
                            type="button"
                            onClick={() => shop.actions.setMobileFiltersOpen(true)}
                            className="-m-2 ml-4 p-2 sm:ml-6 lg:hidden"
                        >
                            <span className="sr-only">Filters</span>
                            <Filter aria-hidden="true" className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pb-12 pt-6">
                    <h2 id="products-heading" className="sr-only">
                        Products
                    </h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <form className="hidden lg:block">
                            {shop.filters.map((filter, index) => (
                                <ShopFilterList key={index} type="desktop" filter={filter} />
                            ))}
                        </form>

                        <div className="lg:col-span-3"><ProductList /></div>
                    </div>
                </section>
            </main>
        </>
    )

}