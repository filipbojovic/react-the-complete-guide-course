import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import styles from './CourseInput.module.css';
import styled from 'styled-components';

// const FormControl = styled.div`
//   margin: 0.5rem 0;

// & label {
//   font-weight: bold;
//   display: block;
//   margin-bottom: 0.5rem;
//   color: ${props => props.invalid ? 'red' : 'black'}
// }

// & input {
//   display: block;
//   width: 100%;
//   border: 1px solid ${props => props.invalid ? 'red' : '#ccc'};
//   background: ${props => props.invalid ? '#ffd7d7' : 'transparent'}
//   font: inherit;
//   line-height: 1.5rem;
//   padding: 0 0.25rem;
// }

//  &input:focus {
//   outline: none;
//   background: #fad0ec;
//   border-color: #8b005d;
// }

// // we don't need these anymore because of the approach [14, 20, 21]
// // &.invalid input {
// //   background-color: red;
// //   background: #ffd7d7;
// // }

// // &.invalid label {
// //   color: red;
// // }
// `;

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  // indicator if user something submitted or not. by default is true
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }

    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );

  // return (
  //   <form onSubmit={formSubmitHandler}>
  //     <FormControl invalid={!isValid}> {/* 005 -> 04:10; Adding props to be used in `` above, so we can dynamically change style -> lines [14, 20, 21] */}
  //       <label>Course Goal</label>
  //       <input type="text" onChange={goalInputChangeHandler} />
  //     </FormControl>
  //     <Button type="submit">Add Goal</Button>
  //   </form>
  // );
};

export default CourseInput;
