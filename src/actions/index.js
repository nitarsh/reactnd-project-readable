import * as API from '../utils/api'

export const SET_CATEGORIES = 'SET_CATEGORIES'

export const SET_POSTS = 'SET_POSTS'
export const SET_ACTIVE_POST = 'SET_ACTIVE_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const UPDATE_POST_FORM = 'UPDATE_POST_FORM'
export const VOTE_POST = 'VOTE_POST'

export const SET_COMMENTS = 'SET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT_FORM = 'UPDATE_COMMENT_FORM'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT_PARENT = 'DELETE_COMMENT_PARENT'
export const SET_ACTIVE_COMMENT = 'SET_ACTIVE_COMMENT'

export function setCategories({ categories }) {
    return { type: SET_CATEGORIES, categories }
}
export function setPosts({ posts }) {
    return { type: SET_POSTS, posts }
}
export function addPost({ post }) {
    return { type: ADD_POST, post }
}
export function removePost({ postId }) {
    return { type: DELETE_POST, postId }
}
export function editPost(postId, body, title) {
    return { type: EDIT_POST, postId, body, title }
}
export function updatePostForm({ attribute, value }) {
    return { type: UPDATE_POST_FORM, attribute, value }
}
export function votePost({ postId, vote }) {
    return { type: VOTE_POST, postId, vote }
}
export function setComments({ postId, comments }) {
    return { type: SET_COMMENTS, postId, comments }
}
export function addComment({ comment }) {
    return { type: ADD_COMMENT, comment }
}
export function removeComment({ commentId }) {
    return { type: DELETE_COMMENT, commentId }
}
export function deleteCommentParent({ postId }) {
    return { type: DELETE_COMMENT_PARENT, postId }
}
export function updateCommentForm({ attribute, value }) {
    return { type: UPDATE_COMMENT_FORM, attribute, value }
}
export function editComment(comment) {
    return { type: EDIT_COMMENT, comment }
}
export function voteComment({ commentId, vote }) {
    return { type: VOTE_COMMENT, commentId, vote }
}
export function setActivePost({ postId }) {
    return { type: SET_ACTIVE_POST, postId }
}
export function setActiveComment({ commentId }) {
    return { type: SET_ACTIVE_COMMENT, commentId }
}

export function fetchCategoriesForHomePage() {
    return function (dispatch) {
        return API.categories().then(
            categories => dispatch(setCategories({ categories }))
        );
    };
}

export function fetchPosts() {
    return function (dispatch) {
        return API.posts().then(
            posts => dispatch(setPosts({ posts: posts.filter(post => post.deleted === false) }))
        );
    };
}

export function fetchCommentsForPost({ postId }) {
    return function (dispatch) {
        return API.commentsByPost(postId).then(
            comments => dispatch(setComments({ postId, comments }))
        );
    };
}

export function voteOnPost({ postId, vote }) {
    let isUpvote = vote > 0 ? true : false
    return function (dispatch) {
        return API.updatePostScore(postId, isUpvote).then(
            dispatch(votePost({ postId, vote }))
        );
    };
}

export function voteOnComment({ commentId, vote }) {
    let isUpvote = vote > 0 ? true : false
    return function (dispatch) {
        return API.updateCommentScore(commentId, isUpvote).then(
            dispatch(voteComment({ commentId, vote }))
        );
    };
}

export function deletePost({ postId }) {
    return function (dispatch) {
        return API.deletePost(postId).then(
            dispatch(removePost({ postId }))
        ).then(
            dispatch(deleteCommentParent({ postId })));
    };
}

export function createPost(post) {
    post.timestamp = Date.now()
    post.id = makeid()

    return function (dispatch) {
        return API.createPost(post).then(
            post => dispatch(addPost({ post }))
        );
    };
}

function makeid() {
    // This code taken from :
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 22; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


export function updatePost(postId, body, title) {
    return function (dispatch) {
        return API.updatePost(postId, body, title).then(
            dispatch(editPost(postId, body, title))
        );
    };
}

export function createComment(comment) {
    comment.timestamp = Date.now()
    comment.id = makeid()

    return function (dispatch) {
        return API.createComment(comment).then(
            comment => dispatch(addComment({ comment }))
        );
    };
}

export function updateComment(commentId, body) {
    return function (dispatch) {
        return API.updateComment(commentId, body).then(
            comment => dispatch(editComment(comment))
        );
    };
}

export function deleteComment({ commentId }) {
    return function (dispatch) {
        return API.deleteComment(commentId).then(
            dispatch(removeComment({ commentId }))
        );
    };
}