export default function Toolbar(props) {
  const { date } = props;
  console.log(date)
  const navigate = (action) => {
    console.log(action)
    props.onNavigate(action);
  };
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        {/*
        <button type="button" onClick={navigate.bind(null, "TODAY")}>
          이번달
        </button>
        */}
        {/*
        <button type="button" onClick={navigate.bind(null, "PREV")}>
          ◁
        </button>
         */}
        <span className="rbc-toolbar-label">{`${
          date.getMonth() + 1
        }월 ${date.getDate()}일`}</span>
        {/*
        <button type="button" onClick={navigate.bind(null, "NEXT")}>
          ▷
        </button>
         */}
      </span>
    </div>
  );
}
