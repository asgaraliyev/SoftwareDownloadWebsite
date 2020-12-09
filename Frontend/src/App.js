import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import HomeTwo from "./pages/HomeTwo";
import HomeThree from "./pages/HomeThree";
import "./style/index.scss";
import TheDrawer from "./Components/TheDrawer";
function App() {
  return (
    <div id="main">
      <Router>
        <TheDrawer></TheDrawer>
        <Switch>
          <Route exact path="/">
            <HomeTwo />
          </Route>

          <Route exact path="/catagories">
            <Home />
          </Route>
          <Route exact path="/posts">
            <HomeTwo />
          </Route>
          <Route exact path="/gallery">
            <HomeThree />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
