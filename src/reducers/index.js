import { combineReducers } from 'redux'
import {
    SET_POSTS,
    SET_ACTIVE_POST,
    SET_CATEGORIES,
    SET_COMMENTS,
    VOTE_COMMENT,
    VOTE_POST,
    UPDATE_POST_FORM,
    DELETE_POST,
    ADD_POST,
    EDIT_POST,
    DELETE_COMMENT_PARENT,
    UPDATE_COMMENT_FORM,
    ADD_COMMENT,
    SET_ACTIVE_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT
} from '../actions'

const initialPostState = {
    byId: {},
    allIds: [],
    byCategory: { react: [], redux: [], udacity: [] },
    active: '',
    postForm: {
        title: '',
        body: '',
        category: '',
        author: ''
    }
}

function posts(state = initialPostState, action) {
    switch (action.type) {
        case SET_POSTS:
            let posts = action.posts
            const getIds = e => e.id
            return {
                ...state,
                byId: posts.reduce(
                    (s, e) => { s[e.id] = e; return s }
                    , {}),
                byCategory: {
                    react: posts.filter(p => p.category === 'react').map(getIds),
                    redux: posts.filter(p => p.category === 'redux').map(getIds),
                    udacity: posts.filter(p => p.category === 'udacity').map(getIds)
                },
                allIds: posts.map(getIds)
            }
        case SET_ACTIVE_POST:
            return {
                ...state,
                active: action.postId
            }
        case VOTE_POST:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.postId]: {
                        ...state.byId[action.postId],
                        voteScore: state.byId[action.postId].voteScore + action.vote
                    }
                }
            }
        case UPDATE_POST_FORM:
            return {
                ...state,
                postForm: {
                    ...state.postForm,
                    [action.attribute]: action.value
                }
            }
        case DELETE_POST:
            let cat = state.byId[action.postId].category
            const fFn = e => e !== action.postId
            return {
                ...state,
                active: '',
                allIds: state.allIds.filter(fFn),
                byCategory: {
                    ...state.byCategory,
                    [cat]: state.byCategory[cat].filter(fFn)
                },
            }
        case ADD_POST:
            cat = action.post.category
            const postId = action.post.id
            return {
                ...state,
                allIds: state.allIds.concat(postId),
                byCategory: {
                    ...state.byCategory,
                    [cat]: state.byCategory[cat].concat(postId)
                },
                byId: {
                    ...state.byId,
                    [postId]: action.post
                }
            }
        case EDIT_POST:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.postId]: {
                        ...state.byId[action.postId],
                        title: action.title,
                        body: action.body
                    }
                }
            }
        default:
            return state
    }
}

function categories(state = [], action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return action.categories
        default:
            return state
    }
}

const initialCommentsState = {
    byId: {},
    byPost: {},
    commentForm: {
        body: '',
        author: '',
        parentId: ''
    },
    active: ''
}

function comments(state = initialCommentsState, action) {
    switch (action.type) {
        case SET_COMMENTS:
            let commentIds = action.comments.map(c => c.id)
            action.comments.forEach(function (comment) {
                if (comment.id)
                    state.byId[comment.id] = comment
            });
            return {
                ...state,
                byPost: {
                    ...state.byPost,
                    [action.postId]: commentIds
                }
            }
        case VOTE_COMMENT:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.commentId]: {
                        ...state.byId[action.commentId],
                        voteScore: state.byId[action.commentId].voteScore + action.vote
                    }
                }
            }
        case DELETE_COMMENT_PARENT:
            return {
                ...state,
                byPost: {
                    ...state.byPost,
                    [action.postId]: []
                }
            }
        case UPDATE_COMMENT_FORM:
            return {
                ...state,
                commentForm: {
                    ...state.commentForm,
                    [action.attribute]: action.value
                }
            }
        case ADD_COMMENT:
            let cId = action.comment.id
            let pId = action.comment.parentId
            return {
                ...state,
                byPost: {
                    ...state.byPost,
                    [pId]: state.byPost[pId].concat(cId)
                },
                byId: {
                    ...state.byId,
                    [cId]: action.comment
                },
                commentForm: {
                    ...state.commentForm,
                    body: '',
                    author: ''
                }
            }
        case SET_ACTIVE_COMMENT:
            return {
                ...state,
                active: action.commentId
            }
        case EDIT_COMMENT:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.comment.id]: action.comment
                },
                commentForm: {
                    ...state.commentForm,
                    body: '',
                    author: ''
                }
            }
        case DELETE_COMMENT:
            cId = action.commentId
            pId = state.byId[cId].parentId
            return {
                ...state,
                byPost: {
                    ...state.byPost,
                    [pId]: state.byPost[pId].filter(
                        e => e !== cId
                    )
                }
            }
        default:
            return state
    }
}

export default combineReducers({
    posts,
    categories,
    comments,
})