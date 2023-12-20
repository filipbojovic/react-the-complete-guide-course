import React from 'react';
import classes from "./Input.module.css"

const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id} >{props.label}</label>
            <input ref={ref} id={props.id} {...props.input} /> {/* {...props.input} -> this will add all the props which are forwarded through props arg. E.g. id='id' could also be passed here */}
        </div>
    );
});

export default Input;