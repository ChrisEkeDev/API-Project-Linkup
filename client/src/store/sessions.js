import { csrfFetch } from './csrf';

// TYPES
const GET_ALL_SESSIONS = '/backcourts/sessions/GET_ALL_SESSIONS';
const SEARCH_SESSIONS = '/backcourts/sessions/SEARCH_SESSIONS';
const GET_MY_SESSIONS = '/backcourts/sessions/GET_MY_SESSIONS';
const GET_SINGLE_SESSION = '/backcourts/sessions/GET_SINGLE_SESSION';
const CREATE_SESSION = '/backcourts/sessions/CREATE_SESSION';
const UPDATE_SESSION = '/backcourts/sessions/UPDATE_SESSION';
const DELETE_SESSION = '/backcourts/sessions/DELETE_SESSION';

export const searchSessions = async (query, sortBy) => {
    const res = await csrfFetch(`/api/sessions/search/?query=${query}&sortBy=${sortBy}`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}



export const getSession = async (id) => {
    const res = await csrfFetch(`/api/sessions/${id}`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSessionCheckInStatus = async (id) => {
    const res = await csrfFetch(`/api/sessions/${id}/current`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSessionCheckIns = async (id) => {
    const res = await csrfFetch(`/api/sessions/${id}/check-ins`)
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSessionFeed = async (id) => {
    const res = await csrfFetch(`/api/sessions/${id}/feed`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

// ACTIONS

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
    console.log(sessionData)
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

export const thunkDeleteSession = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}`, {
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
const initialState = { allSessions: {}, singleSession: {}, mySessions: {}, searchedSessions: []};

const sessionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_SESSIONS: {
            const newState = { ...state, allSessions: {} };
            action.payload.forEach(session => newState.allSessions[session.id] = session);
            return newState;
        }
        case SEARCH_SESSIONS: {
            const newState = { ...state, searchedSessions: [] }
            action.payload.forEach(session => newState.searchedSessions.push(session));
            return newState;
        }
        case GET_MY_SESSIONS: {
            const newState = { ...state, mySessions: {} };
            action.payload.forEach(session => newState.mySessions[session.id] = session);
            return newState;
        };
        case GET_SINGLE_SESSION: {
            const newState = { ...state, singleSession: {} };
            newState.singleSession = action.payload;
            return newState
        };
        case CREATE_SESSION:
        case UPDATE_SESSION: {
            const newState = { ...state, singleSession: {} };
            newState.singleSession = action.payload;
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
