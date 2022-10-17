import React from "react";
import ReactMarkdown from "react-markdown";
import './Comment.css';

const Comment = (props) => {
    const comment = props;

    return (
        <div className="comment">
            <p className="comment-author">{comment.author}</p>
            <ReactMarkdown className="comment-body">{comment.body}</ReactMarkdown>
        </div>
    );
}