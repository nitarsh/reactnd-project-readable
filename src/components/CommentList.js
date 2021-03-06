import React from 'react'
import { Link } from 'react-router-dom'
import { Score, Sorting } from './Misc'

function CommentList({ comments, voteComment, commentForm, updateCommentForm, createComment, deleteComment, sortBy, sortComments }) {

    const handleChange = function (event) {
        const { id, value } = event.target
        updateCommentForm(id, value)
    }

    const handleSubmit = function (event) {
        event.preventDefault()
        createComment(commentForm)
    }

    return (
        <div className="comment-list-wrapper">
            <h3>Comments:</h3>
            <Sorting
                sortBy={sortBy}
                sortFn={sortComments}
            />
            <br />
            <form onSubmit={event => handleSubmit(event)}>
                <div className="post-wrapper container row">
                    <label>
                        Author:
                    <input
                            id="author"
                            type="text"
                            value={commentForm.author}
                            onChange={(event) => handleChange(event)}
                        />
                    </label>
                    <label>
                        Body:
                    <input
                            id="body"
                            type="text"
                            value={commentForm.body}
                            onChange={(event) => handleChange(event)}
                        />
                    </label>
                    <input style={{ width: 100 }} type="submit" value="Create New" />
                </div>
            </form>

            <ul className="comment-list">
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <Comment
                            comment={comment}
                            voteComment={voteComment}
                            deleteComment={deleteComment}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

function Comment({ comment, voteComment, deleteComment }) {
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
                <div className="container column">
                    <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        style={{ margin: 10 }}
                        onClick={() => deleteComment({ commentId: comment.id })}
                    />
                </div>

                <div className="container column">
                    <Link
                        to={"/form/comment/edit/" + comment.parentId + "/" + comment.id}
                        className="post-link"
                    >
                        <i
                            className="fa fa-pencil"
                            aria-hidden="true"
                        />
                    </Link>
                </div>
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