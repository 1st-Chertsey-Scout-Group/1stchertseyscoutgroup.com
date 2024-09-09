export interface DiaryItem extends Item {
    type: "Diary";
    description?: string;
    formattedDate: string;
    startTime?: string;
    endTime?: string;
    allDayEvent?: boolean;
}