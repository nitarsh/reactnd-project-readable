import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import CommentList from './CommentList'
import { Score } from './Misc'
// import Modal from 'react-modal'

const mapStateToProps = function (state) {
    return {
        post: state.posts.byId[state.posts.active],
        comments: state.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchComments: (postId) => dispatch(Actions.fetchCommentsForPost(postId)),
        fetchPosts: () => dispatch(Actions.fetchPosts()),
        setActivePost: (postId) => dispatch(Actions.setActivePost(postId)),
        deletePost: (postId) => dispatch(Actions.deletePost(postId)),
        votePost: (postId, vote) => dispatch(Actions.voteOnPost({ postId, vote })),
        voteComment: (commentId, vote) => dispatch(Actions.voteOnComment({ commentId, vote }))
    }
}

class Post extends Component {

    _fetchPostsAndComments(postId) {
        this.props.fetchPosts().then(() => {
            this.props.setActivePost(postId)
            console.log(this.props.post)
        })
        this.props.fetchComments(postId)
    }

    componentDidMount() {
        let postId = { postId: this.props.match.params.id }
        this._fetchPostsAndComments(postId)
    }

    _comments_for_post(comments, postId) {
        return comments.byPost[postId] ? comments.byPost[postId].map(cId => comments.byId[cId]) : []
    }

    render() {
        const { comments, post, voteComment, votePost, match } = this.props
        const commentList = this._comments_for_post(comments, match.params.id)
        return (
            <div className="post-wrapper container column">
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
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </div>
                            <div className="container column">
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="post-body">
                            <p>
                                {post.body}
                            </p>
                        </div>
                        <CommentList
                            comments={commentList}
                            voteComment={voteComment}
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)