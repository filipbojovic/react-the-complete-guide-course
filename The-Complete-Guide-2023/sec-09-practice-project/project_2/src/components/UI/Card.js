import classes from './Card.module.css'

const Card = (props) => {
    return (
        // here we want to apply 2 css classes. One coming from Card css file, and another one coming from props.
        <div className={`${classes.card} ${props.className}`}>{props.children}</div>
    );
};

export default Card;