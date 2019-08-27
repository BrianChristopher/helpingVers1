import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
//import NotFound from "./components/notFound";
import NavBar from "./components/common/navBar";
import Login from './components/login';
import Register from './components/register';
import Planner from './components/planner';
import NewMenuItem from "./components/newMenuItem";

import "./App.css";



class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container-fluid">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/planner" component={Planner} />
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
