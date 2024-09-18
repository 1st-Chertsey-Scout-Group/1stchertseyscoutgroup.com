'use client'

import type { CollectionEntry } from "astro:content";
import React, { useEffect } from "react";

import { useShop } from "./shop.store";

import { ShopProductListingsView } from "./product-listings";
import { ShopBasketView } from "./basket";

type ShopProps = {
    products: CollectionEntry<"products">[]
};

export const Shop: React.FC<ShopProps> = ({ products }) => {
    const shop = useShop();

    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        shop.actions.initialise(products, params);
    }, [products])

    return (
        <div>
            <ShopProductListingsView />
            <ShopBasketView />
        </div>
    )
}