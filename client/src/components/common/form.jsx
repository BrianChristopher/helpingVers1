import React, { Component } from "react";
import Joi from "joi-browser";
import SubmitButton from "./formSubmitButton";
import FormInput from "./formInputField";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateInput = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateInput(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  
  renderInputField = (name, label, placeholder, type = "text" ) =>{
    const { data, errors } = this.state;
      return <FormInput
      value={data[name]}
      onChange={this.handleChange}
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      error={errors[name]}
    />
  }

  renderButton = label => {
    return <SubmitButton disabled={this.validate()} label={label} />;
  };
}

export default Form;
