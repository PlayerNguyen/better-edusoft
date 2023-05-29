import { request } from "../request";
import { parseHtmlFromBody } from "../utils/htmlParser";

export module schedule {
  export class Schedule {
    private lastUpdate: number;
    private semesters: Semester[];
  }

  export interface Semester {
    semesterId: string;
    courses: Course[];
  }

  export interface Course {
    courseId: string;
    courseName: string;
    courseGroup: string;
    credit: number;

    timelines: AppointmentTimeline[];
  }

  export enum DayInWeeks {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY,
  }

  export interface AppointmentTimeline {
    dayInWeek: DayInWeeks;

    startPeriod: number;
    numberOfClassPeriod: number;

    room: string;

    startDate: Date;
    endDate: Date;
  }

  export async function getScheduleFromCurrentSession() {
    const axiosInstance = await request
      .getRequestor()
      .getAxiosInstanceWithSession();

    const response = await axiosInstance.get(
      "https://edusoftweb.hcmiu.edu.vn/default.aspx?page=thoikhoabieu&sta=1"
    );

    if (response.status !== 200) {
      throw new Error(
        `Unable to get schedule with status: ${response.statusText}`
      );
    }

    const bodyElement = parseHtmlFromBody(response.data);
    console.log(
      bodyElement.querySelector(
        "select[name=ctl00$ContentPlaceHolder1$ctl00$ddlChonNHHK]"
      )?.childNodes
    );
  }
}
