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
  //배열을 들고올 경우 다음과 같이 들고와야 한다
  const event = [
    { day: moment("2023-06-08") },
    { day: moment("2023-07-05") },
    { day: moment("2023-05-23") },
  ];
  const tomorrow = moment(now).add(1, "M");
  //참고한 첫번째 함수. 작동은 하는데 다수의 경우 어떻게 넣어야 할지 모르겠음
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
  //참고함 2번째 함수. 작동을 하지 않는다
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
  //위 2개를 섞어서 직접 짜본 함수. 작동은 하지 않는다
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
  //3번째로 참고한 함수. 함수 부분에 for과 if가 적용되어서 기본적으로 아는
  //모양을 참고해서 수정한 결과이다. 그 결과 복수의 날짜에도 적용이 된다
  //이 모양을 최종적으로 채택할 예정
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
    }
  };

  //초기에 보여줄 캘린더 창
  const defaultDate = useMemo(() => now, []);
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
