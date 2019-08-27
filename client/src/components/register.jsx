import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";

class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .min(5)
      .max(50)
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("Password"),
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    //Call the server
    console.log("Submitted");
    try{
      const response = await userService.registerUser(this.state.data);
      localStorage.setItem("token", response.headers['x-auth-token']);
      this.props.history.push('/planner');
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400){
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    return (
      <div className="container-fluid mainContent">
        <h1>Register</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {this.renderInputField("username", "Username", "An email address")}
            {this.renderInputField(
              "password",
              "Password",
              "Password",
              "password"
            )}
            {this.renderInputField("name", "Name", "Your name")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
