import moment from "moment-timezone";
import ical from "node-ical";

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

interface Item {
  title: string;
  type: "Programme" | "Event";
  date: Date;
}

export interface ProgrammeItem extends Item {
  type: "Programme";
  description?: string;
  formattedDate: string;
  startTime?: string;
  endTime?: string;
  allDayEvent?: boolean;
}

export interface EventItem extends Item {
  type: "Event";
  location?: string;
  formattedStartDate: string;
  formattedEndDate: string;
  singleDay: boolean;
}

export class OSMService {
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

  async GetProgrammeItems(programmeFeed: string): Promise<ProgrammeItem[]> {
    let events = await this.getCalenderItems(programmeFeed);

    return events.map((item) => {
      var date = new Date(item.start);

      var programmeItem: ProgrammeItem = {
        type: "Programme",
        title: item.summary,
        description: item.description,
        date: date,
        formattedDate: moment(this.toTimezone(date)).format("ddd, Do MMMM"),
        startTime: moment(this.toTimezone(item.start)).format("h:mm a"),
        endTime: moment(this.toTimezone(item.end)).format("h:mm a"),
        allDayEvent: item["MICROSOFT-CDO-ALLDAYEVENT"] == "TRUE",
      };

      return programmeItem;
    });
  }

  async GetEventItems(eventFeed: string) {
    let events = await this.getCalenderItems(eventFeed);

    return events.map((item) => {
      var date = new Date(item.start);
      var start = moment(this.toTimezone(item.start)).format("ddd, Do MMMM");
      var end = moment(this.toTimezone(item.end)).format("ddd, Do MMMM");

      var programmeItem: EventItem = {
        type: "Event",
        title: item.summary,
        location: item.location,
        date: date,
        formattedStartDate: start,
        formattedEndDate: end,
        singleDay: start == end,
      };

      return programmeItem;
    });
  }

  private toTimezone(date: Date | string) {
    return moment(date).clone().utcOffset(0, true); // convert time to user's timezone
  }
}
