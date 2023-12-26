import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";

function MeetupItem(props) {
  const router = useRouter();

  const showDetailsHandler = () => {
    // it pushes a new page on the stack of pages.
    router.push("/" + props.id);
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          {/* it's better to use Link here, but just for to show how to redirect programatically, button is used. */}
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
