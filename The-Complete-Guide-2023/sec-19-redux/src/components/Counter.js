import { useSelector, useDispatch } from 'react-redux'
import classes from './Counter.module.css';
import { counterActions } from '../store/counter';

const Counter = () => {
  const dispatch = useDispatch();
  // send a function to extract the piece of code we want to use
  // when 'useSelector' is being used, the react-redux would automatically set up the subscription
  // so the changes to redux store will cause this component to be re-evaluated
  // if we would ever remove this component, the react-redux lib would automatically remove the subscription.
  const counter = useSelector(state => state.counter.counter); // first 'counter' is to access the corresponding slice inside store, and the second one is property
  const show = useSelector(state => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };
  const increaseHandler = () => {
    dispatch(counterActions.increase(10)); // redux will automtically create the following structure: { type: SOME_ID, payload: 10 }
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
