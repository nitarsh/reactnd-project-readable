import React from 'react'
import { Link } from 'react-router-dom'
import { Score, Sorting } from './Misc'

function PostOutlineList({ posts, updateVoteScore, comments, deletePost, sortBy, sortPosts }) {
    return (
        <div className="post-list-wrapper container column">
            <div className="container row h-stretched">
                <Link to="/form/post/new" className="post-link">
                    <i className="fa fa-plus" aria-hidden="true"> Add New</i>
                </Link>
                <Sorting
                    sortBy={sortBy}
                    sortFn={sortPosts}
                />
            </div>
            <ol className="post-list light-grey-back">
                {posts.map((post) => (
                    <li key={post.id}>
                        <PostOutline
                            post={post}
                            updateVoteScore={updateVoteScore}
                            comments={comments[post.id]}
                            deletePost={deletePost}
                        />
                    </li>
                ))}
            </ol>
        </div>
    )
}


function PostOutline({ post, updateVoteScore, comments, deletePost }) {

    return (
        <div className="post-outline-wrapper container v-center compressed">
            <Score
                id={post.id}
                value={post.voteScore}
                onClickFn={updateVoteScore}
            />
            <div className="container column post-list-item-title">
                <Link to={"/" + post.category + "/" + post.id} className="post-link">
                    <h2>{post.title}</h2>
                </Link>
                <div className="container row h-stretched">
                    <span>
                        Author: {post.author}
                    </span>
                    <span>
                        Comments: {comments && comments.length}
                    </span>
                </div>

            </div>
            <div className="container column">
                <i
                    className="fa fa-trash"
                    aria-hidden="true"
                    style={{ margin: 10 }}
                    onClick={() => deletePost({ postId: post.id })}
                />
            </div>

            <div className="container column">
                <Link
                    to={"/form/post/edit/" + post.id}
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