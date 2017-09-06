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
    }
}

class Category extends Component {

    componentDidMount() {
        console.log(this.props)
        this.props.fetchPosts()
    }


    render() {
        return (
            <div className="container">
                <section className="main">
                    <PostList posts={
                        this.props.posts.byCategory[this.props.match.params.id] && this.props.posts.byCategory[this.props.match.params.id].map(postId => this.props.posts.byId[postId]) || []
                    } />
                </section>
            </div>
        )
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Category)