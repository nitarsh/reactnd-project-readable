import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostList from './PostList'
import CategoryList from './CategoryList'
import * as Actions from '../actions'

const mapStateToProps = function (state) {
    return {
        categories: state.categories,
        posts: state.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCategories: () => dispatch(Actions.fetchCategoriesForHomePage()),
        fetchPosts: () => dispatch(Actions.fetchPosts()),
        votePost: (postId, vote) => dispatch(Actions.voteOnPost({ postId, vote }))
    }
}

class Category extends Component {

    componentDidMount() {
        console.log("Hello World")
        this.props.fetchCategories()
        this.props.fetchPosts()
    }

    _posts(posts, category) {
        if (category)
            return this._posts_filtered_by_category(posts, category)
        else
            return posts.allIds.map(id => posts.byId[id])
    }

    _posts_filtered_by_category(posts, category) {
        return posts.byCategory[category] ?
            posts.byCategory[category].map(postId => posts.byId[postId]) : []
    }

    render() {
        const { categories, votePost, posts, match } = this.props
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
                    />
                </section>
            </div>
        )
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Category)