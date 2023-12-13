import classes from "./Button.module.css"

const Button = (props) => {
    return (
        // set fallback type if props.type is not provided
        <button className={classes.button} type={props.type || 'button'} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Button;