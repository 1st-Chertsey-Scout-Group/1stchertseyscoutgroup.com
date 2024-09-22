'use client'

import type { CollectionEntry } from "astro:content";
import React, { useEffect, useState } from "react";

import { useShop } from "./state/shop.store";

import { ShopProductListingsView } from "./product-listings";
import { OrderSummary, ShopBasketView } from "./basket";
import { submitOrder } from "./api/submit-order.api";
import { useShopContactInfo } from "./state/contact-info.store";

type ShopProps = {
    ALTCHA_API_KEY: string;
    products: CollectionEntry<"products">[]
};

export const Shop: React.FC<ShopProps> = ({ ALTCHA_API_KEY, products }) => {
    const shop = useShop();
    const contactInfo = useShopContactInfo();

    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        shop.actions.initialise(products, params);
    }, [products])

    let [view, setView] = useState<"Form" | "Success" | "Failure">("Form");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { name, ypName, email, group, section, additionalInformation, altcha } = contactInfo;

        submitOrder(name, ypName, email, group, section, additionalInformation, altcha)
            .then(({ success }) => {
                if (success) {
                    setView("Success");
                } else {
                    setView("Failure");
                }
            }).catch((reason) => {
                console.log(reason);
                setView("Failure");
            })

    }


    return (
        <div>
            {view == "Form" && <>
                <ShopProductListingsView />
                <ShopBasketView ALTCHA_API_KEY={ALTCHA_API_KEY} onSubmit={handleSubmit} />
            </>}
            {view == "Success" && <SuccessView />}
            {view == "Failure" && <FailureView />}


        </div>
    )
}


type SuccessViewProps = {

}

const SuccessView: React.FC<SuccessViewProps> = ({ }) => {
    const contactInfo = useShopContactInfo();
    return (
        <>
            <div className="relative border-t border-gray-200 pt-12">
                <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 ded lg:grid-cols-2 xl:gap-48">
                    <h1 className="sr-only">Order complete</h1>
                    <div className="flex flex-col text-center mt-10">
                        <div className="text-4xl">Thank you, {contactInfo.name}!</div>
                        <div className="pt-4">We have received your message and will get back to you shortly.</div>
                    </div>
                    <OrderSummary readonly={true} />
                </div>
            </div>

        </>
    )
}

type FailureViewProps = {

}

const FailureView: React.FC<FailureViewProps> = ({ }) => {
    const contactInfo = useShopContactInfo();
    return (
        <>
            <div className="flex flex-col text-center mt-10">
                <div className="text-4xl">{contactInfo.name}, Something went wrong.</div>
                <div className="pt-4">We were unable to process your message, please try again later.</div>
            </div>

        </>
    )
}