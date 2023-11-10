import "./CardItem.css"

const CardItem = (props) => {
    var className = "concept";
    var title = props.item.title;
    var image = props.item.image;
    var desc = props.item.description;

    return <li className={className}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p>{desc}</p>
    </li>
}

export default CardItem;