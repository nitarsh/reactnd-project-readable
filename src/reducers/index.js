import { combineReducers } from 'redux'
import {
    SET_POSTS,
    SET_ACTIVE_POST,
    SET_CATEGORIES,
    SET_COMMENTS,
    VOTE_COMMENT,
    VOTE_POST
} from '../actions'

const initialPostState = {
    byId: {},
    allIds: [],
    byCategory: {},
    active: ''
}

function posts(state = initialPostState, action) {
    switch (action.type) {
        case SET_POSTS:
            let allPostIds = []
            let categories = [...new Set(action.posts.map(p => p.category))]
            let postIdsByCategory = categories.reduce((s, c) => { s[c] = []; return s }, {})
            let byId = {}
            for (let post of action.posts) {
                allPostIds.push(post.id)
                postIdsByCategory[post.category].push(post.id)
                byId[post.id] = post
            }
            return {
                ...state,
                byId: byId,
                allIds: allPostIds,
                byCategory: postIdsByCategory
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
        default:
            return state
    }
}

// const initialCategoryState = {
//     byPath: {},
//     all: []
// }

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
    byPost: {}
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
        default:
            return state
    }
}

export default combineReducers({
    posts,
    categories,
    comments,
})