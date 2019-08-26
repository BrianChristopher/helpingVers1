import React, { Component } from "react";
import MealPlannerCard from "./mealPlannerCard";

class menuGrid extends Component {
  render() {
    const { weekDetails, mealDetails, userPlannedItems, handleDragStart, handleDrop} = this.props;

    return (
      <div className="mealPlannerContainer">
        <div className="row">
          {weekDetails.map(day => (
            <div className="col p-0 m-0" key={day}>
              <h5 value={day}>{day}</h5>
              {mealDetails.map(meal => (
                <MealPlannerCard
                  key={day + meal}
                  meal={meal}
                  day={day}
                  userPlannedItems={userPlannedItems}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default menuGrid;
