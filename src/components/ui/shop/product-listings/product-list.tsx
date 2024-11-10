import type { CollectionEntry } from "astro:content";
import { useShop } from "../state/shop.store";
import { cn } from "@/lib/utils";

type ProductListProps = {
};


export const ProductList: React.FC<ProductListProps> = ({ }) => {
    const shop = useShop();

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {shop.filteredProducts && shop.filteredProducts.map((product, index) => (
                        <ProductItem key={index} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

type ProductItemProps = {
    product: CollectionEntry<"products">
};

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const shop = useShop();

    let inCart = shop.isInCart(product.id);

    const handleAddRemoveFromCart = () => {
        let inCartNew = !inCart;
        if (inCartNew) {
            shop.actions.addToBasket(product);
        } else {
            shop.actions.removeFromBasket(product);
        }
    }

    const { thumbnail, name, price, colour } = product.data;
    const formattedPrice = price.toFixed(2);

    return (
        <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    alt={name /* NEED THIS */}
                    src={thumbnail?.src}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.data.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{colour}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">£{formattedPrice}</p>
            </div>
            <div className="mt-2">
                <button onClick={handleAddRemoveFromCart} className={cn(
                    "w-full relative flex items-center justify-center border  px-8 py-2 text-sm font-medium",
                    inCart ? "border border-primary text-primary" : "bg-primary text-primary-foreground border-transparent",)}>
                    {inCart ? "Remove from order" : "Add to order"}
                    <span className="sr-only">, {name}</span>
                </button>
            </div>
        </div>
    )
}