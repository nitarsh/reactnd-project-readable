import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Actions from '../actions'
import CommentList from './CommentList'
import { Score, NotFound } from './Misc'
// import Modal from 'react-modal'

const mapStateToProps = function (state) {
    return {
        post: state.posts.byId[state.posts.active],
        comments: state.comments,
        commentForm: state.comments.commentForm,
        sortBy: state.comments.sortBy
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchComments: (postId) => dispatch(Actions.fetchCommentsForPost(postId)),
        fetchPosts: () => dispatch(Actions.fetchPosts()),
        setActivePost: (postId) => dispatch(Actions.setActivePost(postId)),
        deletePost: (postId) => dispatch(Actions.deletePost(postId)),
        votePost: (postId, vote) => dispatch(Actions.voteOnPost({ postId, vote })),
        voteComment: (commentId, vote) => dispatch(Actions.voteOnComment({ commentId, vote })),
        updateCommentForm: (attribute, value) => dispatch(Actions.updateCommentForm({ attribute, value })),
        createComment: (comment) => dispatch(Actions.createComment(comment)),
        deleteComment: (commentId) => dispatch(Actions.deleteComment(commentId)),
        sortComments: (sortBy) => dispatch(Actions.sortComments(sortBy))
    }
}

class Post extends Component {

    _fetchPostsAndComments(postId) {
        this.props.fetchPosts().then(() => {
            this.props.setActivePost(postId)
        })
        this.props.fetchComments(postId)
    }

    componentDidMount() {
        let postId = { postId: this.props.match.params.id }
        this._fetchPostsAndComments(postId)
        this.props.updateCommentForm('parentId', postId.postId)
    }

    _comments_for_post(comments, postId) {
        return comments.byPost[postId] ? comments.byPost[postId].map(cId => comments.byId[cId]) : []
    }

    onDelete(postId) {
        this.props.deletePost({ postId })
    }

    goBack() {
        this.props.history.goBack()
    }

    render() {
        const { comments, post, voteComment, votePost, match, commentForm, updateCommentForm, createComment, deleteComment, sortBy, sortComments } = this.props
        const commentList = this._comments_for_post(comments, match.params.id)
        return (
            <div className="post-wrapper container column">
                <div>
                    <i
                        className="fa fa-arrow-left"
                        aria-hidden="true"
                        onClick={() => this.goBack()}
                        style={{ margin: 10 }}
                    />
                </div>
                {post && (
                    <div>
                        <div className="post-header container row v-center">
                            <Score
                                id={post.id}
                                value={post.voteScore}
                                onClickFn={votePost}
                            />
                            <h1>
                                {post.title}
                            </h1>
                            <div className="container column">
                                <Link to="/" className="post-link">
                                    <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                        onClick={() => this.onDelete(post.id)}
                                        style={{ margin: 10 }}
                                    />
                                </Link>
                            </div>

                            <div className="container column">
                                <Link
                                    to={"/form/post/edit/" + post.id}
                                    className="post-link"
                                >
                                    <i
                                        className="fa fa-pencil"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="container column">
                            <span>
                                Author: {post.author}
                            </span>
                            <span>
                                Comments: {commentList.length}
                            </span>
                        </div>
                        <div className="post-body">

                            <p>
                                {post.body}
                            </p>
                        </div>
                        <CommentList
                            comments={commentList}
                            voteComment={voteComment}
                            commentForm={commentForm}
                            updateCommentForm={updateCommentForm}
                            createComment={createComment}
                            deleteComment={deleteComment}
                            sortBy={sortBy}
                            sortComments={sortComments}
                        />
                    </div>
                )}
                {!post && (<NotFound />)}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)