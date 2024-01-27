import { csrfFetch } from './csrf';

// TYPES
const GET_TEAM_FEED = '/backcourts/chats/GET_TEAM_FEED'
const GET_SESSION_FEED = '/backcourts/chats/GET_SESSION_FEED'
const CREATE_TEAM_CHAT = '/backcourts/chats/CREATE_TEAM_CHAT'
const CREATE_SESSION_CHAT = '/backcourts/chats/CREATE_SESSION_CHAT'
const UPDATE_TEAM_CHAT = '/backcourts/chats/UPDATE_TEAM_CHAT'
const UPDATE_SESSION_CHAT = '/backcourts/chats/UPDATE_SESSION_CHAT'
const DELETE_TEAM_CHAT = '/backcourts/chats/DELETE_TEAM_CHAT'
const DELETE_SESSION_CHAT = '/backcourts/chats/DELETE_SESSION_CHAT'
const GET_MY_LIKES = '/backcourts/chats/GET_MY_LIKES'
const ADD_LIKE = '/backcourts/chats/ADD_LIKE'
const REMOVE_LIKE = '/backcourts/chats/REMOVE_LIKE'

// ACTIONS

const actionCreateTeamChat = (teamChat) => ({
    type: CREATE_TEAM_CHAT,
    payload: teamChat
})

const actionCreateSessionChat = (sessionChat) => ({
    type: CREATE_SESSION_CHAT,
    payload: sessionChat
})

const actionUpdateTeamChat = (teamChat) => ({
    type: UPDATE_TEAM_CHAT,
    payload: teamChat
})

const actionUpdateSessionChat = (sessionChat) => ({
    type: UPDATE_SESSION_CHAT,
    payload: sessionChat
})

const actionDeleteTeamChat = (teamChat) => ({
    type: DELETE_TEAM_CHAT,
    payload: teamChat
})

const actionDeleteSessionChat = (sessionChat) => ({
    type: DELETE_SESSION_CHAT,
    payload: sessionChat
})

const actionGetMyLikes = (likes) => ({
    type: GET_MY_LIKES,
    payload: likes
})

const actionAddLike = (like) => ({
    type: ADD_LIKE,
    paylaod: like
})
const actionRemoveLike = (like) => ({
    type: REMOVE_LIKE,
    paylaod: like
})

// THUNK

export const thunkCreateTeamChat = (teamId, content) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}/chat-feed`, {
        method: 'POST',
        body: JSON.stringify({content})
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionCreateTeamChat(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkCreateSessionChat = (sessionId, content) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/chat-feed`, {
        method: 'POST',
        body: JSON.stringify({content})
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionCreateSessionChat(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}


export const thunkUpdateTeamChat = (chatId, content ) => async dispatch => {
    const res = await csrfFetch(`/api/team-chats/${chatId}`, {
        method: 'PUT',
        body: JSON.stringify({content})
    })
    try {
        const jsonResponse = await res.json();
        await dispatch(actionUpdateTeamChat(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}


export const thunkUpdateSessionChat = (chatId, content ) => async dispatch => {
    const res = await csrfFetch(`/api/session-chats/${chatId}`, {
        method: 'PUT',
        body: JSON.stringify({content})
    })
    try {
        const jsonResponse = await res.json();
        await dispatch(actionUpdateSessionChat(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}


export const thunkDeleteTeamChat = (chatId) => async dispatch => {
    const res = await csrfFetch(`/api/team-chats/${chatId}`, {
        method: 'DELETE'
    })
    try {
        const jsonResponse = await res.json();
        await dispatch(actionDeleteTeamChat(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkDeleteSessionChat = (chatId) => async dispatch => {
    const res = await csrfFetch(`/api/session-chats/${chatId}`, {
        method: 'DELETE'
    })
    try {
        const jsonResponse = await res.json();
        await dispatch(actionDeleteSessionChat(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkGetMyLikes = () => async dispatch => {
    const res = await csrfFetch(`/api/likes/current`);
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetMyLikes(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkAddLike = (data) => async dispatch => {
    const res = await csrfFetch(`/api/likes`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionAddLike(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkRemoveLike = (entityId) => async dispatch => {
    const res = await csrfFetch(`/api/likes`, {
        method: 'DELETE',
        body: JSON.stringify(entityId)
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionRemoveLike(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}
// REDUCER

const initialState = { teamFeed: {}, sessionFeed: {}, myLikes:{} }
const chatsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TEAM_FEED: {
            const newState = { ...state, teamFeed: {} }
            action.payload.forEach(chat => newState.teamFeed[chat.id] = chat );
            return newState
        }
        case GET_SESSION_FEED: {
            const newState = { ...state, sessionFeed: {} }
            action.payload.forEach(chat => newState.sessionFeed[chat.id] = chat );
            return newState
        }
        case GET_MY_LIKES: {
            const newState = { ...state, myLikes: {} }
            action.payload.forEach(like => newState.myLikes[like.id] = like );
            return newState
        }
        case ADD_LIKE: {
            const newState = { ...state, myLikes: {...state.myLikes } }
            newState.myLikes = { ...newState.myLikes, [action.payload.id]: action.payload }
            return newState;
        }
        case REMOVE_LIKE: {
            const newState = { ...state, myLikes: { ...state.myLikes } };
            delete newState.myLikes[action.payload.id]
            return newState
        }
        case CREATE_TEAM_CHAT:
        case UPDATE_TEAM_CHAT: {
            const newState = { ...state, teamFeed: {...state.teamFeed } }
            newState.teamFeed = { ...newState.teamFeed, [action.payload.id]: action.payload }
            return newState;
        }
        case CREATE_SESSION_CHAT:
        case UPDATE_SESSION_CHAT: {
            const newState = { ...state, sessionFeed: {...state.sessionFeed } }
            newState.sessionFeed = { ...newState.sessionFeed, [action.payload.id]: action.payload }
            return newState;
        }
        case DELETE_TEAM_CHAT: {
            const newState = { ...state, teamFeed: { ...state.teamFeed } };
            delete newState.teamFeed[action.payload.id]
            return newState
        }
        case DELETE_SESSION_CHAT: {
            const newState = { ...state, sessionFeed: { ...state.sessionFeed } };
            delete newState.sessionFeed[action.payload.id]
            return newState
        }
        default:
            return state;
    }
}

export default chatsReducer;
