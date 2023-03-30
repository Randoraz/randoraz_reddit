import React from "react";
import ReactMarkdown from "react-markdown";
import './Comment.css';

export const Comment = ({comment}) => {
    const replies = comment.replies.data ? comment.replies.data.children.map(reply => reply.data) : [];

    return (
        <div className="comment">
            <p className="comment-author">{comment.author}</p>
            <ReactMarkdown className="comment-body">{comment.body}</ReactMarkdown>
            {replies.map(reply => {
                return (<div className="comment-reply" key={reply.id}>
                    <p className="reply-author">{reply.author}</p>
                    <ReactMarkdown className="reply-body">{reply.body}</ReactMarkdown>
                </div>);
            })}
        </div>
    );
}