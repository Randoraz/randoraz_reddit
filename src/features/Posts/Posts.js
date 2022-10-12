import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Posts.css';

import Post from "../Post/Post";
import { fetchPosts, loadingPosts, errorPosts, selectPosts, selectSubreddit } from "../../store/redditSlice";


const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const isLoading = useSelector(loadingPosts);
    const error = useSelector(errorPosts);
    const subreddit = useSelector(selectSubreddit);
    
    useEffect(() => {
        dispatch(fetchPosts(subreddit));
    }, [subreddit]);

    //hardcoded data
    // const post1 = {
    //     title: 'Cute dogs',
    //     url: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/06/sausage-dog-maternity-photoshoot-puppies-fb.png',
    //     created_utc: '2 hours ago',
    //     author: 'Sliu Sliu Nham Nham',
    //     ups: 100
    // };

    // const post2 = {
    //     title: 'Cute cats',
    //     url: 'https://i.pinimg.com/736x/52/c4/86/52c486ac9b5c6e3a130c6eb852333fdb.jpg',
    //     created_utc: '1 hour ago',
    //     author: 'JokerGamer',
    //     ups: 90
    // };

    // posts.push(post1);
    // posts.push(post2);


    //if(isLoading) return <div id="posts"><p>Loading...</p></div>;
    if(posts.length === 0) return null;

    return (
        <div id="posts">
            {posts.map(post => {
                return <Post post={post} key={post.id}/>
            })}
        </div>
    )
}

export default Posts;