import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostOutlineList extends Component {
    render() {
        const { posts } = this.props
        return (
            <div className="post-list-wrapper">
                <ul className="post-list">
                    {posts.map((post) => (
                        <li key={post.id}><PostOutline post={post} /></li>
                    ))}
                </ul>
            </div>
        )
    }
}


class PostOutline extends Component {
    render() {
        return (
            <div className="post-outline-wrapper container v-center compressed">
                <div className="container column">
                    <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    <span>{this.props.post.voteScore}</span>
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                </div>
                <Link to={"/post/" + this.props.post.id} className="post-link">
                    <h2>{this.props.post.title}</h2>
                </Link>
            </div>
        )
    }
}


export default PostOutlineList