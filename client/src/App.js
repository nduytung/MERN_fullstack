import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Auth from "./view/Auth.jsx";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./view/Dashboard";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            path="/login"
            render={(props) => <Auth {...props} authRoute="login" />}
          />
          <Route
            path="/register"
            render={(props) => <Auth {...props} authRoute="register" />}
          />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
