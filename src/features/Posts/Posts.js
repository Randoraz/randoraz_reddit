import React from "react";
import './Posts.css';

import Post from "../Post/Post";

const Posts = () => {
    const posts = [];

    //hardcoded data
    const post1 = {
        title: 'Cute dogs',
        content: 'Dogs are so cute!!!'
    };

    const post2 = {
        title: 'Cute cats',
        content: 'Cats are so cute!!!'
    };

    posts.push(post1);
    posts.push(post2);


    return (
        <div id="posts">
            {posts.map(post => {
                return <Post post={post} />
            })}
        </div>
    )
}

export default Posts;