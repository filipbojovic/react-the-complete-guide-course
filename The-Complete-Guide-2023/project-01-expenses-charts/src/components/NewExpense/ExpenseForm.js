import { useState } from 'react';

import './ExpenseForm.css'

const ExpenseForm = (props) => {
    // document.getElementById('').addEventListener('click', (event) => {})
    // [7-8] 
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    // it is possible to use only one useState() by passing an object
    // the diff here is that if we update only 1 field, all other fields will be updated also
    // the code [13-18] is used to update a state based on the values of the previous state (all at once)
    // const [userInput, setUserInput] = useState({
    //     enteredTitle: '',
    //     enteredAmount: '',
    //     enteredDate: ''
    // });

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);

        // 2nd approach
        // here it is possible that the given prevState is not the correct one if multiple
        // such updates are executing at the same time. Therefore, we should use the 
        // the approach shown below.
        // setUserInput({
        //     ...userInput, // get all key-values from the object
        //     enteredTitle: event.target.value // and here we override enteredTitle
        //     // if we didn't specify other states, they would be lost
        // })

        // 3rd approach
        // it is guaranteed that we are operating on the lastest state snapshot
        // setUserInput((prevState) => {
        //     return { ...prevState, enteredTitle: event.target.value };
        // })
    };
    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);

        // setUserInput({
        //     ...userInput, // this isn't the best way to update all other states
        //     enteredAmount: event.target.value
        // });
    };
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);

        // setUserInput({
        //     ...userInput,
        //     enteredAmount: event.target.value
        // });
    }

    // instead of having separate change handler functions, we can create a SHARED one
    const inputChangeHandler = (identifier, value) => {
        if (identifier === 'title') {
            setEnteredTitle(value);
        } else if (identifier === 'date') {
            setEnteredDate(value);
        } else {
            setEnteredAmount(value);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate)
        }

        props.onSaveExpenseData(expenseData); // here we call function defined in parent component

        // two way binding -> add 'value' property to each input field so it can be reseted from here.
        setEnteredTitle('');
        setEnteredDate('');
        setEnteredAmount('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input type='text' value={enteredTitle} onChange={(event) => { inputChangeHandler("title", event.target.value) }} />
                </div>
                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input type='number' min='0.01' value={enteredAmount} step='0.01' onChange={(event) => { inputChangeHandler("amount", event.target.value) }} />
                </div>
                <div className='new-expense__control'>
                    <label>Date</label>
                    <input type='date' min='2019-01-01' value={enteredDate} max='2023-12-31' onChange={(event) => { inputChangeHandler("date", event.target.value) }} />
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type='submit'>Add Expense</button>
            </div>
        </form>
    );
}

export default ExpenseForm;