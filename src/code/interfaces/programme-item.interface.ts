export interface ProgrammeItem extends Item {
    type: "Programme";
    description?: string;
    formattedDate: string;
    startTime?: string;
    endTime?: string;
    allDayEvent?: boolean;
}