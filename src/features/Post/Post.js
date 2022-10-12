import React from "react";
import './Post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Post = ({post}) => {
    const title = post.title;
    const postMetadata = post.media_metadata ? post.media_metadata : null;
    const postUrl = post.url ? post.url : null;
    const postEmbed = post.media_embed ? post.media_embed.content : null;
    const postTime = post.created_utc;
    const author = post.author;
    const upvotes = post.ups;

    const images = [];
    const video = {
        url: '',
        title: ''
    };
    if(postMetadata) {
        Object.keys(postMetadata).forEach((image) => {
            const fixedUrl = postMetadata[image].s.u.replaceAll('&amp;', '&');
            images.push(fixedUrl);
        });
    } else if(post.url) {
        images.push(post.url);
    }
    
    if(postEmbed) {
        const initialIndex = postEmbed.indexOf('src') + 5;
        const finalIndex = postEmbed.indexOf('width') - 2 - postEmbed.length;
        video.url = postEmbed.slice(initialIndex, finalIndex);
        video.url = video.url.replaceAll('&amp;', '&');
        video.title = post.media.oembed.title;
    }

    const imgContainer = <div id="img-container">{
                            images.map((image, index) => {
                                return <img id="post-img" alt="" src={image} key={index} />;
                            })
                        }</div>;

    const videoContainer = <div id="video-container">
                                <iframe 
                                    src={video.url} 
                                    title={video.title}
                                    width="600px"
                                    height="338px"
                                    scrolling="no"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen={true}></iframe>
                        </div>
    
    return (
        <div id="post">
            <div id="upvotes-container">
                <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-up" />
                <p id="upvotes-number">{upvotes}</p>
                <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-down" />
            </div>
            <div id="post-container">
                <h2 id="post-h2">{title}</h2>
                {postEmbed ? videoContainer : imgContainer}
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