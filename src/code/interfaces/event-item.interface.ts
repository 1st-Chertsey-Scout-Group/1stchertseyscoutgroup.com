export interface EventItem extends Item {
    type: "Event";
    location?: string;
    formattedStartDate: string;
    formattedEndDate: string;
    singleDay: boolean;
}