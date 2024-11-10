import moment from "moment-timezone";
import ical from "node-ical";
import type { ICalItem } from "./interfaces/ical-item.interface";
import type { DiaryItem } from "./interfaces/diary-item.interface";

export class GoogleCalendarService {
    private async getCalenderItems(url: string) {
        let events: ICalItem[] = [];
        const webEvents = await ical.async.fromURL(url);

        var today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let k in webEvents) {
            if (webEvents.hasOwnProperty(k)) {
                const ev = webEvents[k] as ICalItem;
                if (webEvents[k].type == "VEVENT") {
                    var date = new Date(ev.start);

                    if (date >= today) {
                        events.push(ev);
                    }
                }
            }
        }

        return events;
    }

    async GetDiaryItems(programmeFeed: string): Promise<DiaryItem[]> {
        let events = await this.getCalenderItems(programmeFeed);

        return events.map((item) => {
            var date = new Date(item.start);

            return {
                type: "Diary",
                title: item.summary,
                description: item.description,
                date: date,
                formattedDate: moment(this.toTimezone(date)).format("ddd, Do MMMM"),
                startTime: moment(this.toTimezone(item.start)).format("h:mm a"),
                endTime: moment(this.toTimezone(item.end)).format("h:mm a"),
                allDayEvent: item["MICROSOFT-CDO-ALLDAYEVENT"] == "TRUE",
            };
        });
    }

    private toTimezone(date: Date | string) {
        return moment(date).clone().utcOffset(0, true); // convert time to user's timezone
    }
}
