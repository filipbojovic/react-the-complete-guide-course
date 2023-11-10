import "./Card.css"

const Card = (props) => {
    const id = props.id;

    return <ul id={id}>
        {props.children}
    </ul>
}

export default Card;