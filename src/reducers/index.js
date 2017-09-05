
import { combineReducers } from 'redux'
import {
    SET_POSTS,
    ADD_POST,
    SET_CATEGORIES,
} from '../actions'

const initialPostState = {
    byId: {},
    allIds: [],
    byCategory: {}
}

function posts(state = initialPostState, action) {
    switch (action.type) {
        case SET_POSTS:
            let allPostIds = []
            let categories = [...new Set(action.posts.map(p => p.category))]
            let postIdsByCategory = categories.reduce((s, c) => { s[c] = []; return s }, {})
            console.log("categories:")
            console.log(categories)
            console.log(postIdsByCategory)
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
        case ADD_POST:
            return state
        default:
            return state
    }
}



function categories(state = [], action) {
    console.log(state)
    console.log(action)
    switch (action.type) {
        case SET_CATEGORIES:
            console.log(action.categories)
            return state.concat(action.categories)
        default:
            return state
    }
}

const initialCategoryState = {
    byId: {},
    byPost: []
}

function comments(state = [], action) {
    return state
}

export default combineReducers({
    posts,
    categories,
    comments,
})