import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import MealPill from "./mealPill";

class MenuItems extends Component {
  render() {
    const userMenuItems = this.props.userMenuItems;
    const handleDragStart = this.props.handleDragStart;
    console.log(userMenuItems.length);

    return (
      <div className="menuItemsContainer">
        <h5>Your Menu Items</h5>
        {/* This is a future filter feature.
        <Dropdown>
          <Dropdown.Toggle
            variant="info"
            id="dropdown-basic"
            style={{ width: "100%" }}
          >
            Filter By Category
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">All Items</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Breakfast</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Lunch and Dinner</Dropdown.Item>
            <Dropdown.Item href="#/action-4">Quick and Easy</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

        <Card className="menuItemsCard">
          <Card.Body className="menuItemsCard">
            {/* <div>Pills go here.</div> */}
            {userMenuItems.map(item => (
              <MealPill
                key={item._id}
                item={item}
                handleDragStart={handleDragStart}
              />
            ))}
            {userMenuItems.length === 0 && (
              <p>
                You have not yet created any menu items. Please go to "Create"
                to make some menu items.
              </p>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default MenuItems;
