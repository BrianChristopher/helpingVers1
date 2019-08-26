import React, { Component } from "react";
import Joi from "joi-browser";
import FormInput from "./common/formInputField";
import SubmitButton from "./common/formSubmitButton";

class Register extends Component {
  state = {
    account: { username: "", password: "", name: "" },
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

  validate = () => {
    const { error } = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    //Call the server
    console.log("Submitted");
  };

  validateInput = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateInput(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className="container-fluid mainContent">
        <h1>Register</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <FormInput
              value={account.username}
              onChange={this.handleChange}
              id="username"
              label="Username"
              type="text"
              placeholder="An email address"
              error={errors.username}
            />
            <FormInput
              value={account.password}
              onChange={this.handleChange}
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              error={errors.password}
            />
            <FormInput
              value={account.name}
              onChange={this.handleChange}
              id="name"
              label="Name"
              type="text"
              placeholder="Your name"
              error={errors.name}
            />
            <SubmitButton disabled={this.validate()} label="Register" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
