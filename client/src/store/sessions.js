import { csrfFetch } from './csrf';
import Cookies from 'js-cookie';

// TYPES
const SEARCH_SESSIONS = '/linkup/sessions/SEARCH_SESSIONS';
const GET_CURRENT_SESSIONS = '/linkup/sessions/GET_CURRENT_SESSIONS';
const GET_SINGLE_SESSION = '/linkup/sessions/GET_SINGLE_SESSION';
const CREATE_SESSION = '/linkup/sessions/CREATE_SESSION';
const UPDATE_SESSION = '/linkup/sessions/UPDATE_SESSION';
const DELETE_SESSION = '/linkup/sessions/DELETE_SESSION';



// ACTIONS

const actionSearchSessions = (sessions) => ({
    type: SEARCH_SESSIONS,
    payload: sessions
})

// const actionGetCurrentSessions = (sessions) => ({
//     type: GET_CURRENT_SESSIONS,
//     payload: sessions
// })

const actionGetSingleSession = (session) => ({
    type: GET_SINGLE_SESSION,
    payload: session
})

const actionCreateSession = (session) => ({
    type: CREATE_SESSION,
    payload: session
})

const actionUpdateSession = (session) => ({
    type: UPDATE_SESSION,
    payload: session
})

const actionDeleteSession = (session) => ({
    type: DELETE_SESSION,
    payload: session
})



//THUNKS

export const thunkSearchSessions = (query, sortBy) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/search/?query=${query}&sortBy=${sortBy}`);
    try {
        const jsonResponse = await res.json();
        await dispatch(actionSearchSessions(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}
// export const thunkGetCurrentSessions = () => async dispatch => {
//     const res = await csrfFetch('/api/sessions/current');
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(actionGetCurrentSessions(data.Sessions))
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// }

export const thunkGetSingleSession = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}`);
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetSingleSession(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkCreateNewSession = (sessionData) => async dispatch => {
    const res = await csrfFetch(`/api/sessions`, {
        method: 'POST',
        body: JSON.stringify(sessionData)
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionCreateSession(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkUpdateSession = (sessionData, sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}`, {
        method: 'PUT',
        body: JSON.stringify(sessionData)
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionUpdateSession(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkDeleteSession = (session) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${session.id}`, {
        method: 'DELETE'
    })
    try {
        const jsonResponse = await res.json();
        await dispatch(actionDeleteSession(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}


// REDUCER
const initialState = { allSessions: [], singleSession: {} };

const sessionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_SESSIONS: {
            const newState = { allSessions: [], singleSession: {} }
            action.payload.forEach(session => newState.allSessions.push(session));
            return newState;
        }
        // case GET_CURRENT_SESSIONS: {
        //     const newState = { ...state, currentSessions: {} };
        //    action.payload.forEach(session => newState.currentSessions[session.id] = session);
        //     return newState;
        // };
        case GET_SINGLE_SESSION: {
            const newState = { ...state, singleSession: {} };
            newState.singleSession = action.payload;
            return newState
        };
        case CREATE_SESSION:
        case UPDATE_SESSION: {
            const newState = { ...state };
            newState.allSessions = { ...newState.allSessions, [action.payload.id]: action.payload };
            return newState;
        };
        case DELETE_SESSION: {
            const newState = { ...state };
            delete newState.allSessions[action.payload.id];
            return newState;
        };
        default:
            return state;
    }
}

export default sessionsReducer;
