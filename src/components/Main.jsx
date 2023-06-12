import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./main.scss";
import Toolbar from "./Toolbar";
import CustomDateHeader from "./DateHeader";
import customdatecelwrapper from "./Customdatecelwrapper";
import { useSelector, useDispatch } from "react-redux";
import {
  next1month,
  next2month,
  prev1month,
  prev2month,
} from "../slice/useSlice";
export default function Main({ nowday, nextday }) {
  console.log(nowday);
  console.log(nextday);
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  //useSelector로 slice의 초기값을 불러낸다
  const slicedate = useSelector((state) => state.use);
  //객체로 만들었기 때문에 각자 불러낸다
  const nowdate = slicedate.nowdate;
  //두번째 달력의 경우 다음달을 나타내야 하기 때문에 현재 달에서 +1한 값으로 변환해준다
  //값을 2개 만든 이유는 setMonth 함수는 해당 값을 바로 바꾸어서 return 시켜주기 때문에 nowdate를 써버리면 nowdate값도 바뀌어 버린다
  const nextdate = slicedate.nextdate;
  //정상적으로 나타나는지 확인하기 위해 콘솔에 표시
  console.log(nowdate, nextdate);
  const now = new Date();
  //배열을 들고올 경우 다음과 같이 들고와야 한다
  const event = [
    { day: moment("2023-06-08") },
    { day: moment("2023-07-05") },
    { day: moment("2023-05-23") },
    { day: moment("2023-06-15") },
    { day: moment("2023-06-30") },
  ];
  const thismonth = event.filter((e) => e.day.month() === moment(now).month());
  //console.log(thismonth);
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
    for (let i = 0; i < thismonth.length; i++) {
      //console.log(thismonth[i].day);
      switch (
        moment(thismonth[i].day).month() === date.getMonth() &&
        moment(thismonth[i].day).date() === date.getDate()
      ) {
        case true:
          return { className: "special-day" };
          continue;
        default:
          return { style: { backgroundColor: "yellow" } };
          continue;
      }
    }
    /*
    for (let i = 0; i < thismonth.length; i++) {
      if (
        moment(thismonth[i].day).month() === date.getMonth() &&
        moment(thismonth[i].day).date() === date.getDate()
      ){
        return {
          className: "special-day",
          style: { backgroundColor: "rgba(45,12,105,0.2)" },
        };
      }
      continue; 
    }
      
     */
    /*
        약속이 잡힌 날짜가 아는 곳들에 색을 칠하는 else문
        문제점 : 해당월의 약속이 여러개여도 맨 앞 하나를 제외한 모든 날에 색을 칠해버림
        */
  };
  //초기에 보여줄 캘린더 창
  const defaultDate = useMemo(() => nowdate, []);
  return (
    <div>
      {/*useSlice의 aciton함수로 달력을 넘겨주는 함수 */}
      <button onClick={() => dispatch(next2month())}>+2</button>
      <button onClick={() => dispatch(prev2month())}>-2</button>
      <br />
      <button onClick={() => dispatch(next1month())}>+1</button>
      <button onClick={() => dispatch(prev1month())}>-1</button>
      <Calendar
        date={nowday}
        defaultDate={defaultDate}
        localizer={localizer}
        style={{ height: 300, width: 300 }}
        components={{
          toolbar: Toolbar,
          month: {
            dateHeader: CustomDateHeader,
          },
          dateCellWrapper: customdatecelwrapper,
        }}
      />
      <div onClick={() => alert("abc")}>클릭</div>

      <Calendar
        date={nextday}
        defaultDate={defaultDate}
        localizer={localizer}
        style={{ height: 300, width: 300 }}
        components={{
          toolbar: Toolbar,
          month: {
            dateHeader: CustomDateHeader,
          },
          dateCellWrapper: customdatecelwrapper,
        }}
      />
    </div>
  );
}
