import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getRedditPosts } from '../api/reddit';

export const redditSlice = createSlice({
    name: 'redditSlice',
    initialState: {
        posts: [],
        loading: false,
        error: false,
        subreddit: 'r/Animals'
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })

            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.posts = action.payload;
            })

            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
    }
});

export default redditSlice.reducer;

export const selectPosts = (state) => state.reddit.posts;
export const loadingPosts = (state) => state.reddit.loading;
export const selectSubreddit = (state) => state.reddit.subreddit;

export const fetchPosts = createAsyncThunk(
    'redditSlice/fetchPosts',
    async (subreddit) => {
        const posts = await getRedditPosts(subreddit);
        return posts;
    }
)