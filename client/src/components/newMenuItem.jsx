import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCurrentUser } from "./../services/authService";
import menuItemService from "./../services/menuItemService";

class NewMenuItem extends Form {
  state = {
    user: { _id: "" },
    data: { name: "", category: [], ingredients: [] },
    errors: {}
  };

  componentDidMount() {
    const userID = getCurrentUser()._id;
    const user = { ...this.state.user };
    user._id = userID;
    console.log(user._id);
    this.setState({ user });
    console.log(this.state.user);
  }

  schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("Menu Item Name"),
    category: Joi.label("Category"),
    ingredients: Joi.label("Ingredients")
  };

  doSubmit = () => {
    //Call the server
    console.log("Submitted");

    try {
      menuItemService.createNewMenuItem(this.state.data, this.state.user._id);
      window.location = "/planner";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container-fluid mainContent">
        <h1>Create New Menu Item</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {this.renderInputField("name", "Menu Item Name", "New Menu Item")}
            {this.renderInputField(
              "category",
              "Category",
              "Category  --  Please don't type here yet, things will break."
            )}
            {this.renderInputField(
              "ingredients",
              "Ingredients",
              "Ingredients  --  Please don't type here yet, things will break."
            )}
            {this.renderButton("Create New Menu Item")}
          </form>
        </div>
      </div>
    );
  }
}

export default NewMenuItem;
