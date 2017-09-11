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
        votePost: (postId, vote) => dispatch(Actions.voteOnPost({ postId, vote })),
        sortPosts: (sortBy) => dispatch(Actions.sortPosts(sortBy))
    }
}

class Category extends Component {

    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchPosts().then(() => {
            this.props.posts.allIds.forEach(function (postId) {
                this.props.fetchComments({ postId })
            }, this);
        })
    }

    _posts(posts, category) {
        return category ? this._posts_filtered_by_category(posts, category) : posts.allIds.map(id => posts.byId[id])
    }

    _posts_filtered_by_category(posts, category) {
        return posts.byCategory[category] ?
            posts.byCategory[category].map(postId => posts.byId[postId]) : []
    }

    goBack() {
        this.props.history.goBack()
    }

    render() {
        const { categories, votePost, posts, match, comments, deletePost, sortPosts } = this.props
        const postList = this._posts(posts, match.params.category)
        return (
            <div className="container">
                {match.params.category && (
                    <section>
                        <i
                            className="fa fa-arrow-left"
                            aria-hidden="true"
                            onClick={() => this.goBack()}
                            style={{ margin: 10 }}
                        />
                    </section>
                )}
                <section className="sidebar">
                    <CategoryList categories={categories} />
                </section>
                <section className="main">
                    <PostList
                        posts={postList}
                        updateVoteScore={votePost}
                        comments={comments}
                        deletePost={deletePost}
                        sortBy={posts.sortBy}
                        sortPosts={sortPosts}
                    />
                </section>
            </div>
        )
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Category)