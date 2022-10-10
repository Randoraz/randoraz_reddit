import React from "react";
import './Posts.css';

import Post from "../Post/Post";

const Posts = () => {
    const posts = [];

    //hardcoded data
    const post1 = {
        title: 'Cute dogs',
        image: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/06/sausage-dog-maternity-photoshoot-puppies-fb.png',
        postTime: '2 hours ago',
        op: 'Sliu Sliu Nham Nham',
        upvotes: 100
    };

    const post2 = {
        title: 'Cute cats',
        image: 'https://i.pinimg.com/736x/52/c4/86/52c486ac9b5c6e3a130c6eb852333fdb.jpg',
        postTime: '1 hour ago',
        op: 'JokerGamer',
        upvotes: 90
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