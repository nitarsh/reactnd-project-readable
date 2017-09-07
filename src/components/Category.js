import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostList from './PostList'
import * as Actions from '../actions'

const mapStateToProps = function (state) {
    return {
        posts: state.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(Actions.fetchPosts()),
        votePost: (postId, vote) => dispatch(Actions.voteOnPost({ postId, vote }))
    }
}

class Category extends Component {

    componentDidMount() {
        this.props.fetchPosts()
    }

    _posts_filtered_by_category(posts, category) {
        return posts.byCategory[category] ? 
        posts.byCategory[category].map(postId => posts.byId[postId]) : []
    }


    render() {
        const { votePost, posts, match } = this.props
        const postList = this._posts_filtered_by_category(posts, match.params.id)
        return (
            <div className="container">
                <section className="main">
                    <PostList
                        posts={postList}
                        updateVoteScore={votePost}
                    />
                </section>
            </div>
        )
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Category)