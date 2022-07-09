import Title from "./components/Title/Title";
import SideBar from "./components/SideBar/SideBar";
import WelcomeText from "./components/WelcomeText/WelcomeText";
function App() {
  return (
    <div className="App">
      <Title pageName="Welcome"></Title>
      <SideBar></SideBar>
      <WelcomeText></WelcomeText>
    </div>
  );
}

export default App;
