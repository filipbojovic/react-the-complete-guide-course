import { useState } from 'react';
import Card from '../UI/Card'
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
    // it shouldn't be called outside function and inside inner functions which is clickHandler here
    // useState is an array whose first val is the value we want to be updated, and the 2nd
    // is the function that will be used to change its state
    const [title, setTitle] = useState(props.title);

    const clickHandler = () => {
        // this change won't be visible until we define a state for it.
        // Components are actually functions and those functions someone has to call again.
        // title = "Updated;";
        
        // this tells react that the component which uses 'title' as a value, should be re-evaluated
        setTitle('Updated');
        console.log(title);
    }

    return (
        <Card className='expense-item'>
            <ExpenseDate
                date={props.date}
            />
            <div className='expense-item__description'>
                <h2>{title}</h2>
                <div className='expense-item__price'>{props.amount}</div>
            </div>
            <button onClick={clickHandler}>Change Title</button>
        </Card>
    );
}

export default ExpenseItem;