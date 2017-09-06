import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import CommentList from './CommentList'
import Modal from 'react-modal'

const mapStateToProps = function (state) {
    return {
        post: state.posts.active,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(Actions.fetchPosts())
    }
}

class PostForm extends Component {

    componentDidMount() {
        console.log("params:")
        console.log(this.props.match.params)
        // if mode is edit, then load the required post and prefill
        // else leave it empty (for new post)
        // this.props.fetchPosts().then(() => {
        //     this.props.setActivePost(postId)
        //     console.log(this.props.post)
        // })
    }

    render() {
        return (
            
            <div className="post-wrapper container column">
            <div>Hello WOrld</div>
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
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)