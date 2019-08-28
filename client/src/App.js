import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import NavBar from "./components/common/navBar";
import Login from "./components/login";
import Logout from "./components/logout";
import Register from "./components/register";
import Planner from "./components/planner";
import Create from "./components/create";
import Profile from "./components/profile";
import NewMenuItem from "./components/newMenuItem";
import auth from "./services/authService";
//import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user});
  }
  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user}/>
        <main className="container-fluid">
          <Switch>
            <Route path="/home" component={Home} user={this.state.user} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/planner" component={Planner} />
            <Route path="/create" component={Create} />
            <Route path="/profile" component={Profile} />
            <Route path="/menuItem/new" component={NewMenuItem} />
            {/* <Route path="/not-found" component={NotFound} /> */}
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
