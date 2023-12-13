import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from "../UI/Button";
import { useState } from "react";
import ErrorModel from "../UI/ErrorModel";

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState(); // it wil be undefined by default

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    };

    const addUserHandler = (event) => {
        event.preventDefault();

        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: "Invalid input",
                message: "Please enter a valid name and age (non-empty values)."
            });
            return;
        }
        if (+enteredAge < 1) { // '+' forces conversion of string to integer
            setError({
                title: "Invalid input",
                message: "Please enter a age (greater than 0)."
            });
            return;
        }

        console.log(enteredUsername, enteredAge);
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
    }

    const errorHandler = () => {
        setError(null);
    };

    return (
        <div>
            {error && <ErrorModel title={error.title} message={error.message} onConfirm={errorHandler} />}
            {/* since this is our own component, we have to specify what to do with prop 'className' */}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    {/* htmlFor is used to determine which label is used for which input */}
                    <label htmlFor="username">Username</label>
                    <input id="username" onChange={usernameChangeHandler} type="text" value={enteredUsername} />
                    <label htmlFor="age" >Age (Years)</label>
                    <input id="age" type="number" onChange={ageChangeHandler} value={enteredAge} />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    )
};

export default AddUser;