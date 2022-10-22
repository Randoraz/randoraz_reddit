import React from "react";
import './Post.css';
import { fixUrl } from "../../utils/utils";
import { Comment } from "../Comment/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertUnixIntoDate } from "../../utils/utils";

const Post = ({post, toggleShowingComments}) => {

    const title = post.title;
    const postMetadata = post.media_metadata ? post.media_metadata : null;
    const postEmbed = post.media ? post.media : null;
    const text = post.selftext ? post.selftext : null;
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
    
    const linkElement = <a className="external-link" href={link} target="_blank" rel="noreferrer" >{link}</a>;

    const textElement = <p className="post-text">{text}</p>;

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
                return <Comment comment={comment} key={comment.id} />
            })
        );
    };

    const changeIconColor = () => {
        if(post.showingComments)
            return 'var(--orange)';
        else
            return 'white';
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
                    {text && textElement}
                    {postEmbed ? videoContainer : images.length > 0 ? imgContainer : link.length > 0 && linkElement}
                    <div className="post-info">
                        <p className="op">{author}</p>
                        <p className="post-time">{convertUnixIntoDate(postTime)}</p>
                        <button className="comments-button" onClick={() => toggleShowingComments(post.permalink)}>
                            <FontAwesomeIcon className="comment-icon" icon="fa-solid fa-message" style={{color: changeIconColor()}}/>
                        </button>
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