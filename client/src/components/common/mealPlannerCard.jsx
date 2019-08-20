import React, { Component } from "react";

class MealPlannerCard extends Component {
  render() {
    return (
      <div className="card mealCard" key={this.props.meal}>
        <div className="card-header mealCardHeader">
          <h6>{this.props.meal}</h6>
        </div>
        <div
          className="card-body mealCardBody"
          id={this.props.day + this.props.meal}
          // onDrop="drop(event)"
          // onDragOver="allowDrop(event)"
        />
      </div>
    );
  }
}

export default MealPlannerCard;
