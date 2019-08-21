import React, { Component } from "react";
import MealPill from "./mealPill";

class MealPlannerCard extends Component {
  render() {
    const cardId = this.props.day + this.props.meal;
    const userPlannedItems = this.props.userPlannedItems;
    console.log(userPlannedItems);
    const mealItems = [];
    userPlannedItems.forEach(checkMealLocation)

    function checkMealLocation(meal) {
      if (meal.location === cardId) mealItems.push(meal)
    }


    return (
      <div className="card mealCard" key={this.props.meal}>
        <div className="card-header mealCardHeader">
          <h6>{this.props.meal}</h6>
        </div>
        <div
          className="card-body mealCardBody"
          id={cardId}
          // onDrop="drop(event)"
          onDragOver={(e)=> e.preventDefault()}
          onDrop={(e)=>this.props.handleDrop(e, cardId)}
        >{mealItems.map(item => <MealPill key={item.id} item={item} />)}</div>
      </div>
    );
  }
}

export default MealPlannerCard;
