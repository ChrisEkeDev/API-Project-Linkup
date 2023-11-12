import { csrfFetch } from './csrf';
import Cookies from 'js-cookie';

// TYPES
const GET_ALL_SESSIONS = '/linkup/sessions/GET_ALL_SESSIONS';
const GET_CURRENT_SESSIONS = '/linkup/sessions/GET_CURRENT_SESSIONS';
const GET_SINGLE_SESSION = '/linkup/sessions/GET_SINGLE_SESSION';
const CREATE_SESSION = '/linkup/sessions/CREATE_SESSION';
const UPDATE_SESSION = '/linkup/sessions/UPDATE_SESSION';
const DELETE_SESSION = '/linkup/sessions/DELETE_SESSION';



// ACTIONS
const actionGetAllSessions = (sessions) => ({
    type: GET_ALL_SESSIONS,
    payload: sessions
})

// const actionGetCurrentSessions = (sessions) => ({
//     type: GET_CURRENT_SESSIONS,
//     payload: sessions
// })

// const actionGetSingleSession = (session) => ({
//     type: GET_SINGLE_SESSION,
//     payload: session
// })

// const actionCreateSession = (session) => ({
//     type: CREATE_SESSION,
//     payload: session
// })

// const actionUpdateSession = (session) => ({
//     type: UPDATE_SESSION,
//     payload: session
// })

// const actionDeleteSession = (session) => ({
//     type: DELETE_SESSION,
//     payload: session
// })

//THUNKS

export const thunkGetAllSessions = () => async dispatch => {
    const res = await csrfFetch('/api/sessions');
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetAllSessions(jsonResponse.data))
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

// export const thunkGetSingleSession = (sessionId) => async dispatch => {
//     const res = await csrfFetch(`/api/sessions/${sessionId}`);
//     if (res.ok) {
//         const session = await res.json();
//         dispatch(actionGetSingleSession(session))
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// }

// export const thunkCreateSession = (id, session, imageData) => async dispatch => {
//     const res = await csrfFetch(`/api/groups/${id}/sessions`, {
//         method: 'POST',
//         body: JSON.stringify(session)
//     });

//     if (res.ok) {
//         const newSession = await res.json();
//         dispatch(actionCreateSession(newSession))
//         if (imageData) {
//             await fetch(`/api/sessions/${newSession.id}/images`, {
//                 method: 'POST',
//                 headers: {"XSRF-TOKEN": Cookies.get('XSRF-TOKEN')},
//                 body: imageData
//             })
//         }
//         return newSession;
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// }

// export const thunkUpdateSession = (session, id) => async dispatch => {
//     const res = await csrfFetch(`/api/sessions/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify(session)
//     });
//     if (res.ok) {
//         const updatedSession = await res.json();
//         dispatch(actionUpdateSession(updatedSession))
//         return updatedSession
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// }

// export const thunkDeleteSession = (session) => async dispatch => {
//     const res = await csrfFetch(`/api/sessions/${session.id}`, {
//         method: 'DELETE'
//     })
//     if (res.ok) {
//         const message = await res.json();
//         dispatch(actionDeleteSession(session))
//         return message
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// }


// REDUCER
const initialState = { allSessions: {}, singleSession: {}, currentSessions: {}};

const sessionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_SESSIONS: {
            const newState = { ...state, allSessions: {} }
            action.payload.forEach(session => newState.allSessions[session.id] = session);
            return newState;
        };
        case GET_CURRENT_SESSIONS: {
            const newState = { ...state, currentSessions: {} };
           action.payload.forEach(session => newState.currentSessions[session.id] = session);
            return newState;
        };
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
