import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import redditReducer from './redditSlice';

export const store = configureStore({
  reducer: {
    reddit: redditReducer,
  },
});
