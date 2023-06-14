import React from 'react'
import Main from './Main';
import { useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { next2month, prev2month } from '../slice/useSlice';
export default function Minium() {
    const now = new Date();
    const [nowday, setNowday] = useState(new Date());
    const [nextday, setNextday] = useState(
      new Date(now.setMonth(now.getMonth() + 1))
    );
      //첫번째 방법 : slice로 store로 접근해서 자료값을 수정하고 가져오기
  const slicedate = useSelector((state) => state.use);
  const nowdate = slicedate.nowdate;
  const nextdate = slicedate.nextdate;
  const dispatch=useDispatch();
  console.log(`슬라이스로 들고온 이번달:${nowdate}`)
  console.log(`슬라이스로 들고온 다음달:${nextdate}`)
  return (
    
    <div>
      <div
        onClick={() => {
          setNowday(new Date(nowday.setMonth(nowday.getMonth() + 2)));
          setNextday(new Date(nextday.setMonth(nextday.getMonth() + 2)));
        }}
      >
        +버튼[usestate사용]
      </div>
      <div 
      onClick={() => {
        setNowday(new Date(nowday.setMonth(nowday.getMonth() - 2)));
        setNextday(new Date(nextday.setMonth(nextday.getMonth() - 2)));
      }}>
      -버튼[usestate사용]
      </div>
      <div
        onClick={() => {
          dispatch(prev2month());
        }}
      >
        -버튼[slice사용]
      </div>
      <div 
      onClick={() => {
        dispatch(next2month());
      }}>
      +버튼[slice사용]
      </div>
      <Main nowday={nowdate} nextday={nextdate} />
      <Main nowday={nextdate} nextday={nowdate} />

    </div>
  )
}
