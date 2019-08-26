import React from 'react';

const SubmitButton = (props) => {
    const {label, disabled} = props;
    return ( 
        <button className="btn btn-info" disabled={disabled}>{label}</button>
     );
}
 
export default SubmitButton;