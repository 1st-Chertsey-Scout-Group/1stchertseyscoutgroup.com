import { Field, Label, Input, Select, Textarea } from "@headlessui/react";
import React, { useRef, useState } from "react";
import Altcha from "../altcha";
import { useContact } from "./contact.store";
import { cn } from "@/lib/utils";
import { Loader, Send, SendHorizonal, ThumbsUp } from "lucide-react";
import { submitMessage } from "./api/submit-message.api";

type ContactFormProps = {
    ALTCHA_API_KEY: string;
};
export const ContactForm: React.FC<ContactFormProps> = ({ ALTCHA_API_KEY }) => {
    const contact = useContact();

    const { email, firstName, lastName, message, subject, topic, altcha } = contact;

    const [view, setView] = useState<"Form" | "Success" | "Failure">("Form")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submitMessage(firstName, lastName, email, topic, subject, message, altcha)
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
        <>

            {view == "Form" && <FormView ALTCHA_API_KEY={ALTCHA_API_KEY} onSubmit={handleSubmit} />}
            {view == "Success" && <SuccessView />}
            {view == "Failure" && <FailureView />}
        </>
    )
}


type FormViewProps = {
    ALTCHA_API_KEY: string;
    onSubmit: (e: React.FormEvent) => void;
};
const FormView: React.FC<FormViewProps> = ({ ALTCHA_API_KEY, onSubmit }) => {
    const contact = useContact();

    const { email, firstName, lastName, message, subject, topic } = contact;
    const { setEmail, setFirstName, setLastName, setMessage, setSubject, setTopic, setAltcha } = contact.actions;
    const { formValid } = contact;

    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSubmit) {
            onSubmit(e);
            setIsSubmit(true);
        }

    }

    const handleAltchaChange = (e: CustomEvent<{ payload: string | null, state: "verifying" | "verified" }>) => {

        if (e.detail) {
            let { payload, state } = e.detail;

            if (state == "verified" && payload) {
                setAltcha(payload);
            }
        }
    }

    return (
        <>
            <form action="#" method='post' className="px-4 pb-32 pt-8 sm:px-4 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-8 w-full" onSubmit={handleSubmit}>
                <div className="">
                    <section aria-labelledby="contact-info-heading">
                        <h2 id="contact-info-heading" className="text-lg font-medium">Your details</h2>
                        <div className="flex flex-col lg:flex-row justify-between gap-2">
                            <Field className={"flex-1"}>
                                <Label htmlFor="firstName" className="block font-medium text-sm">First name <span className="text-primary">*</span></Label>
                                <div className="mt-1">
                                    <Input disabled={isSubmit} required={true} className="w-full drop-shadow" id="firstName" name="firstName" placeholder={"Bear"} value={firstName} onChange={(e: any) => setFirstName(e.target.value)} />
                                </div>
                            </Field>
                            <Field className={"flex-1"}>
                                <Label htmlFor="lastName" className="block font-medium text-sm">Last name</Label>
                                <div className="mt-1">
                                    <Input disabled={isSubmit} className="w-full drop-shadow" id="lastName" name="lastName" placeholder={"Grylls"} value={lastName} onChange={(e: any) => setLastName(e.target.value)} />
                                </div>
                            </Field>
                        </div>
                        <Field className="mt-4">
                            <Label htmlFor="email_address" className="block font-medium text-sm">Email Address <span className="text-primary">*</span></Label>
                            <div className="mt-1">
                                <Input disabled={isSubmit} required={true} type="email" className="w-full drop-shadow" id="email_address" name="email_address" placeholder="bear.grylls@email.com" value={email} onChange={(e: any) => setEmail(e.target.value)} />
                            </div>
                        </Field>
                    </section>
                    <section aria-labelledby="order-info" className="mt-8">
                        <h2 id="order-info-heading" className="text-lg font-medium">Enquiry</h2>
                        <div className="flex flex-col lg:flex-row justify-between gap-2">
                            <Field className={"flex-1"}>
                                <Label htmlFor="topic" className="block font-medium text-sm">Topic <span className="text-primary">*</span></Label>
                                <div className="mt-1">
                                    <Select disabled={isSubmit} name="topic" aria-label="Topic" className="w-full drop-shadow" value={topic} onChange={(e: any) => setTopic(e.target.value)}>
                                        <optgroup label="Group">
                                            <option value="general-enquiry">General Enquiry</option>
                                        </optgroup>
                                        <optgroup label="Squirrels">
                                            <option value="squirrels">Squirrels</option>
                                        </optgroup>
                                        <optgroup label="Beavers">
                                            <option value="beavers">Beavers</option>
                                            <option value="abbey">Abbey Beavers</option>
                                            <option value="bourne">Bourne Beavers</option>
                                        </optgroup>
                                        <optgroup label="Cubs">
                                            <option value="cubs">Cubs</option>
                                            <option value="dons">Dons Cubs</option>
                                            <option value="hunters">Hunters Cubs</option>
                                        </optgroup>
                                        <optgroup label="Scouts">
                                            <option value="scouts">Scouts</option>
                                        </optgroup>
                                        <optgroup label="Explorers">
                                            <option value="explorers">Explorers</option>
                                        </optgroup>
                                    </Select>
                                </div>
                            </Field>
                            <Field className={"flex-1"}>
                                <Label htmlFor="subject" className="block font-medium text-sm">Subject <span className="text-primary">*</span></Label>
                                <div className="mt-1">
                                    <Input disabled={isSubmit} required={true} className="w-full drop-shadow" id="subject" name="subject" placeholder={"How can we help"} value={subject} onChange={(e: any) => setSubject(e.target.value)} />
                                </div>
                            </Field>
                        </div>

                        <Field className="mt-4">
                            <Label htmlFor="message" className="block font-medium text-sm">Your message <span className="text-primary">*</span></Label>
                            <div className="mt-1">
                                <Textarea disabled={isSubmit} required={true} className="w-full drop-shadow h-32" id="message" name="message" value={message} placeholder="Leave a comment..." onChange={(e: any) => setMessage(e.target.value)}></Textarea>
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

                            {isSubmit ? (<><span className="mr-2">Sending message </span><Loader className="animate-spin" /></>) : (<><span className="mr-2">Send message </span> <SendHorizonal /></>)}
                        </button>
                    </div>

                </div >
            </form >
        </>)
}


type SuccessViewProps = {

}

const SuccessView: React.FC<SuccessViewProps> = ({ }) => {
    const contact = useContact();
    const { firstName } = contact;
    return (
        <>
            <div className="flex flex-col text-center mt-10">
                <div className="text-4xl">Thank you, {firstName}!</div>
                <div className="pt-4">We have received your message and will get back to you shortly.</div>
            </div>

        </>
    )
}

type FailureViewProps = {

}

const FailureView: React.FC<FailureViewProps> = ({ }) => {
    const contact = useContact();
    const { firstName } = contact;
    return (
        <>
            <div className="flex flex-col text-center mt-10">
                <div className="text-4xl">{firstName}, Something went wrong.</div>
                <div className="pt-4">We were unable to process your message, please try again later.</div>
            </div>

        </>
    )
}