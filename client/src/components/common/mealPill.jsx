import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";

class MealPill extends Component {
  render() {
    const { name, location, id } = this.props.item;
    return (
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
          class="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="sr-only">Toggle Dropdown</span>
        </button>

        <div class="dropdown-menu">
          <button class="dropdown-item" type="button">
            Info
          </button>
          <button class="dropdown-item" type="button">
            Edit
          </button>
          <button class="dropdown-item" type="button">
            Delete
          </button>
        </div>
      </div>

      // <h6
      //   value={id}
      //   name={name}
      //   location={location}
      //   draggable
      //   onDragStart={e => this.props.handleDragStart(e, this.props.item._id)}
      // >
      //   <Badge className="menuItemPill" pill variant="primary">
      //     {name}
      //   </Badge>
      // </h6>
    );
  }
}

export default MealPill;
