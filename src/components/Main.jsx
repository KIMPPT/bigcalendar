import React, { useCallback, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./main.css";
import Toolbar from "./Toolbar";
export default function Main() {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  const now = new Date();
  const event = [{ day: moment("2023-06-08") }, { day: moment("2023-07-05") }];
  const tomorrow = moment(now).add(1, "M");
  const dayPropGetter = useCallback(
    (date) => ({
      ...(moment(date).date() === moment(event[1].day).date() &&
        moment(date).month() === moment(event[1].day).month() &&
        moment(date).year() === moment(event[1].day).year() && {
          style: {
            backgroundColor: "darkgreen",
            color: "white",
          },
        }),
      /*
      ...(!(
        moment(date).date() === moment(event[1]).date() &&
        moment(date).month() === moment(event[1]).month() &&
        moment(date).year() === moment(event[1]).year()
      ) && {
        style: {
          backgroundColor: "yellow",
          color: "white",
        },
      }),
        */
    }),
    []
  );
  const defaultDate = useMemo(() => now, []);
  return (
    <Calendar
      dayPropGetter={dayPropGetter}
      defaultDate={defaultDate}
      localizer={localizer}
      style={{ height: 300, width: 300 }}
      components={{ toolbar: Toolbar }}
    />
  );
}
