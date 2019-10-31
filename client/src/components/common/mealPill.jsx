import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";

class MealPill extends Component {
  render() {
    const { name, location, id } = this.props.item;
    return (
      <span>
        <div
          class="btn-group menuItemButton"
          value={id}
          name={name}
          location={location}
          draggable
          onDragStart={e => this.props.handleDragStart(e, this.props.item._id)}
        >
          <button type="button" class="btn btn-sm btn-block btn-primary">
            {name}
          </button>
          <button
            type="button"
            class="btn btn-sm btn-primary"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </span>
    );
  }
}

export default MealPill;
