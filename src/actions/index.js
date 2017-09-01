export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'


export function addPost({ category, post }) {
    return { type: ADD_POST, category, post }
}
export function deletePost({ post }) {
    return { type: DELETE_POST, post }
}
export function editPost({ post }) {
    return { type: EDIT_POST, post }
}
export function votePost({ post, vote }) {
    return { type: VOTE_POST, post, vote }
}

export function addComment({ post, comment }) {
    return { type: ADD_COMMENT, post, comment }
}
export function deleteComment({ comment }) {
    return { type: DELETE_COMMENT, comment }
}
export function editComment({ comment }) {
    return { type: EDIT_COMMENT, comment }
}
export function voteComment({ comment, vote }) {
    return { type: VOTE_COMMENT, comment, vote }
}