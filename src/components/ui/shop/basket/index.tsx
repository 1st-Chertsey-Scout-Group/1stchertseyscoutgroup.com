import type { CollectionEntry } from "astro:content";
import { useShop } from "../state/shop.store";
import { Field, Input, Label, Select, Textarea } from "@headlessui/react";
import { Loader, SendHorizonal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useShopContactInfo } from "../state/contact-info.store";
import Altcha from "../../altcha";

type BasketProps = {
    ALTCHA_API_KEY: string;
    onSubmit: (e: React.FormEvent) => void;
};

export const ShopBasketView: React.FC<BasketProps> = ({ ALTCHA_API_KEY, onSubmit }) => {
    const shop = useShop();

    const handleSubmit = (e: React.FormEvent) => {
        onSubmit(e);
    }

    return (
        <>
            <div className="relative border-t border-gray-200 pt-12">
                <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 ded lg:grid-cols-2 xl:gap-48">
                    <h1 className="sr-only">Order information</h1>
                    <OrderSummary readonly={false} />
                    <OrderForm ALTCHA_API_KEY={ALTCHA_API_KEY} onSubmit={handleSubmit} />
                </div>
            </div>
        </>)
}


type OrderSummaryProps = {
    readonly: boolean
};
export const OrderSummary: React.FC<OrderSummaryProps> = ({ readonly }) => {
    const shop = useShop();


    const { totalPrice } = shop;
    const formattedTotalPrice = totalPrice.toFixed(2);

    return (
        <>
            <section aria-labelledby="summary-heading" className="bg-alternative px-4 pb-6 pt-8 lg:px-6 lg:col-start-2 lg:row-start-1 lg:px-0 lg:pb-8">
                <div className="mx-auto max-w-lg lg:max-w-none">
                    <h2 id="summary-heading" className="text-lg font-medium">Order summary</h2>
                    {
                        shop.inBasket && shop.inBasket.length == 0 && (
                            <div className=" px-4 py-6 lg:px-6 border-b"><span>No Items</span></div>
                        )
                    }
                    {
                        shop.inBasket && shop.inBasket.length != 0 && (
                            <>
                                <ul role="list" className="text-sm font-medium">
                                    {shop.inBasket && shop.inBasket.map((product, index) => (
                                        <OrderSummaryItem readonly={readonly} key={index} product={product.product} quantity={product.quantity} />
                                    ))}
                                </ul>
                            </>
                        )
                    }
                    <dl className="border-t-1 border-transparent text-sm font-medium">
                        <div className="flex items-center justify-between border-t-1 border-transparent pt-2">
                            <dt className="text-base">Total</dt>
                            <dd className="text-base">£{formattedTotalPrice}</dd>
                        </div>
                    </dl>
                </div>
            </section>
        </>
    )
}

type OrderSummaryItemProps = {
    product: CollectionEntry<"products">
    quantity: number,
    readonly: boolean
};
export const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({ product, quantity, readonly }) => {
    const shop = useShop();

    const { thumbnail, name, price, colour } = product.data;
    const formattedPrice = price.toFixed(2);

    const handleRemoveItem = () => {
        if (!readonly) {
            shop.actions.removeFromBasket(product);
        }
    }

    const updateQuantity = () => {
        if (!readonly) {
            // DO SOMETHING
        }
    }

    return (
        <>
            <li className="flex px-4 py-6 lg:px-6  border-b">
                <div className="shrink-0">
                    <img
                        alt={name /* NEED THIS */}
                        src={thumbnail?.src}
                        className="w-20" />
                </div>
                <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex">
                        <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                                {name}
                            </h4>
                            <p className="mt-1 text-sm">{colour}</p>
                        </div>
                        <div className="ml-4 flow-root shrink-0">
                            {!readonly && (
                                <button type="button" className="-m-2.5 flex items-center justify-center p-2.5 bla" onClick={handleRemoveItem}>
                                    <span className="sr-only">Remove</span>
                                    <Trash2 />
                                </button>
                            )}

                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium">£{formattedPrice}</p>
                        <div className="ml-4">
                            {!readonly && (
                                <>
                                    <label htmlFor="quantity" className="sr-only">
                                        Quantity
                                    </label>
                                    <select defaultValue={quantity} id="quantity" name="quantity" className="border border-gray-200 text-left text-base font-medium shadow bmo bnc lg:text-sm bnt">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}


type OrderFormProps = {
    ALTCHA_API_KEY: string;
    onSubmit: (e: React.FormEvent) => void;
};
export const OrderForm: React.FC<OrderFormProps> = ({ ALTCHA_API_KEY, onSubmit }) => {
    const shop = useShop();
    const contactInfo = useShopContactInfo();

    const { additionalInformation, altcha, email, group, name, section, ypName } = contactInfo;
    const { setEmail, setAdditionalInformation, setGroup, setName, setSection, setYPName, setAltcha } = contactInfo.actions;
    const { formValid } = contactInfo;

    const [isSubmit, setIsSubmit] = useState(false);

    let sectionOptions = shop.filters.find((f) => f.id == "sections")

    const handleAltchaChange = (e: CustomEvent<{ payload: string | null, state: "verifying" | "verified" }>) => {

        if (e.detail) {
            let { payload, state } = e.detail;

            if (state == "verified" && payload) {
                setAltcha(payload);
            }
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSubmit) {
            onSubmit(e);
            setIsSubmit(true);
        }
    }

    return (
        <>
            <form className="px-4 pb-32 pt-8 sm:px-4 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-8" onSubmit={handleSubmit}>
                <div className="mx-auto max-w-lg lg:max-w-none">
                    <section aria-labelledby="contact-info-heading">
                        <h2 id="contact-info-heading" className="text-lg font-medium">Contact information</h2>
                        <div className="flex flex-col lg:flex-row justify-between gap-2">
                            <Field className={"flex-1"}>
                                <Label htmlFor="name" className="block font-medium text-sm">Name <span className="text-primary">*</span></Label>
                                <div className="mt-1">
                                    <Input required={true} type="text" className="w-full drop-shadow" id="name" name="name" placeholder={"Bear Grylls"} value={name} onChange={(e: any) => setName(e.target.value)} />
                                </div>
                            </Field>
                            <Field className={"flex-1"}>
                                <Label htmlFor="yp-name" className="block font-medium text-sm">Young Person's name</Label>
                                <div className="mt-1">
                                    <Input className="w-full drop-shadow" type="text" id="yp-name" name="yp-name" placeholder={"Jesse Grylls"} value={ypName} onChange={(e: any) => setYPName(e.target.value)} />
                                </div>
                            </Field>
                        </div>
                        <Field className="mt-4">
                            <Label htmlFor="email_address" className="block font-medium text-sm">Email Address <span className="text-primary">*</span></Label>
                            <div className="mt-1">
                                <Input className="w-full drop-shadow" type="email" id="email_address" name="email_address" placeholder="bear.grylls@email.com" value={email} onChange={(e: any) => setEmail(e.target.value)} />
                            </div>
                        </Field>
                    </section>
                    <section aria-labelledby="order-info" className="mt-8">
                        <h2 id="order-info-heading" className="text-lg font-medium">Order information</h2>
                        <div className="flex flex-col lg:flex-row justify-between gap-2">
                            <Field className={"flex-1"}>
                                <Label htmlFor="group" className="block font-medium text-sm">Group <span className="text-primary">*</span></Label>
                                <div className="mt-1">
                                    <Input className="w-full drop-shadow" type="text" id="group" name="group" placeholder={"1st Chertsey"} value={group} onChange={(e: any) => setGroup(e.target.value)} />
                                </div>
                            </Field>
                            <Field className={"flex-1"}>
                                <Label htmlFor="section" className="block font-medium text-sm">Section <span className="text-primary">*</span></Label>
                                <div className="mt-1">
                                    <Select name="section" aria-label="Section" className="w-full drop-shadow" value={section} onChange={(e: any) => setSection(e.target.value)}>
                                        <option value={undefined}>--- Please Select ---</option>
                                        {
                                            sectionOptions && sectionOptions.options.map((option, index) => (
                                                <option key={index} value={option.value}>{option.label}</option>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </Field>
                        </div>

                        <Field className="mt-4">
                            <Label htmlFor="additional_information" className="block font-medium text-sm">Additional Information</Label>
                            <div className="mt-1">
                                <Textarea className="w-full drop-shadow h-32" id="additional_information" name="additional_information" value={additionalInformation} onChange={(e: any) => setAdditionalInformation(e.target.value)}></Textarea>
                            </div>
                        </Field>
                    </section>
                    <div className="mt-10 border-t border-gray-200 pt-6 flex lg:center lg:justify-between flex-col gap-2">
                        <Altcha
                            ALTCHA_API_KEY={ALTCHA_API_KEY}
                            onStateChange={(e: any) => handleAltchaChange(e)} />
                        <button disabled={!formValid || isSubmit} type="submit" className={cn(
                            !formValid || isSubmit ? "bg-disabled text-disabled-foreground cursor-not-allowed opacity-50" : "bg-primary text-primary-foreground",
                            "lg:order-last w-full lg:w-auto relative flex items-center justify-center border px-8 py-2 text-sm font-medium border border-transparent duration-0")}>

                            {isSubmit ? (<><span className="mr-2">Requesting Uniform </span><Loader className="animate-spin" /></>) : (<><span className="mr-2">Request Uniform </span> <SendHorizonal /></>)}
                        </button>
                    </div>
                </div>
            </form>
        </>)
}