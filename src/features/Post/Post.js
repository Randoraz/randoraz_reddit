import React from "react";
import './Post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Post = ({post}) => {
    const title = post.title;
    const postsMetadata = post.media_metadata ? post.media_metadata : null;
    const postTime = post.created_utc;
    const author = post.author;
    const upvotes = post.ups;

    const images = [];
    if(postsMetadata) {
        Object.keys(postsMetadata).forEach((image) => {
            const fixedUrl = postsMetadata[image].s.u.replaceAll('&amp;', '&');
            images.push(fixedUrl);
        });
    }
    
    return (
        <div id="post">
            <div id="upvotes-container">
                <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-up" />
                <p id="upvotes-number">{upvotes}</p>
                <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-down" />
            </div>
            <div id="post-container">
                <h2 id="post-h2">{title}</h2>
                <div id="img-container">{
                    images.map((image, index) => {
                        return <img id="post-img" alt="" src={image} key={index} />;
                    })
                }</div>
                <div id="post-info">
                    <p id="op">Posted by {author}</p>
                    <p id="post-time">{postTime}</p>
                    <FontAwesomeIcon id="comment-icon" icon="fa-solid fa-message" />
                </div>
            </div>
        </div>
    )
}

export default Post;