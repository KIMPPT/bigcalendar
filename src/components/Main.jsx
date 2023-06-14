import React, {useMemo} from "react";
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
  console.log(`${nowday},${nextday}`)
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
        style={{ height: 300}}
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
