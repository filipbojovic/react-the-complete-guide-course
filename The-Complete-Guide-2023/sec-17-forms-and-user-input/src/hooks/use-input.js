import { useState, useReducer } from 'react'

const initialInputState = {
    value: '',
    isTouched: false
};
const inputStateReducer = (prevStateSnapshot, action) => {
    if (action.type === 'INPUT') {
        return {
            value: action.value,
            isTouched: prevStateSnapshot.isTouched // using the prev state for isTouched in order to not break the input??? 016(07:00)
        }

    } else if (action.type === 'BLUR') {
        return { isTouched: true, value: prevStateSnapshot.value }

    } else if (action.type === 'RESET') {
        return initialInputState;
    }

    return initialInputState;
}


// ********************** aproach with using useReducer **********************
// *************************************************************************
const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatch({ type: 'INPUT', value: event.target.value });
    };
    const inputBlurHandler = (event) => {
        dispatch({ type: 'BLUR' });
    };
    const reset = () => {
        dispatch({ type: 'RESET' });
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }

}

// ********************** aproach with using useState **********************
// *************************************************************************
// const useInput = (validateValue) => {
//     const [enteredValue, setEnteredValue] = useState('');
//     const [touched, setIsTouched] = useState(false);

//     const valueIsValid = validateValue(enteredValue);
//     const hasError = !valueIsValid && touched

//     const valueChangeHandler = (event) => {
//         setEnteredValue(event.target.value);
//     };
//     const inputBlurHandler = (event) => {
//         setIsTouched(true);
//     };
//     const reset = () => {
//         setEnteredValue('');
//         setIsTouched(false);
//     }

//     return {
//         value: enteredValue,
//         isValid: valueIsValid,
//         hasError,
//         valueChangeHandler,
//         inputBlurHandler,
//         reset
//     }
// }

export default useInput;