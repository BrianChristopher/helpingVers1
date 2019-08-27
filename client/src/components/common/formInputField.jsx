import React from "react";

const FormInput = props => {
  const { id, label, error, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        {...rest}
        name={id}
        id={id}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default FormInput;
