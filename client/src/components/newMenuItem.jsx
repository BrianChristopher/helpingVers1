import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class NewMenuItem extends Form {
  state = {
    data: { name: "", category: [], ingredients: [] },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("Menu Item Name"),
    category: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("Category"),
    ingredients: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("Ingredients")
  };

  doSubmit = () => {
    //Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="container-fluid mainContent">
        <h1>Create New Menu Item</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {this.renderInputField("name", "Menu Item Name", "New Menu Item")}
            {this.renderInputField("category", "Category", "Category")}
            {this.renderInputField("ingredients", "Ingredients", "Ingredients")}
            {this.renderButton("Create New Menu Item")}
          </form>
        </div>
      </div>
    );
  }
}

export default NewMenuItem;
