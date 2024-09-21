
export const submitMessage = (
    firstName: string,
    lastName: string,
    email: string,
    topic: string,
    subject: string,
    message: string,
    altcha: string,
): Promise<{ success: boolean }> => {
    return new Promise((resolve, reject) => {

        fetch("http://localhost:7071/api/ContactForm", {
            method: "POST", body: JSON.stringify({
                firstName,
                lastName,
                email,
                topic,
                subject,
                message,
                altcha,
            }),
            headers: new Headers({ 'content-type': 'application/json' }),
        }).then((val => {
            resolve({ success: true })
        })).catch((reason) => reject(reason));
    });
}
