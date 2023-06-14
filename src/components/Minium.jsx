import React from 'react'
import Main from './Main';
import { useState } from "react";
export default function Minium() {
    const now = new Date();
    const [nowday, setNowday] = useState(new Date());
    const [nextday, setNextday] = useState(
      new Date(now.setMonth(now.getMonth() + 1))
    );
  return (
    
    <div>
      <div
        onClick={() => {
          setNowday(new Date(nowday.setMonth(nowday.getMonth() + 2)));
          setNextday(new Date(nextday.setMonth(nextday.getMonth() + 2)));
        }}
      >
        +버튼
      </div>
      <div 
      onClick={() => {
        setNowday(new Date(nowday.setMonth(nowday.getMonth() - 2)));
        setNextday(new Date(nextday.setMonth(nextday.getMonth() - 2)));
      }}>
      -버튼
      </div>
      <Main nowday={nowday} nextday={nextday} />
      <Main nowday={nextday} nextday={nowday} />

    </div>
  )
}
