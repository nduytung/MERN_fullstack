import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserROuter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
