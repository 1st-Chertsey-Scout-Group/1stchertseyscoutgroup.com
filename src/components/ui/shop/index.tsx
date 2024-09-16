'use client'

import type { CollectionEntry } from "astro:content";
import React, { useEffect } from "react";

import { useShop, type ShopStateSort } from "./shop.store";
import { ProductList } from "./product-listings/product-list";

import { ChevronDown, Filter } from 'lucide-react'
import { cn } from "@/lib/utils";
import { MobileDialog } from "./product-listings/mobile-dialog";
import { ShopFilterList } from "./product-listings/filter-list";
import { ShopSort } from "./product-listings/sort-menu";
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