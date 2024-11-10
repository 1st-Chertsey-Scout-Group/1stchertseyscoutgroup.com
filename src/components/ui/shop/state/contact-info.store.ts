import { useStore } from "@nanostores/react";
import { atom, computed } from "nanostores";


interface ContactInformationState {
    name: string;
    ypName: string;
    email: string;
    group: string;
    section: string;
    additionalInformation: string;
    altcha: string;
}

const initialState: ContactInformationState = {
    name: "",
    ypName: "",
    email: "",
    group: "",
    section: "1st Chertsey",
    additionalInformation: "",
    altcha: ""
}

export const $contactInfo = atom<ContactInformationState>(initialState)

const setName = (name: string) => {
    let contactInfo = $contactInfo.get();
    $contactInfo.set({
        ...contactInfo,
        name,
    })
}

const setYPName = (ypName: string) => {
    let contactInfo = $contactInfo.get();
    $contactInfo.set({
        ...contactInfo,
        ypName,
    })
}

const setEmail = (email: string) => {
    let contactInfo = $contactInfo.get();
    $contactInfo.set({
        ...contactInfo,
        email,
    })
}

const setGroup = (group: string) => {
    let contactInfo = $contactInfo.get();
    $contactInfo.set({
        ...contactInfo,
        group,
    })
}

const setSection = (section: string) => {
    let contactInfo = $contactInfo.get();
    $contactInfo.set({
        ...contactInfo,
        section,
    })
}

const setAdditionalInformation = (additionalInformation: string) => {
    let contactInfo = $contactInfo.get();
    $contactInfo.set({
        ...contactInfo,
        additionalInformation,
    })
}

const setAltcha = (altcha: string) => {
    let contact = $contactInfo.get();
    $contactInfo.set({
        ...contact,
        altcha,
    })
}

const $formValid = computed($contactInfo, (contactInfo) => {

    const { additionalInformation, email, group, name, section, ypName, altcha } = contactInfo;

    return email.trim() != "" && group.trim() != "" && name.trim() != "" && altcha.trim() != "";
})


export const useShopContactInfo = () => {
    const contactInfo = useStore($contactInfo);
    const formValid = useStore($formValid);

    return {
        ...contactInfo,
        formValid,
        actions: {
            setName,
            setAdditionalInformation,
            setEmail,
            setGroup,
            setSection,
            setYPName,
            setAltcha
        },
    }
}