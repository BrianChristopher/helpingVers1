import React, { Component } from "react";
import { getWeekDetails } from "./../services/weekDetails";
import { getMealDetails } from "./../services/mealDetails";
import { getUserMenuItems } from "../services/userMenuItems";
import MenuGrid from "./common/menuGrid";
import MenuItems from "./common/menuItems";
import { getPlannedItems } from "../services/userPlannedItems";

class Planner extends Component {
  state = {
    weekDetails: [],
    mealDetails: [],
    userMenuItems: [],
    userPlannedItems: []
  };

  componentDidMount() {
    this.setState({
      weekDetails: getWeekDetails(),
      mealDetails: getMealDetails(),
      userMenuItems: getUserMenuItems(),
      userPlannedItems: getPlannedItems()
    });
  }

  handleDragStart(e, itemId) {
    e.dataTransfer.setData("text/plain", itemId);
    console.log(itemId);
  }

  handleDrop(e, mealCardID) {}

  render() {
    return (
      <div className="container-fluid mainContent">
        <h1>Weekly Meal Planner</h1>
        <div className="row">
          <div className="col-10 p-0 m-0">
            <MenuGrid
              weekDetails={this.state.weekDetails}
              mealDetails={this.state.mealDetails}
              userPlannedItems={this.state.userPlannedItems}
            />
          </div>
          <div className="col-2 p-0 m-0">
            <MenuItems
              userMenuItems={this.state.userMenuItems}
              handleDragStart={this.handleDragStart}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Planner;
