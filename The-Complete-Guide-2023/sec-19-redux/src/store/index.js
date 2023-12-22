import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter';
import authReducer from './auth';

// there can be only one reducer passed to store, and with multiple slices sending 'counterSlice.reducer' is not possible. Therefore configureStore should be used which will merge all reducers
const store = configureStore({
    // reducer: counterSlice.reducer
    reducer: { counter: counterReducer, auth: authReducer } // this will be merged into one main reducer
});

export default store;