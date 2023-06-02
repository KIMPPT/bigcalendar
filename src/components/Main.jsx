import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./main.css";
import Toolbar from "./Toolbar";
export default function Main() {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  const now = new Date();
  const tomorrow = moment(now).add(1, "M");
  return (
    <Calendar
      events={[
        {
          start: now,
          end: now,
          title: "",
          allDay: true,
        },
      ]}
      localizer={localizer}
      style={{ height: 300, width: 300 }}
      components={{toolbar:Toolbar}}
      
    />
  );
}
