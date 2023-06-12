import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import { useState } from "react";
function App() {
  const now = new Date();
  const [nowday, setNowday] = useState(new Date());
  const [nextday, setNextday] = useState(
    new Date(now.setMonth(now.getMonth() + 1))
  );
  return (
    <div className="App">
      <div
        onClick={() => {
          setNowday(new Date(nowday.setMonth(nowday.getMonth() + 1)));
          setNextday(new Date(nextday.setMonth(nextday.getMonth() + 2)));
        }}
      >
        버튼
      </div>
      <Main nowday={nowday} nextday={nextday} />
      <Main nowday={nextday} nextday={nowday} />
    </div>
  );
}

export default App;
