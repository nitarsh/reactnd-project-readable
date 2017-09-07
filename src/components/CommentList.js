import React from 'react'
import { Score } from './Misc'

function CommentList({ comments, voteComment }) {
    return (
        <div className="comment-list-wrapper">
            <h3>Comments:</h3>
            <ul className="comment-list">
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <Comment
                            comment={comment}
                            voteComment={voteComment} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

function Comment({ comment, voteComment }) {
    return (
        <div className="comment-wrapper container column">
            <div className="comment-header container row v-center">
                <Score
                    id={comment.id}
                    value={comment.voteScore}
                    onClickFn={voteComment}
                />
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