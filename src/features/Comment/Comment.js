import React from "react";
import ReactMarkdown from "react-markdown";
import './Comment.css';

export const Comment = ({comment}) => {
    const repliesObjects = comment.replies ? comment.replies.data.children : [];
    const replies = repliesObjects.filter(reply => reply.kind === 't1').map(reply => reply.data);

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