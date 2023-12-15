import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const [isAmountValid, setIsAmountValid] = useState(true);

    const amountInputRef = useRef();
    const submitHandler = (event) => { // event is being sent automatically when the form is submitted
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value; // amountInputRef points to <Input> element defined below (to its <input> component)
        const enteredAmountNumber = +enteredAmount; // convert string to number

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setIsAmountValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    };

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input
            ref={amountInputRef} // in order to make refs work on 'CUSTOM' component, we have to define Input as 'React.forwardRef'
            label="Amount"
            input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
        <button>+ Add</button>
        {!isAmountValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
}

export default MealItemForm;