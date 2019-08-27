import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { loginUser } from "./../services/authService";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
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

  doSubmit = async () => {
    console.log("Submitted");
    //Call the server
    try {
      const { data } = this.state;
      const {data : jwt} = await loginUser(data.username, data.password);
      localStorage.setItem("token", jwt);
      this.props.history.push('/planner');
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
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
