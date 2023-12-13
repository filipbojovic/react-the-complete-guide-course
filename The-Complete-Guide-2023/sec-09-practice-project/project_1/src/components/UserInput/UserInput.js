import { useState } from "react";
import classes from './UserInput.module.css'

// we are adding those consts outside function because we don't want for them to be re-initialized each time
// state is changed
const CURRENT_SAVINGS = "current-savings";
const YEARLY_CONTRIBUTION = 'yearly-contribution';
const EXPECTED_RETURN = 'expected-return';
const DURATION = 'duration';
let INITAL_USER_INPUT = {
    [CURRENT_SAVINGS]: 1000,
    [YEARLY_CONTRIBUTION]: 1200,
    [EXPECTED_RETURN]: 7,
    [DURATION]: 10
};

const UserInput = (props) => {
    const [userInput, setUserInput] = useState(INITAL_USER_INPUT);

    const submitHandler = (event) => {
        event.preventDefault(); // this will prevent page reload on submit

        props.onCalculate(userInput);
    };

    const resetHandler = () => {
        setUserInput(INITAL_USER_INPUT)
        console.log(userInput[CURRENT_SAVINGS]);
    };

    const inputChangeHandler = (input, value) => { // 'input' for which handler occurred'. Take a notice how this function is called, it's not like handlers above
        console.log(input, value)
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                [input]: +value,
            };
        });
    };

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes['input-group']}>
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    <input onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} type="number" id={CURRENT_SAVINGS} value={userInput[CURRENT_SAVINGS]} />
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} type="number" id={YEARLY_CONTRIBUTION} value={userInput[YEARLY_CONTRIBUTION]} />
                </p>
            </div>
            <div className={classes['input-group']}>
                <p>
                    <label htmlFor="expected-return">
                        Expected Interest (%, per year)
                    </label>
                    <input onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} type="number" id={EXPECTED_RETURN} value={userInput[EXPECTED_RETURN]} />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input onChange={(event) => inputChangeHandler(event.target.id, event.target.value)} type="number" id={DURATION} value={userInput[DURATION]} />
                </p>
            </div>
            <p className={classes.actions}>
                <button onClick={resetHandler} type="reset" className={classes.buttonAlt}>
                    Reset
                </button>
                <button type="submit" className={classes.button}>
                    Calculate
                </button>
            </p>
        </form>
    )
};

export default UserInput;