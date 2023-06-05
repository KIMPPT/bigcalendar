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
  const customDayPropGetter = (date) => {
    let data = [
      { day: moment("2023-02-15"), holidayType: true },
      { day: moment("2020-02-20"), holidayType: false },
    ];

    var obj = data.find((element, index) => {
      if (
        (element.day === moment(date) && element.holidayType === false) ||
        (element.day === moment(date) && element.holidayType === true)
      )
        return data[index];
    });
    console.log(obj);
    if (
      obj !== undefined &&
      obj.day === moment(date) &&
      obj.holidayType === false
    )
      return { style: { backgroundColor: "red" } };
    else if (
      obj !== undefined &&
      obj.day === moment(date) &&
      obj.holidayType === true
    )
      return { style: { backgroundColor: "orange" } };
    else return { style: { backgroundColor: "#fff" } };
  };
  const dayprop = (date) => {
    event.map((eventday) => {
      if (
        eventday.day.year() === moment(date).year() &&
        eventday.day.month() === moment(date).month() &&
        eventday.day.date() === moment(date).date()
      )
        return { style: { backgroundColor: "blue" } };
      //{ style: { backgroundColor: "red" } };
      else return { style: { backgroundColor: "red" } };
    });
  };
  const defaultDate = useMemo(() => now, []);
  const customDayPropGetter2 = (date) => {
    for (let i = 0; i < event.length; i++) {
      if (
        date.getMonth() === moment(event[i].day).month() &&
        date.getDate() === moment(event[i].day).date()
      )
        return {
          className: "special-day",
          style: { backgroundColor: "Blue" },
        };
      else return {};
    }
  };
  return (
    <Calendar
      dayPropGetter={customDayPropGetter2}
      defaultDate={defaultDate}
      localizer={localizer}
      style={{ height: 300, width: 300 }}
      components={{ toolbar: Toolbar }}
    />
  );
}
