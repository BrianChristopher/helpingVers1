import React from "react";

const FormInput = props => {
  const { id, label, placeholder, value, onChange, type, error } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={id}
        id={id}
        type={type}
        className="form-control"
        placeholder={placeholder}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default FormInput;
