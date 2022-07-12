import Title from "./components/Title/Title";
import SideBar from "./components/SideBar/SideBar";
import Welcome from "./pages/Welcome/Welcome";
import TweetAnalyser from "./pages/TweetAnalyser/TweetAnalyser";
import Housewives from "./pages/Housewives/Housewives";
import eventBus from "./eventBus";
import {useState} from 'react';

function App() {
  const [pageContent, setPageContent] = useState(<Welcome></Welcome>)
  
  eventBus.on('changePage', (data) => {
    if (data.title === "Welcome") {
      setPageContent(<Welcome></Welcome>)
    } 
    else if (data.title === "Analyse My Tweets") {
      setPageContent(<TweetAnalyser></TweetAnalyser>)
    }
    else {
      setPageContent(<Housewives></Housewives>)
    }
  })

  return (
    <div className="App">
      <Title pageName="Welcome"></Title>
      <SideBar></SideBar>
        {pageContent}
    </div>
  );
}

export default App;
