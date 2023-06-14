import React, { useCallback, useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./main.scss";
import Toolbar from "./Toolbar";
import CustomDateHeader from "./DateHeader";
import customdatecelwrapper from "./Customdatecelwrapper";
import {
  next1month,
  next2month,
  prev1month,
  prev2month,
} from "../slice/useSlice";
export default function Main({ nowday, nextday }) {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  //useSelector로 slice의 초기값을 불러낸다
  //첫번째 방법 : slice로 store로 접근해서 자료값을 수정하고 가져오기
  /*
  const nowdate = slicedate.nowdate;
  const nextdate = slicedate.nextdate;
  const [nowday2, setNowday2] = useState(nowdate);
  const [nextday2, setNextday2] = useState(nextdate);
  */
  //console.log(`slice로 불러온 값 : ${nowday2}`);
  //console.log(`slice로 불러온 값 : ${nextday2}`);
  //두번째 방법 : props로 받아와서 usestate에 넣어서 사용
  const [nowdate2,setNowdate2]=useState(nowday);
  const [nextdate2,setNextdate2]=useState(nextday);
  //초기에 보여줄 캘린더 창
  const defaultDate = useMemo(() => nowday, [nowday]);
  const onNavigate = useCallback(
    (e) => {
      setNowdate2(e);
      setNextdate2(e);
    },
    [setNowdate2]
  );
  /*
  console.log(`slice에서 들고온 첫 달:${nowdate}`);
  console.log(`slice에서 들고온 다음 달:${nextdate}`);
   */
  console.log(`state에서 들고온 첫 달:${nowdate2}`);
  console.log(`state에서 들고온 첫 달:${nextdate2}`);
  console.log(`props로 들고온 이번달:${nowday}`);
  console.log(`props로 들고온 다음달:${nextday}`)
  return (
    <div>
      {/*useSlice의 aciton함수로 달력을 넘겨주는 함수 
      <button onClick={() => dispatch(next2month())}>+2</button>
      <button onClick={() => dispatch(prev2month())}>-2</button>
      <br />
      <button onClick={() => dispatch(next1month())}>+1</button>
      <button onClick={() => dispatch(prev1month())}>-1</button>
      */}
      <Calendar
        date={nowday}

        defaultDate={defaultDate}
        localizer={localizer}
        style={{ height: 300 }}
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
