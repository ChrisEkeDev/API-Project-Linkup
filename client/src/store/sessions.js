import { csrfFetch } from './csrf';

// TYPES
const GET_ALL_SESSIONS = '/linkup/sessions/GET_ALL_SESSIONS';
const SEARCH_SESSIONS = '/linkup/sessions/SEARCH_SESSIONS';
const GET_MY_SESSIONS = '/linkup/sessions/GET_MY_SESSIONS';
const GET_SINGLE_SESSION = '/linkup/sessions/GET_SINGLE_SESSION';
const CREATE_SESSION = '/linkup/sessions/CREATE_SESSION';
const UPDATE_SESSION = '/linkup/sessions/UPDATE_SESSION';
const DELETE_SESSION = '/linkup/sessions/DELETE_SESSION';



// ACTIONS
const actionGetAllSessions = (sessions) => ({
    type: GET_ALL_SESSIONS,
    payload: sessions
})

const actionSearchSessions = (sessions) => ({
    type: SEARCH_SESSIONS,
    payload: sessions
})

const actionGetMySessions = (sessions) => ({
    type: GET_MY_SESSIONS,
    payload: sessions
})

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

export const thunkGetAllSessions = () => async dispatch => {
    const res = await csrfFetch(`/api/sessions/all`);
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetAllSessions(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

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
export const thunkGetMySessions = () => async dispatch => {
    const res = await csrfFetch('/api/sessions/current');
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetMySessions(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

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
