import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import CategoryList from './CategoryList'
import PostList from './PostList'
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

class Home extends Component {

    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchPosts()
    }


    render() {
        const { categories, votePost, posts } = this.props
        const postList = posts.allIds.map(id => posts.byId[id])
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




export default connect(mapStateToProps, mapDispatchToProps)(Home)