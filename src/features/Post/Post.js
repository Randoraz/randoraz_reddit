import React, { useState } from "react";
import './Post.css';
import { fixUrl, shortenNumbers } from "../../utils/utils";
import { Comment } from "../Comment/Comment";
import { Gallery } from "../Gallery/Gallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertUnixIntoDate } from "../../utils/utils";

const Post = ({post, toggleShowingComments}) => {
    const [voteStatus, setVoteStatus] = useState('noVote');

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

    const imgContainer = images.length > 1 ? <Gallery imgArray={images} /> : <img className="post-img" alt="" src={images[0]} />;
    
    
                        // <div className="img-container">{
                        //     images.map((image, index) => {
                        //         return <img className="post-img" alt="" src={image} key={index} />;
                        //     })
                        // }</div>;

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

    const handleUpVote = () => {
        if(voteStatus === 'upVote')
            setVoteStatus('noVote')
        else
            setVoteStatus('upVote');;
    }

    const handleDownVote = () => {
        if(voteStatus === 'downVote')
            setVoteStatus('noVote');
        else
            setVoteStatus('downVote');
    }

    const renderVoteSection = () => {
        switch(voteStatus) {
            case 'noVote':
                return(
                    <div className="upvotes-container">
                        <button className="upvote-button" onClick={() => handleUpVote()} aria-label="Up Vote">
                            <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-up" aria-hidden="true" />
                        </button>
                        <p className="upvotes-number">{shortenNumbers(upvotes)}</p>
                        <button className="downvote-button" onClick={() => handleDownVote()} aria-label="Down Vote">
                            <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-down" aria-hidden="true" />
                        </button>
                    </div>
                );
            case 'upVote':
                return(
                    <div className="upvotes-container">
                        <button className="upvote-button" onClick={() => handleUpVote()} aria-label="Up Vote">
                            <FontAwesomeIcon className="vote-icon up-vote" icon="fa-regular fa-circle-up" aria-hidden="true" />
                        </button>
                        <p className="upvotes-number up-vote">{shortenNumbers(upvotes)}</p>
                        <button className="downvote-button" onClick={() => handleDownVote()} aria-label="Down Vote">
                            <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-down" aria-hidden="true" />
                        </button>
                    </div>
                );
            case 'downVote':
                return(
                    <div className="upvotes-container">
                        <button className="upvote-button" onClick={() => handleUpVote()} aria-label="Up Vote">
                            <FontAwesomeIcon className="vote-icon" icon="fa-regular fa-circle-up" aria-hidden="true" />
                        </button>
                        <p className="upvotes-number down-vote">{shortenNumbers(upvotes)}</p>
                        <button className="downvote-button" onClick={() => handleDownVote()} aria-label="Down Vote">
                            <FontAwesomeIcon className="vote-icon down-vote" icon="fa-regular fa-circle-down" aria-hidden="true" />
                        </button>
                    </div>
                );
            default:
                return null;
        }
    }
    
    return (
        <div className="post">
            <div className="post-flex-container">
                {renderVoteSection()}
                <div className="post-container">
                    <h2 className="post-h2">{title}</h2>
                    {text && textElement}
                    {postEmbed ? videoContainer : images.length > 0 ? imgContainer : link.length > 0 && linkElement}
                    <div className="post-info">
                        <p className="op">{author}</p>
                        <p className="post-time">{convertUnixIntoDate(postTime)}</p>
                        <button className="comments-button" onClick={() => toggleShowingComments(post.permalink)} aria-label="Show Comments">
                            <FontAwesomeIcon className="comment-icon" icon="fa-solid fa-message" style={{color: changeIconColor()}} aria-hidden="true" />
                            <p className="comments-number">{post.num_comments}</p>
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