import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getSubreddits } from '../api/reddit';

export const subredditSlice = createSlice({
    name: 'subredditSlice',
    initialState: {
        subreddits: [],
        loading: false,
        error: false,
        displayMenu: false
    },
    reducers: {
        setDisplayMenu(state, action) {
            state.displayMenu = !state.displayMenu;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubreddits.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })

            .addCase(fetchSubreddits.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.subreddits = action.payload;
            })

            .addCase(fetchSubreddits.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    }
});

export const selectSubreddits = (state) => state.subreddit.subreddits;
export const loadingSubreddits = (state) => state.subreddit.loading;
export const errorSubreddits = (state) => state.subreddit.error;
export const selectDisplayMenu = (state) => state.subreddit.displayMenu;

export const {
    setDisplayMenu
} = subredditSlice.actions;

export default subredditSlice.reducer;

export const fetchSubreddits = createAsyncThunk(
    'redditSlice/fetchSubreddits',
    async () => {
        const subreddits = await getSubreddits();
        return subreddits;
    }
);