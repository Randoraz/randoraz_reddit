import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import redditReducer from './redditSlice';
import subredditReducer from './subredditSlice';

export const store = configureStore({
  reducer: {
    reddit: redditReducer,
    subreddit: subredditReducer
  },
});
