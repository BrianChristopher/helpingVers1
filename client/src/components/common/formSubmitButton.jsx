import React from 'react';

const SubmitButton = (props) => {
    const {label} = props;
    return ( 
        <button className="btn btn-info">{label}</button>
     );
}
 
export default SubmitButton;