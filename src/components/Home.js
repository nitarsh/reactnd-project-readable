import React, { Component } from 'react'
import './App.css'
import { Helmet } from "react-helmet"
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
    }
}

class Home extends Component {

    componentDidMount() {
        console.log(this.props)
        this.props.fetchCategories()
        this.props.fetchPosts()
    }


    render() {
        return (
            <div className="container">
                <Helmet>
                    <script src="https://use.fontawesome.com/9fdf74825d.js"></script>
                </Helmet>
                <section className="sidebar">
                    <CategoryList categories={this.props.categories} />
                </section>
                <section className="main">
                    <PostList posts={this.props.posts.allIds.map(id => this.props.posts.byId[id])} />
                </section>
            </div>
        )
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Home)