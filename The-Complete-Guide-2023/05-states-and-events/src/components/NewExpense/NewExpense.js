import React from 'react'

import ExpenseForm from './ExpenseForm'
import './NewExpense.css'

const NewExpense = (props) => {
    // saveExpenseDatahandler function will be called inside ExpenseForm
    const saveExpenseDatahandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData, // pull all the key-values from given object
            id: Math.random().toString()
        };
        props.onAddExpense(); // this one comes from App.js
    };

    return <div className='new-expense'>
        {/* here we define our own property onSaveExpenseData where we do expect a function. That's why it starts with 'on' */}
        <ExpenseForm onSaveExpenseData={saveExpenseDatahandler} />
    </div>
}

export default NewExpense;