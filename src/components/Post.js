import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import CommentList from './CommentList'
import Modal from 'react-modal'

const mapStateToProps = function (state) {
    return {
        post: state.posts.active,
        comments: state.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchComments: (postId) => dispatch(Actions.fetchCommentsForPost(postId)),
        fetchPosts: () => dispatch(Actions.fetchPosts()),
        setActivePost: (postId) => dispatch(Actions.setActivePost(postId))
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

    render() {
        return (
            <div className="post-wrapper container column">
                <div className="post-header container column">
                    <div className="container column">
                        <i className="fa fa-arrow-up" aria-hidden="true"></i>
                        <span>{this.props.post.voteScore}</span>
                        <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    </div>
                    <h1>
                        {this.props.post.title}
                    </h1>
                </div>
                <div className="post-body">
                    <p>
                        {this.props.post.body}
                    </p>
                </div>
                <CommentList comments={this.props.comments.byPost[this.props.match.params.id] || []} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)