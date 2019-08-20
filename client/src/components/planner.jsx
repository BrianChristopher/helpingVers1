import React, { Component } from "react";
import { getWeekDetails } from "./../services/weekDetails";
import { getMealDetails } from "./../services/mealDetails";
import MenuGrid from './common/menuGrid';

class Planner extends Component {
  state = {
    weekDetails: [],
    mealDetails: [],
    userMeals: [],
    userMenuItems: []
  };

  componentDidMount() {
    this.setState({
      weekDetails: getWeekDetails(),
      mealDetails: getMealDetails()
    });
  }

  render() {
    return (
      <div className="container-fluid mainContent">
        <h1>Weekly Meal Planner</h1>
        <div className="row">
          <div className="col-10 p-0 m-0">
            <MenuGrid weekDetails={this.state.weekDetails} mealDetails={this.state.mealDetails} />
          </div>
          <div className="col-2">Menu Items Here</div>
        </div>
      </div>
    );
  }
}

export default Planner;
