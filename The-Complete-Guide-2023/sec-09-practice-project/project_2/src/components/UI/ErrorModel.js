import Button from "./Button";
import Card from "./Card";
import classes from './ErrorModel.module.css'

const ErrorModel = (props) => {
    return (
        <div>
            {/* onConfirm in the div below will be called when we click on the div itself (blured one which contains div that represents error -> BACKGROUND click) */}
            <div className={classes.backdrop} onClick={props.onConfirm}>

            </div>
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={classes.actions}>
                    <Button onClick={props.onConfirm}>Okay</Button>
                </footer>
            </Card>
        </div>
    );
}

export default ErrorModel;