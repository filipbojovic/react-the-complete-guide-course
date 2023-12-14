import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css'

// if 'ref' is specified in the calling component, then we can expect it as the second argument in the Input function 
// but in order to expect 'ref' as the second arg then we have to export our function in the special way by using React.forwardRef
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();
    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(
        ref,
        () => { // here put all the data that we should be able to access outside this function (external name : internal object)
            return {
                focus: activate
            }
        });

    // goal here is not to focus component once rendering is done, but this want just a showcase.
    // useEffect(() => {
    //     inputRef.current.focus();
    // }, []); // empty dependencies means the function will be executed only once, when rendering is done.

    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    )

})

export default Input;