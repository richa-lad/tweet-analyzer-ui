import React from "react";
import "./SideBarItem.css";
import eventBus from "../../eventBus";

function SideBarItem(props) {
  const classes = `${props.className} sideBarItem`;

  const changePage = () => {
    console.log(`changing to page ${props.navItemName}`);
    eventBus.dispatch("changePage", { title: props.navItemName });
  };

  return (
    <button className={classes} onClick={changePage}>
      <p className="sideBarItem-text">{props.navItemName}</p>
    </button>
  );
}

export default SideBarItem;
