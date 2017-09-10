const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = 'WinterIsComing'

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const categories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const postsByCategory = (category) =>
    fetch(`${api}/${category.name}/posts`, { headers })
        .then(res => res.json())

export const posts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())

export const createPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json())

export const post = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())

const voteOptions = { true: 'upVote', false: 'downVote' }

export const updatePostScore = (id, isUpvote) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: voteOptions[isUpvote] })
    }).then(res => res.json())

export const updatePost = (id, body, title) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body, title })
    }).then(res => res.json())


export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers
        }
    })

export const commentsByPost = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json())

export const comment = (id) =>
    fetch(`${api}/comments/${id}`, { headers })
        .then(res => res.json())

export const createComment = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())

export const updateCommentScore = (id, isUpvote) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: voteOptions[isUpvote] })
    }).then(res => res.json())

export const updateComment = (id, body) =>
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: body, timestamp: Date.now() })
    }).then(res => res.json())

export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers
        }
    }).then(res => res.json())