export default function customdatecelwrapper(props) {
  const now = new Date();
  console.log(now);
  const { date } = props;
  console.log(props.value);
  console.log(now.getDate() === props.value.getDate());
  return (
    <div
      className={
        now.getDate() === props.value.getDate()
          ? "special-day rbc-day-bg"
          : "rbc-day-bg"
      }
      onClick={() => alert("abc")}
    ></div>
  );
}
