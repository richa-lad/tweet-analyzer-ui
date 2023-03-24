import { React, useState, useEffect } from "react";
import "./TweetAnalyser.css";
import { getSetup, getClassification, getUser, getHousewivesInfo } from "../../services";
import ClassificationResult from "../../components/ClassificationResult/ClassificationResult"
import ScoreBreakdown from "../../components/ScoreBreakdown/ScoreBreakdown";
import { FaSearch } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";

function SearchBar() {
  const [loadingPhrase, setLoadingPhrase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isJustOpened, setIsJustOpened] = useState(true);
  const [userTwitterHandle, setUserTwitterHandle] = useState("");
  const [topHousewifeInfo, setTopHousewifeInfo] = useState({
    name: "",
    score: null,
    img_url: "",
    bio: "",
  });
  const [runnerUpHousewives, setRunnerUpHousewives] = useState([
    {
      name: "",
      score: null,
      img_url: "",
    },
  ]);

  const classifyTweets = async () => {
    setIsJustOpened(false);
    setIsLoading(true);
    console.log("classifying tweets");
    let parameters;
    let results;
    if (userTwitterHandle[0] === "@") {
      parameters = await getSetup(userTwitterHandle.slice(1));
      results = await getClassification(parameters);
    } else {
      parameters = await getSetup(userTwitterHandle);
      results = await getClassification(parameters);
    }
    // figure out which housewives had the top 5 scores
    // get profile pic and name and description of each top 5 housewives
    const results_length = Object.keys(results).length;
    const housewives = await getHousewivesInfo();
    let topHousewifeIsSet = false;
    let others = [];
    for (let i = 0; i < results_length; i++) {
      let res = await getUser(results[`${i}`].username);
      try {
        let twitterApiInfo = res.body.data[0];
        if (!topHousewifeIsSet) {
          // top housewife
          setTopHousewifeInfo({
            name: housewives[twitterApiInfo.username].name,
            score: results[`${i}`].score,
            img_url: twitterApiInfo.profile_image_url,
            bio: housewives[twitterApiInfo.username].bio,
          });
          topHousewifeIsSet = true;
        } else {
          others.push({
            name: housewives[twitterApiInfo.username].name,
            score: results[`${i}`].score,
            img_url: twitterApiInfo.profile_image_url,
          });
        }
      } catch (e) {
        console.log(e);
      }
      
    }
    setRunnerUpHousewives(others);
    setIsLoading(false);
    setIsJustOpened(false);
  };

  useEffect(() => {
    if (isLoading) {
      let i = 0;
      let phrases = [
        "Creating model     ",
        "Creating model .   ",
        "Creating model ..  ",
        "Creating model ... ",
        "Loading weights    ",
        "Loading weights .  ",
        "Loading weights .. ",
        "Loading weights ...",
      ];
      const interval = setInterval(() => {
        setLoadingPhrase(phrases[i]);
        i = i < phrases.length - 1 ? (i = i + 1) : 0;
        console.log(i);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isJustOpened && !isLoading) {
    return (
      <div className="search-page">
        <div className="search-container">
          <form>
            <input
              className="search-bar"
              type="text"
              placeholder="Enter your twitter handle here e.g. @lisavanderpump"
              value={userTwitterHandle}
              onChange={(e) => {
                setUserTwitterHandle(e.target.value);
              }}
            ></input>
            <button
              className="search-submit"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                classifyTweets();
              }}
            >
              <FaSearch size={20}/>
            </button>
          </form>
        </div>
        <div className="classification-container">
        <ClassificationResult
          url={topHousewifeInfo.img_url}
          name={topHousewifeInfo.name}
          bio={topHousewifeInfo.bio}
        ></ClassificationResult>
        <div className="divider"></div>
        <ScoreBreakdown next_four={runnerUpHousewives}></ScoreBreakdown>
      </div>
      </div>
    );
  } else if (isLoading && !isJustOpened) {
    return (
      <div className="search-page">
        <div className="search-container">
          <form>
            <input
              className="search-bar"
              type="text"
              placeholder="Enter your twitter handle here e.g. @lisavanderpump"
              value={userTwitterHandle}
              onChange={(e) => {
                setUserTwitterHandle(e.target.value);
              }}
            ></input>
            <button
              className="search-submit"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                classifyTweets();
              }}
            >
              <FaSearch size={20}/>
            </button>
          </form>
        </div>
        <div className="loading">
          <PropagateLoader className="loading-animation" color={"#00e8ef"} size={30}></PropagateLoader>
          <div className="loading-phrase">
            <p>{loadingPhrase}</p>
          </div>
        </div>
      </div>
    );
  } else if (isJustOpened && !isLoading) {
    return (
      <div className="search-page">
        <div className="search-container">
          <form>
            <input
              className="search-bar"
              type="text"
              placeholder="Enter your twitter handle here e.g. @lisavanderpump"
              value={userTwitterHandle}
              onChange={(e) => {
                setUserTwitterHandle(e.target.value);
              }}
            ></input>
            <button
              className="search-submit"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                classifyTweets();
              }}
            >
              <FaSearch size={20}/>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;
