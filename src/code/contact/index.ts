import { sendEmail } from "@/code/email";
import { isValidEmail } from "@/lib/utils";
import type { Option } from "../interfaces/option.interface";
import type { OptionGroup } from "../interfaces/option-group.interface";
import { getCollection, type CollectionEntry } from "astro:content";
import { type SentMessageInfo } from 'nodemailer';


export async function getOptions(): Promise<(Option | OptionGroup)[]> {
    return [
        {
            label: "General Enquiry",
            type: "option",
            id: "enquiry",
        },
        {
            type: "group",
            label: "Squirrels",
            options: [
                {
                    id: "squirrels",
                    label: "Squirrels",
                    type: "option"
                }
            ]
        },
        {
            type: "group",
            label: "Beavers",
            options: [
                {
                    id: "beavers",
                    label: "Beavers",
                    type: "option"
                },
                {
                    id: "abbey",
                    label: "Abbey Beavers",
                    type: "option"
                },
                {
                    id: "bourne",
                    label: "Bourne Beavers",
                    type: "option"
                }
            ]
        },
        {
            type: "group",
            label: "Cubs",
            options: [
                {
                    id: "cubs",
                    label: "Cubs",
                    type: "option"
                },
                {
                    id: "dons",
                    label: "Dons Cubs",
                    type: "option"
                },
                {
                    id: "hunters",
                    label: "Hunters Cubs",
                    type: "option"
                }
            ]
        },
        {
            type: "group",
            label: "Scouts",
            options: [
                {
                    id: "scouts",
                    label: "Scouts",
                    type: "option"
                }
            ]
        },
        {
            type: "group",
            label: "Explorers",
            options: [
                {
                    id: "explorers",
                    label: "Explorers",
                    type: "option"
                }
            ]
        },
    ];
}


export function getOptionFromId(
    id: string,
    opts: (Option | OptionGroup)[],
): Option | null {
    for (let i = 0; i < opts.length; i++) {
        const element = opts[i];

        if (element.type == "option") {
            if (element.id == id) {
                return element;
            }
        } else if (element.type == "group") {
            var option = getOptionFromId(id, element.options);
            if (option) {
                return option;
            }
        }
    }

    return null;
}

export interface ContactForm {
    firstName: string;
    lastName: string | null;
    email: string;
    topicId: string;
    topicOption: Option | null;
    subject: string;
    message: string;
    number?: string | null;
}

export function getFormData(data: FormData, options: (Option | OptionGroup)[]): ContactForm {
    const email = data.get("email") as string ?? "";
    const firstName = data.get("firstName") as string ?? "";
    const lastName = data.get("lastName") as string ?? "";
    const topicId = data.get("topic") as string ?? "";
    const message = data.get("message") as string ?? "";
    const subject = data.get("subject") as string ?? "";
    const number = data.get("number") as string ?? null;

    const topicOption = getOptionFromId(topicId, options);

    return {
        email,
        message,
        firstName,
        lastName,
        topicId,
        topicOption,
        subject,
        number
    }
}

export function isFormDataValid(data: ContactForm): boolean {
    try {
        if (typeof data.email !== "string" || data.email.length < 1 || !isValidEmail(data.email)) {
            return false;
        }

        if (typeof data.firstName !== "string" || data.firstName.length < 1) {
            return false;
        }

        if (typeof data.topicId !== "string" || data.topicId.length < 1) {
            return false;
        }

        if (data.topicOption == null) {
            return false;
        }

        if (typeof data.subject !== "string" || data.subject.length < 1) {
          return false;
      }

        if (typeof data.message !== "string" || data.message.length < 1) {
            return false;
        }

        // Honeypot, this needs to be empty
        if (data.number !== undefined && data.number !== null && data.number.trim() !== "") {
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }

    return true;
}

export function sendEnquiryEmail(data: ContactForm, smtpSettings: { SMTP_HOST: string, SMTP_PASSWORD: string, SMTP_PORT: number, SMTP_ALIAS: string, SMTP_DOMAIN: string }): Promise<SentMessageInfo> {
    try {
        return sendEmail({
            smtp: {
                host: smtpSettings.SMTP_HOST,
                port: smtpSettings.SMTP_PORT,
                auth: {
                    user: `${smtpSettings.SMTP_ALIAS}@${smtpSettings.SMTP_DOMAIN}`,
                    pass: smtpSettings.SMTP_PASSWORD
                }
            },
            mail: {
                from: `${smtpSettings.SMTP_ALIAS}@${smtpSettings.SMTP_DOMAIN}`,
                to: `${data.topicId}@${smtpSettings.SMTP_DOMAIN}`,
                subject: `New Submission - ${smtpSettings.SMTP_DOMAIN}`,
                html: ``
            }
        });

    } catch (error) {
        return Promise.reject(error);
    }
}