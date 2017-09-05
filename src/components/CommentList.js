import React from 'react'

function CommentList({ comments }) {
    return (
        <div className="comment-list-wrapper">
            <h3>Comments:</h3>
            <ul className="comment-list">
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <Comment comment={comment} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

function Comment({ comment }) {
    return (
        <div className="comment-wrapper container column">
            <div className="comment-header container column">
                <div className="container column">
                    <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    <span>{comment.voteScore}</span>
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                </div>
                <h4>
                    {comment.author}
                </h4>
            </div>
            <div className="comment-body">
                <p>
                    {comment.body}
                </p>
            </div>
        </div>
    )
}


export default CommentList