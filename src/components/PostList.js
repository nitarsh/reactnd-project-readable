import React from 'react'
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
            <div className="container column">
                <Link to={"/post/" + post.id} className="post-link">
                    <h2>{post.title}</h2>
                </Link>
                <span>
                    Author: {post.author}
                </span>
            </div>
            <div className="container column">
                <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    style={{ margin: 10 }}
                />
            </div>

            <div className="container column">
                <Link
                    to="/form/post/edit"
                    className="post-link"
                >
                    <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                    />
                </Link>
            </div>
        </div>
    )
}


export default PostOutlineList