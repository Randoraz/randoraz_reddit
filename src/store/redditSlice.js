import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getRedditPosts } from '../api/reddit';

export const redditSlice = createSlice({
    name: 'redditSlice',
    initialState: {
        posts: [],
        filteredPosts: [],
        loading: false,
        error: false,
        subreddit: 'r/Animals',
        searchTerm: ''
    },
    reducers: {
        setSubreddit(state, action) {
            console.log(`Selected: ${action.payload}`);
            state.subreddit = action.payload;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        getFilteredPosts(state, action) {
            if(state.searchTerm !== '') {
                state.filteredPosts = state.posts.filter(post => {
                    return post.title.toLowerCase().includes(state.searchTerm.toLowerCase());
                });
            } else {
                state.filteredPosts = [];
            }
        }
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
                state.filteredPosts = state.posts;
            })

            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    }
});

export const {
    setSubreddit,
    setSearchTerm,
    getFilteredPosts
} = redditSlice.actions;

export default redditSlice.reducer;


export const selectFilteredPosts = (state) => state.reddit.filteredPosts;
export const loadingPosts = (state) => state.reddit.loading;
export const errorPosts = (state) => state.reddit.errorPosts;
export const selectSubreddit = (state) => state.reddit.subreddit;
export const selectSearchTerm = (state) => state.reddit.searchTerm;


export const fetchPosts = createAsyncThunk(
    'redditSlice/fetchPosts',
    async (subreddit) => {
        const posts = await getRedditPosts(subreddit);
        return posts;
    }
);