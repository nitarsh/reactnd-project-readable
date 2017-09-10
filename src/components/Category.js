import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostList from './PostList'
import CategoryList from './CategoryList'
import * as Actions from '../actions'

const mapStateToProps = function (state) {
    return {
        categories: state.categories,
        posts: state.posts,
        comments: state.comments.byPost
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchComments: (postId) => dispatch(Actions.fetchCommentsForPost(postId)),
        fetchCategories: () => dispatch(Actions.fetchCategoriesForHomePage()),
        fetchPosts: () => dispatch(Actions.fetchPosts()),
        deletePost: (postId) => dispatch(Actions.deletePost(postId)),
        votePost: (postId, vote) => dispatch(Actions.voteOnPost({ postId, vote }))
    }
}

class Category extends Component {

    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchPosts().then(() => {
            this.props.posts.allIds.forEach(function(postId) {
                this.props.fetchComments({postId})
            }, this);
        })
    }

    _posts(posts, category) {
        posts = category? this._posts_filtered_by_category(posts, category):posts.allIds.map(id => posts.byId[id])
        return posts.filter(post => post.deleted===false)
    }

    _posts_filtered_by_category(posts, category) {
        return posts.byCategory[category] ?
            posts.byCategory[category].map(postId => posts.byId[postId]) : []
    }

    render() {
        const { categories, votePost, posts, match, comments, deletePost } = this.props
        const postList = this._posts(posts, match.params.category)
        return (
            <div className="container">
                <section className="sidebar">
                    <CategoryList categories={categories} />
                </section>
                <section className="main">
                    <PostList
                        posts={postList}
                        updateVoteScore={votePost}
                        comments={comments}
                        deletePost={deletePost}
                    />
                </section>
            </div>
        )
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Category)