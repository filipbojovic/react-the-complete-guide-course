import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from "../UI/Button";
import { useRef, useState } from "react";
import ErrorModel from "../UI/ErrorModel";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
    // ref hooks always holds an object which always has 'current' prop that holds the component he is connected to
    // the default value is undefined until we specify 'ref' property for a component.
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState(); // it wil be undefined by default

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredNameByUser = nameInputRef.current.value;
        const enteredAgeByUser = ageInputRef.current.value;

        if (enteredNameByUser.trim().length === 0 || enteredAgeByUser.trim().length === 0) {
            setError({
                title: "Invalid input",
                message: "Please enter a valid name and age (non-empty values)."
            });
            return;
        }
        if (+enteredAgeByUser < 1) { // '+' forces conversion of string to integer
            setError({
                title: "Invalid input",
                message: "Please enter a age (greater than 0)."
            });
            return;
        }

        props.onAddUser(enteredNameByUser, enteredAgeByUser);
        nameInputRef.current.value = ''; // we should rarely use refs to manipulate DOM. This is just for learning purposes. 
        // refs vs states? if we just need to read a value and we never plan changing anything -> use refs.
        ageInputRef.current.value = '';
    }

    const errorHandler = () => {
        setError(null);
    };

    return (
        <Wrapper>
            {error && <ErrorModel title={error.title} message={error.message} onConfirm={errorHandler} />}
            {/* since this is our own component, we have to specify what to do with prop 'className' */}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    {/* htmlFor is used to determine which label is used for which input */}
                    <label htmlFor="username">Username</label>
                    <input id="username" ref={nameInputRef} />
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" ref={ageInputRef} type="number" />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    )
};

export default AddUser;