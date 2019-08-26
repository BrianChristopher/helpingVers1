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

  handleDragStart(e, itemInfo) {
    e.dataTransfer.setData("text/plain", itemInfo);
    //console.log(itemInfo);
  }
  //handleDrop must be an arrow function to refernce this.state.
  handleDrop = (e, cardId) => {
    console.log("CARD ID: ", cardId);
    //foodId is the _id of menu item on the pill
    const foodId = e.dataTransfer.getData("text");
    let onPlanner = false;

    this.state.userPlannedItems.forEach(checkID);
    function checkID(item) {
      //console.log(item._id.toString(), foodId);
      if (item._id.toString() === foodId) onPlanner = true;
      //console.log(onPlanner);
    }

    if (onPlanner) {
      //console.log("This item is already on the planner.")
      const index = this.state.userPlannedItems.findIndex(
        item => item._id.toString() === foodId
      );
      //console.log(index);
      //Make a copy of the array
      const arrayCopy = this.state.userPlannedItems;
      //Change the location of the item
      arrayCopy[index].location = cardId;
      //console.log(arrayCopy);
      //Update state with the revised copy
      this.setState({ userPlannedItems: arrayCopy });
    }

    if (!onPlanner) {
      const matchedMenuItem = this.state.userMenuItems.find(
        item => item._id.toString() === foodId
      );
      const newPlannerItem = {
        _id: Math.floor(Math.random() * 10000) + 1000,
        menuItemId: matchedMenuItem._id,
        name: matchedMenuItem.name,
        location: cardId
      };
      this.setState({
        userPlannedItems: [...this.state.userPlannedItems, newPlannerItem]
      });
    }
  };

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
              handleDragStart={this.handleDragStart}
              handleDrop={this.handleDrop}
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
