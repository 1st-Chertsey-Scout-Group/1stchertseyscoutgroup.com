import type { CollectionEntry } from "astro:content";
import { useShop } from "../shop.store";
import { Field, Input, Label, Select, Textarea } from "@headlessui/react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type BasketProps = {
};

export const ShopBasketView: React.FC<BasketProps> = ({ }) => {
    const shop = useShop();

    const { contactInfo, inBasket } = shop;

    const handleSubmit = (e: React.FormEvent) => {
        console.log("test");
    }

    return (
        <>
            <div className="relative border-t border-gray-200 pt-12">
                <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 ded lg:grid-cols-2 xl:gap-48">
                    <h1 className="sr-only">Order information</h1>
                    <OrderSummary />
                    <OrderForm onSubmit={handleSubmit} />

                    {contactInfo && <code className="whitespace-pre-line bg-alternative p-4">

                        {
                            `
EXAMPLE EMAIL

Uniform order request:

Name: ${contactInfo.name} (${contactInfo.ypName})
Email: ${contactInfo.email}

Group: ${contactInfo.group}
Section: ${contactInfo.section}

Requested Items:
${inBasket.map((b) => " - " + b.product.data.name + " ( " + b.quantity + " ) ").join("\n")}

Additional Information:
${contactInfo.additionalInformation}

`

                        }
                    </code>}


                </div>
            </div>
        </>)
}


type OrderSummaryProps = {
};
export const OrderSummary: React.FC<OrderSummaryProps> = () => {
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
                                        <OrderSummaryItem key={index} product={product.product} quantity={product.quantity} />
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
    quantity: number
};
export const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({ product, quantity }) => {
    const shop = useShop();

    const { thumbnail, name, price, colour } = product.data;
    const formattedPrice = price.toFixed(2);

    const handleRemoveItem = () => {
        shop.actions.removeFromBasket(product);
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
                            <button type="button" className="-m-2.5 flex items-center justify-center p-2.5 bla" onClick={handleRemoveItem}>
                                <span className="sr-only">Remove</span>
                                <Trash2 />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium">£{formattedPrice}</p>
                        <div className="ml-4">
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
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}


type OrderFormProps = {
    onSubmit: (e: React.FormEvent) => void;
};
export const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
    const shop = useShop();

    const [name, setName] = useState("");
    const [ypName, setYPName] = useState("");
    const [email, setEmail] = useState("");
    const [group, setGroup] = useState("");
    const [section, setSection] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");


    let sectionOptions = shop.filters.find((f) => f.id == "sections")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        shop.actions.setContactInfo({ name, ypName, email, group, section, additionalInformation })

        onSubmit(e)
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
                                    <Input required={true} className="w-full drop-shadow" id="name" name="name" placeholder={"Bear Grylls"} value={name} onChange={e => setName(e.target.value)} />
                                </div>
                            </Field>
                            <Field className={"flex-1"}>
                                <Label htmlFor="yp-name" className="block font-medium text-sm">Young Person's name</Label>
                                <div className="mt-1">
                                    <Input className="w-full drop-shadow" id="yp-name" name="yp-name" placeholder={"Jesse Grylls"} value={ypName} onChange={e => setYPName(e.target.value)} />
                                </div>
                            </Field>
                        </div>
                        <Field className="mt-4">
                            <Label htmlFor="email_address" className="block font-medium text-sm">Email Address <span className="text-primary">*</span></Label>
                            <div className="mt-1">
                                <Input className="w-full drop-shadow" id="email_address" name="email_address" placeholder="bear.grylls@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                        </Field>
                    </section>
                    <section aria-labelledby="order-info" className="mt-8">
                        <h2 id="order-info-heading" className="text-lg font-medium">Order information</h2>
                        <div className="flex flex-col lg:flex-row justify-between gap-2">
                            <Field className={"flex-1"}>
                                <Label htmlFor="group" className="block font-medium text-sm">Group <span className="text-primary">*</span></Label>
                                <div className="mt-1">
                                    <Input className="w-full drop-shadow" id="group" name="group" defaultValue={"1st Chertsey"} placeholder={"1st Chertsey"} value={group} onChange={e => setGroup(e.target.value)} />
                                </div>
                            </Field>
                            <Field className={"flex-1"}>
                                <Label htmlFor="section" className="block font-medium text-sm">Section <span className="text-primary">*</span></Label>
                                <div className="mt-1">
                                    <Select name="section" aria-label="Section" className="w-full drop-shadow" value={section} onChange={e => setSection(e.target.value)}>
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
                                <Textarea className="w-full drop-shadow h-32" id="additional_information" name="additional_information" value={additionalInformation} onChange={e => setAdditionalInformation(e.target.value)}></Textarea>
                            </div>
                        </Field>
                    </section>
                    <div className="mt-10 border-t border-gray-200 pt-6 lg:flex lg:center lg:justify-between">
                        <button disabled={shop.inBasket.length == 0} className={cn(
                            shop.inBasket.length == 0 ? "bg-disabled text-disabled-foreground cursor-not-allowed opacity-50" : "bg-primary text-primary-foreground",
                            "lg:order-last w-full lg:w-auto relative flex items-center justify-center border px-8 py-2 text-sm font-medium border border-transparent")}>
                            Request Uniform
                        </button>
                        <p className="mt-4 text-center text-sm lg:mt-0 lg:text-left">We will email you confirming your request</p>
                    </div>
                </div>
            </form>
        </>)
}