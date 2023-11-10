import { useState } from 'react';

import './ExpenseForm.css'

const ExpenseForm = () => {
    // document.getElementById('').addEventListener('click', (event) => {})
    // const [enteredTitle, setEnteredTitle] = useState('');
    // const [enteredAmount, setEnteredAmount] = useState('');
    // const [enteredDate, setEnteredDate] = useState('');

    // it is possible to use only one useState() by passing an object
    // the diff here is that if we update only 1 field, all other fields will be updated also
    const [userInput, setUserInput] = useState({
        enteredTitle: '',
        enteredAmount: '',
        enteredDate: ''
    });

    const titleChangeHandler = (event) => {
        // setEnteredTitle(event.target.value);
        setUserInput({
            ...userInput, // get all key-values from the object
            enteredTitle: event.target.value // and here we override enteredTitle
            // if we didn't specify other states, they would be lost
        })
    };
    const amountChangeHandler = (event) => {
        // setEnteredAmount(event.target.value);
        setUserInput({
            ...userInput, // this isn't the best way to update all other states
            enteredAmount: event.target.value
        });
    };
    const dateChangeHandler = (event) => {
        // setEnteredDate(event.target.value);
        setUserInput({
            ...userInput,
            enteredAmount: event.target.value
        });
    }

    return <form>
        <div className="new-expense__controls">
            <div className='new-expense__control'>
                <label>Title</label>
                <input type='text' onChange={titleChangeHandler} />
            </div>
            <div className='new-expense__control'>
                <label>Title</label>
                <input type='number' min='0.01' step='0.01' onChange={amountChangeHandler} />
            </div>
            <div className='new-expense__control'>
                <label>Date</label>
                <input type='date' min='2019-01-01' max='2023-12-31' onCanPlay={dateChangeHandler} />
            </div>
        </div>
        <div className='new-expense__actions'>
            <div typeof='submit'>Add Expense</div>
        </div>
    </form>
}

export default ExpenseForm;