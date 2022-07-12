import { React, useState } from "react";
import "./Title.css";
import eventBus from "../../eventBus";

function Title(props) {
  const [title, setTitle] = useState(props.pageName);

  eventBus.on("changePage", (data) => {
    setTitle(data.title);
  });

  return (
    <div className="pageTitle">
      <h6 className="subheading">
        Real Housewives of Beverly Hills Tweet Analyser
      </h6>
      <h1 className="heading">{title}</h1>
      <div className="underline"></div>
    </div>
  );
}

export default Title;
