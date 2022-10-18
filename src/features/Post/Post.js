import React from "react";
import { useDispatch } from "react-redux";
import './Post.css';
import { fixUrl } from "../../util/utils";
import { Comment } from "../Comment/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Post = ({post, toggleShowingComments}) => {
const dispatch = useDispatch();

    const title = post.title;
    const postMetadata = post.media_metadata ? post.media_metadata : null;
    const postEmbed = post.media ? post.media : null; // We have to use 'media' because videos are not in the 'media_embed' key
    const postTime = post.created_utc;
    const author = post.author;
    const upvotes = post.ups;
    const comments = post.comments;

    const images = [];
    const video = {
        url: '',
        title: ''
    };
    let link;
    if(postMetadata) {
        Object.keys(postMetadata).forEach((image) => {
            const fixedUrl = fixUrl(postMetadata[image].s.u);
            images.push(fixedUrl);
        });
    } else if(post.url) {
        if(post.url.includes('.gif') || post.url.includes('.jpg') || post.url.includes('.jpeg') || post.url.includes('.png') || post.url.includes('.webp'))
            images.push(post.url);
        else
            link = post.url;
    }
    
    if(postEmbed) {
        if(postEmbed.oembed) {
            const html = postEmbed.oembed.html;
            const initialIndex = html.indexOf('src') + 5;
            const finalIndex = html.indexOf('width') - 2 - html.length;
            video.url = html.slice(initialIndex, finalIndex);
            video.url = video.url.replaceAll('&amp;', '&');
            video.title = post.media.oembed.title;
        } else if(postEmbed.reddit_video) {
            const url = postEmbed.reddit_video.fallback_url;
            video.url = fixUrl(url);
            video.title = '';
        }
    }

    const imgContainer = <div className="img-container">{
                            images.map((image, index) => {
                                return <img className="post-img" alt="" src={image} key={index} />;
                            })
                        }</div>;

    const videoContainer = <div className="video-container">
                                <iframe 
                                    src={video.url} 
                                    title={video.title}
                                    width="900px"
                                    height="507px"
                                    scrolling="no"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen={true}></iframe>
                        </div>
    
    const linkElement = <a className="external-link" href={link} target="_blank">{link}</a>;

    const renderComments = () => {
        if(!post.showingComments)
            return;

        if(post.loadingComments)
            return <p className="comments-message">Loading comments...</p>;

        if(post.errorComments)
            return <p className="comments-message">Failed to load the comments</p>;
        
        if(comments.length === 0)
        return <p className="comments-message">No comments</p>;

        return (
            comments.map(comment => {
                return <Comment comment={comment} />
            })
        );
    }

    
    return (
        <div className="post">
            <div className="post-flex-container">
                <div className="upvotes-container">
                    <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-up" />
                    <p className="upvotes-number">{upvotes}</p>
                    <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-down" />
                </div>
                <div className="post-container">
                    <h2 className="post-h2">{title}</h2>
                    {postEmbed ? videoContainer : images.length > 0 ? imgContainer : link.length > 0 && linkElement}
                    <div className="post-info">
                        <p className="op">Posted by {author}</p>
                        <p className="post-time">{postTime}</p>
                        <button className="comments-button" onClick={() => toggleShowingComments(post.permalink)}><FontAwesomeIcon className="comment-icon" icon="fa-solid fa-message" /></button>
                    </div>
                </div>        
            </div>
            <div className="comments">
                {renderComments()}
            </div>  
        </div>
    )
}

export default Post;