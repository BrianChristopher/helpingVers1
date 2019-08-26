import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class Login extends Form {
  state = {
    data: { username: "", password: ""},
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
      .label("Password")
  };

  doSubmit = () => {
    //Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="container-fluid mainContent">
        <h1>Login</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {this.renderInputField("username", "Username", "An email address")}
            {this.renderInputField(
              "password",
              "Password",
              "Password",
              "password"
            )}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
