import { React, useEffect, useState } from "react";
import "./ScoreBreakdown.css";
import ScoreBar from "../ScoreBar/ScoreBar";

function ScoreBreakdown(props) {
  const [housewives, setHousewives] = useState([]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < props.next_four.length; i++) {
      temp.push(
        <ScoreBar
          url={props.next_four[i].img_url}
          name={props.next_four[i].name}
          score={props.next_four[i].score}
        ></ScoreBar>
      );
    }

    setHousewives(temp);
  }, [props]);

  return (
    <div className="scoreBreakdown">
      <h4 className="scoreBreakdown-title">Score Breakdown</h4>
      <div className="scoreBreakdown-bars">{housewives}</div>
    </div>
  );
}

export default ScoreBreakdown;
