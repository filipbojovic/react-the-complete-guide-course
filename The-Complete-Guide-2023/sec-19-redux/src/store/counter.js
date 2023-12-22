import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: { // the map of all the reducers this slice needs
        increment(state) { // in the background redux will execute this action in the immutable way
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) { // action is not needed in above reducers
            state.counter = state.counter + action.payload; // payload contains any extra data we might dispatching
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;