import React from "react";
import './Post.css';

const Post = ({post}) => {
    const title = post.title;
    const content = post.content;

    return (
        <div id="post">
            <h2 id="post-h2">{title}</h2>
            <p id="post-p">{content}</p>
        </div>
    )
}

export default Post;