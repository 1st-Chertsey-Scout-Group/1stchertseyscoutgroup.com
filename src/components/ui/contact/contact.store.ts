import { useStore } from "@nanostores/react";
import { atom, computed } from "nanostores";

type ContactState = {
    firstName: string;
    lastName: string;
    email: string;
    topic: string;
    subject: string;
    message: string;
    altcha: string;
}

const initialState: ContactState = {
    firstName: "",
    lastName: "",
    email: "",
    topic: "",
    subject: "",
    message: "",
    altcha: ""
}

export const $contact = atom<ContactState>(initialState)

const setFirstName = (firstName: string) => {
    let contact = $contact.get();
    $contact.set({
        ...contact,
        firstName,
    })
}
const setLastName = (lastName: string) => {
    let contact = $contact.get();
    $contact.set({
        ...contact,
        lastName,
    })
}
const setEmail = (email: string) => {
    let contact = $contact.get();
    $contact.set({
        ...contact,
        email,
    })
}
const setTopic = (topic: string) => {
    let contact = $contact.get();
    $contact.set({
        ...contact,
        topic,
    })
}
const setSubject = (subject: string) => {
    let contact = $contact.get();
    $contact.set({
        ...contact,
        subject,
    })
}
const setMessage = (message: string) => {
    let contact = $contact.get();
    $contact.set({
        ...contact,
        message,
    })
}

const setAltcha = (altcha: string) => {
    let contact = $contact.get();
    $contact.set({
        ...contact,
        altcha,
    })
}

const $formValid = computed($contact, (contact) => {

    const { firstName, email, topic, subject, message, altcha } = contact;

    return firstName.trim() != "" && email.trim() != "" && topic.trim() != "" && subject.trim() != "" && message.trim() != "" && altcha.trim() != "";
})


export const useContact = () => {
    const contact = useStore($contact);
    const formValid = useStore($formValid);

    return {
        ...contact,
        formValid,
        actions: {
            setFirstName,
            setLastName,
            setEmail,
            setTopic,
            setSubject,
            setMessage,
            setAltcha
        },
    }
}


