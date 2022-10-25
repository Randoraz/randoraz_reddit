import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRedditPosts, getPostComments } from '../api/reddit';

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
        },
        setShowingComments(state, action) {
            state.filteredPosts[action.payload].showingComments = !state.filteredPosts[action.payload].showingComments;
        },
        showAllPosts(state, action) {
            state.filteredPosts = state.posts;
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

                state.posts = state.posts.map(post => {
                    return {
                        ...post,
                        showingComments: false,
                        comments: [],
                        loadingComments: false,
                        errorComments: false
                    }
                });
                
                state.filteredPosts = state.posts;
            })

            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });

        builder
            .addCase(fetchComments.pending, (state, action) => {
                state.filteredPosts[action.meta.arg.index].loadingComments = true;
                state.filteredPosts[action.meta.arg.index].errorComments = false;
                console.log("pending comments");
            })

            .addCase(fetchComments.fulfilled, (state, action) => {
                state.filteredPosts[action.payload.index].loadingComments = false;
                state.filteredPosts[action.payload.index].errorComments = false;
                state.filteredPosts[action.payload.index].comments = action.payload.comments;
                console.log("got comments!");
            })

            .addCase(fetchComments.rejected, (state, action) => {
                state.filteredPosts[action.meta.arg.index].loadingComments = false;
                state.filteredPosts[action.meta.arg.index].errorComments = true;
            });
    }
});

export const {
    setSubreddit,
    setSearchTerm,
    getFilteredPosts,
    setShowingComments,
    showAllPosts
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

export const fetchComments = createAsyncThunk(
    'redditSlice/fetchComments',
    async (postData) => {
        console.log(postData);
        const {index, permalink} = postData;
        const comments = await getPostComments(permalink);
        return {index, comments};
    }
)