export const submitOrder = (
    baseUrl: string,
    name: string,
    ypName: string,
    email: string,
    group: string,
    section: string,
    additionalInformation: string,
    altcha: string,
): Promise<{ success: boolean }> => {
    return new Promise((resolve, reject) => {
        fetch(baseUrl + "/enquiry", {
            method: "POST", body: JSON.stringify({
                firstName: name,
                email,
                topic: "uniform-request",
                subject: `${group} - ${section} ${ypName == "" ? "" : ` (${ypName})`}`,
                message: additionalInformation == "" ? "" : additionalInformation,
                altcha,
            }),
            headers: new Headers({ 'content-type': 'application/json' }),
        }).then((val => {
            resolve({ success: true })
        })).catch((reason) => reject(reason));
    });
}