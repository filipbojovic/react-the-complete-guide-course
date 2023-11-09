import "./Card.css"

// this should act as a shell for other components.
const Card = (props) => { // children property is always being sent.
    const classes = 'card ' + props.className; // here we enable to always apply clases that
    // are being sent from the inner HTML block

    return <div className={classes}>
        {props.children}
    </div>
}

export default Card;