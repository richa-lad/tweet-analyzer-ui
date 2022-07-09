import { React, useState, useEffect } from "react";
import "./SideBar.css";
import SideBarItem from "../SideBarItem/SideBarItem";
import eventBus from "../../eventBus";

function SideBar() {
  const [pages, setPages] = useState([
    { name: "Welcome", state: "active" },
    { name: "Analyse My Tweets", state: "inactive" },
    { name: "Who Are The Housewives", state: "inactive" },
  ]);
  const [sideBarItems, setSideBarItems] = useState([]);
  let temp = pages;

  eventBus.on("changePage", (data) => {
    console.log("received change page event");
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].name === data.title) {
        temp[i].state = "active";
      } else {
        temp[i].state = "inactive";
      }
    }

    const items = [];
    pages.map((page) => {
      return items.push(
        <SideBarItem
          navItemName={page.name}
          className={page.state}
        ></SideBarItem>
      );
    });

    setSideBarItems(items);
  });

  useEffect(() => {
    const items = [];
    pages.map((page) => {
      return items.push(
        <SideBarItem
          navItemName={page.name}
          className={page.state}
        ></SideBarItem>
      );
    });

    setSideBarItems(items);
  }, [pages]);

  return (
    <div className="sideNavBar">
      <div className="sideNavBar-header">
        <h2 className="sideNavBar-title">Menu</h2>
        <div className="sideNavBar-underline"></div>
      </div>
      <div className="sideNavBar-body">{sideBarItems}</div>
    </div>
  );
}

export default SideBar;
