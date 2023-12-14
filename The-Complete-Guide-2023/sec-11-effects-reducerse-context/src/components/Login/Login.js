import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

// 'state' is the latest state snapshot
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }

  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }

  return { value: '', isValid: false };
};

const Login = (props) => {
  // ************************ CODE US ED BEFORE SEC-008 ************************
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // ************************************************************************
  const [formIsValid, setFormIsValid] = useState(false);


  // the second argument is the default state for 'emailState' snapshot
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassowrd] = useReducer(passwordReducer, { value: '', isValid: null });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passInputRef = useRef();

  useEffect(() => {
    console.log('EFFECT RUNNING');
  }, [])

  // object de-structuring - he an object is not created, but alias is asigned to the extracted value
  // when curly braces are used on the left side of equal sign.
  // this enables for code inside 'useEffect' bellow to be executed IF and ONLY IF validation of email/pass has changed.
  // if password requires length of 6 and users enteres 'abcdef' (isValid changed), after appending other characters to this string
  // the code inside useEffect won't be executed.
  const { isValid: emailIsvalid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!')
      setFormIsValid(emailIsvalid && passwordIsValid);
    }, 500);

    return () => {
      // executes before new useEffect call
      console.log('Cleanup function');
      clearTimeout(identifier);
    }
  }, [emailIsvalid, passwordIsValid]);
  // without specifying dependencies [] it would be the same if setFormIsValid was called outside useEffect hook => loop
  // as dependencies we add what are we using in out useEffect function (first arg)
  // this means that on every update of Login functional component, the first argument of 'useEffect' (which is a function) will be executed only if any of specified dependencies are changes

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value }) // this will cause the 'emailReducer' function to be executed

    // here we manage state based on email value and some other state (password). That is not the best approach to do because
    // it is possible that 'enteredPassword' doesn't contain the latest entered password. Because of that we should a function which contains the previuos state and 
    // based on it update the new one (the approach that was being used until now). So, it is possible to just create one object which will have all these properties (enteredpassowrd, email, etc.)
    // instead of using useState hook for each property. But since sometimes state management can be very complex it is suggested to use 'useReducer' hook.
    // ************************ CODE USED BEFORE SEC-008 ************************
    // setEnteredEmail(event.target.value);
    // setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
    // ************************************************************************
  };

  const passwordChangeHandler = (event) => {
    dispatchPassowrd({ type: 'USER_INPUT', val: event.target.value });

    // ************************ CODE USED BEFORE SEC-008 ************************
    // setEnteredPassword(event.target.value);
    // setFormIsValid(emailState.isValid && passwordState.isValid);
    // ************************************************************************
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'INPUT_BLUR' })

  };

  const validatePasswordHandler = () => {
    dispatchPassowrd({ type: 'INPUT_BLUR' });
    // setPasswordIsValid(passwordState.isValid);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsvalid) {
      emailInputRef.current.focus();
    } else {
      passInputRef.current.focus();
    }

    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" label="E-Mail" type="email" isValid={emailIsvalid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} ref={emailInputRef}></Input>
        <Input id="password" label="Password" type="password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} ref={passInputRef}></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
