export default function customdatecelwrapper(props) {
  const days = [
    new Date("2023-06-25"),
    new Date("2023-06-17"),
    new Date("2023-06-01"),
    new Date("2023-07-25"),
  ];
  //console.log(days)
  const now = new Date();
  //console.log(now);
  const { date } = props;
  //console.log(props.value);
  //console.log(now.getDate() === props.value.getDate());
  const dayArray = [];
  {
    for (let i = 0; i < days.length; i++) {
      let bool =
        days[i].getDate() === props.value.getDate() &&
        days[i].getMonth() === props.value.getMonth() &&
        days[i].getFullYear() === props.value.getFullYear();
      dayArray.push(bool);
    }
  }
  //여기까지는 days의 배열 갯수가 여러개면 해당일에 true/false 배열이 생긴다
  //console.log(dayArray.map((bool) => bool));
  //해당일에 생긴 배열을 하나로 합치되 하나라도 true 이면 true가 되게 or 을 쓴다
  const sum = dayArray.reduce((previous, current) => previous || current);
  //최종 해당일에 약속이 있는지 없는지 확인할 수 있는 선언
  //console.log(sum);
  const clickday1 = () => console.log("abc");
  function clickevent1() {
    alert("abc");
  }
  function clickevent2() {
    alert("def");
  }
  return sum ? (
    <div className="special-day rbc-day-bg" onClick={clickevent1}></div>
  ) : (
    <div className="rbc-day-bg" onClick={clickevent2}></div>
  );
}
