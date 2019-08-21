import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";

class MealPill extends Component {
  render() {
      const {name, location, id} = this.props.item;
    return (
      <h6
        value={id}
        name={name}
        location={location}
        draggable
        onDragStart={e => this.props.handleDragStart(e, id)}
      >
        <Badge className="menuItemPill" pill variant="primary">
          {name}
        </Badge>
      </h6>
    );
  }
}

export default MealPill;
