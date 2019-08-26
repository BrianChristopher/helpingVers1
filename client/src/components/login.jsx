import React, { Component } from "react";
import FormInput from "./common/formInputField";
import SubmitButton from "./common/formSubmitButton";

class Login extends Component {
  state = {
    account: { username: "", password: "", name: "" }
  };
  handleSubmit = e => {
    e.preventDefault();

    //Call the server
    console.log("Submitted");
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div className="container-fluid mainContent">
        <h1>Login</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <FormInput
              value={account.username}
              onChange={this.handleChange}
              id="username"
              label="Username"
              type="text"
              placeholder="An email address"
            />
            <FormInput
              value={account.password}
              onChange={this.handleChange}
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
            />
            <SubmitButton label="Login" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
