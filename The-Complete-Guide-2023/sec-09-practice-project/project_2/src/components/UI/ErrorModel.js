import Button from "./Button";
import Card from "./Card";
import classes from './ErrorModel.module.css'
import React from "react";
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    {/* onConfirm in the div below will be called when we click on the div itself (blured one which contains div that represents error -> BACKGROUND click) */ }
    return (<div className={classes.backdrop} onClick={props.onConfirm} />);
}

const ModelOverlay = (props) => {
    return (
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
    );
}

const ErrorModel = (props) => {
    return (
        <React.Fragment>
            {
                // first arg is the element that should be rendered
                // the second one is a pointer to element where the first arg should be forwarded
                ReactDOM.createPortal(
                    <Backdrop onConfirm={props.onConfirm} />,
                    document.getElementById('backdrop-root')
                )}
            {ReactDOM.createPortal(
                <ModelOverlay
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                />,
                document.getElementById('overlay-root')
            )}
        </React.Fragment>
    );
}

export default ErrorModel;