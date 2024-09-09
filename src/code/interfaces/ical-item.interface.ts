export interface ICalItem {
    type: string;
    params: any[];
    uid: string;
    start: string;
    datetype: string;
    sequence: string;
    transparency: string;
    end: string;
    summary: string;
    class: string;
    dtstamp: string;
    "MICROSOFT-CDO-ALLDAYEVENT"?: string;
    description?: string;
    location?: string;
}