import { React, useEffect, useState } from "react";
import { getWelcome } from "../../services";
import "./Welcome.css";

function WelcomeText() {
  const [welcomeChunks, setWelcomeChunks] = useState([]);

  useEffect(() => {
    let temp = [];
    getWelcome()
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          let chunk = (
            <div className="outer-chunk">
              <h2 className="chunk-title">{response[i].title}</h2>
              <p className="chunk-text">{response[i].content}</p>
            </div>
          );
          temp.push(chunk);
        }
        setWelcomeChunks(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className="welcome-container">{welcomeChunks}</div>;
}

export default WelcomeText;
