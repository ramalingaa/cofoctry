import { configureStore } from '@reduxjs/toolkit';
import cofactorReducer from './apiResponseReducer';
const store = configureStore({
  reducer: {
    cofactor: cofactorReducer,
  },
});

export default store;
