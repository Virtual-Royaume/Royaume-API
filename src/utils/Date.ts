import { Dayjs } from "dayjs";
import DayJS from "./DayJS";

export function getDateWithoutTime(date: Dayjs = DayJS().tz()): Dayjs {
    return date.startOf("day");
}