import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Posts.css';

import Post from "../Post/Post";
import { fetchPosts, loadingPosts, errorPosts, selectFilteredPosts, selectSubreddit, fetchComments, setShowingComments, showAllPosts } from "../../store/redditSlice";


const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectFilteredPosts);
    const isLoading = useSelector(loadingPosts);
    const error = useSelector(errorPosts);
    const subreddit = useSelector(selectSubreddit);
    
    useEffect(() => {
        dispatch(fetchPosts(subreddit));
        //eslint-disable-next-line
    }, [subreddit]);

    const toggleShowingComments = (index) => {
        const getComments = (permalink) => {
            const postData = {index, permalink};
            
            dispatch(setShowingComments(index));

            if(!posts[index].showingComments)
                dispatch(fetchComments(postData));
        }
        
        return getComments;
    }

    const loading = <p id="loading-posts-message">Loading posts...</p>;
    const noPosts = <p id="no-posts-message">No posts matching the search term where found</p>;
    const errorMensage = <p id="error-message">Failed to load posts</p>;

    if(isLoading) return loading;
    if(error) return errorMensage;

    if(posts.length === 0) {
        return (
            <div id="posts">
                {noPosts}
                <button id="back-button" aria-label="Back Button" onClick={() => dispatch(showAllPosts())}>Back</button>
            </div>
        );
    }

    return (
        <div id="posts">
            {posts.map((post, index) => {
                return <Post post={post} key={post.id} toggleShowingComments={toggleShowingComments(index)} />
            })}
        </div>
    )
}

export default Posts;