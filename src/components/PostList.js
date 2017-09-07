import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Score } from './Misc'

function PostOutlineList({ posts, updateVoteScore }) {
    return (
        <div className="post-list-wrapper">
            <Link to="/form/post/new" className="post-link">
                <i className="fa fa-plus" aria-hidden="true"> Add New</i>
            </Link>
            <ul className="post-list">
                {posts.map((post) => (
                    <li key={post.id}>
                        <PostOutline
                            post={post}
                            updateVoteScore={updateVoteScore}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}


function PostOutline({ post, updateVoteScore }) {
    return (
        <div className="post-outline-wrapper container v-center compressed">
            <Score
                id={post.id}
                value={post.voteScore}
                onClickFn={updateVoteScore}
            />
            <Link to={"/post/" + post.id} className="post-link">
                <h2>{post.title}</h2>
            </Link>
        </div>
    )
}


export default PostOutlineList