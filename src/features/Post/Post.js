import React from "react";
import './Post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Post = ({post}) => {
    const title = post.title;
    const image = post.image;
    const postTime = post.postTime;
    const op = post.op;
    const upvotes = post.upvotes;

    return (
        <div id="post">
            <div id="upvotes-container">
                <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-up" />
                <p id="upvotes-number">{upvotes}</p>
                <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-down" />
            </div>
            <div id="post-container">
                <h2 id="post-h2">{title}</h2>
                <img id="post-img" src={image} alt=""/>
                <div id="post-info">
                    <p id="op">Posted by {op}</p>
                    <p id="post-time">{postTime}</p>
                    <FontAwesomeIcon id="comment-icon" icon="fa-solid fa-message" />
                </div>
            </div>
        </div>
    )
}

export default Post;