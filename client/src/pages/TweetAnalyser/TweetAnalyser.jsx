import { React, useState, useEffect } from "react";
import "./TweetAnalyser.css";
import { getClassification, getUser, getHousewivesInfo } from "../../services";
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
    let results;
    if (userTwitterHandle[0] === "@") {
      results = await getClassification(userTwitterHandle.slice(1));
    } else {
      results = await getClassification(userTwitterHandle);
    }
    // figure out which housewives had the top 5 scores
    // get profile pic and name and description of each top 5 housewives
    const results_length = Object.keys(results).length;
    const housewives = await getHousewivesInfo();
    let others = [];
    for (let i = 0; i < results_length; i++) {
      let res = await getUser(results[`${i}`].username);
      let twitterApiInfo = res.body.data[0];
      if (i === 0) {
        // top housewife
        setTopHousewifeInfo({
          name: housewives[twitterApiInfo.username].name,
          score: results[`${i}`].score,
          img_url: twitterApiInfo.profile_image_url,
          bio: housewives[twitterApiInfo.username].bio,
        });
      } else {
        others.push({
          name: housewives[twitterApiInfo.username].name,
          score: results[`${i}`].score,
          img_url: twitterApiInfo.profile_image_url,
        });
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

        <ClassificationResult
          url={topHousewifeInfo.img_url}
          name={topHousewifeInfo.name}
          bio={topHousewifeInfo.bio}
        ></ClassificationResult>
        <div className="divider"></div>
        <ScoreBreakdown next_four={runnerUpHousewives}></ScoreBreakdown>
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
          <PropagateLoader className="loading-animation" color={"#00e8ef"} size={30}></PropagateLoader>
          <div className="loading-phrase">
            <p>{loadingPhrase}</p>
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
