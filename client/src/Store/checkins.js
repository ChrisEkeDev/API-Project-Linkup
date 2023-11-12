import { csrfFetch } from './csrf';

// TYPES
const GET_SESSION_ATTENDEES = '/linkup/attendances/GET_SESSION_ATTENDEES';
const GET_SESSION_ATTENDANCES = '/linkup/attendances/GET_SESSION_ATTENDANCES';
const GET_MY_ATTENDANCES = '/linkup/attendances/GET_MY_ATTENDANCES';
const ADD_ATTENDANCE = '/linkup/attendances/ADD_ATTENDANCE';
const UPDATE_ATTENDANCE = '/linkup/attendances/UPDATE_ATTENDANCE';
const DELETE_ATTENDANCE = '/linkup/attendances/DELETE_ATTENDANCE';

// ACTIONS
const actionGetSessionAttendees = (attendees) => ({
    type: GET_SESSION_ATTENDEES,
    payload: attendees
})

const actionGetSessionAttendances = (attendances) => ({
    type: GET_SESSION_ATTENDANCES,
    payload: attendances
})

const actionGetMyAttendances = (attendances) => ({
    type: GET_MY_ATTENDANCES,
    payload: attendances
})

const actionAddAttendance = (attendances) => ({
    type: ADD_ATTENDANCE,
    payload: attendances
})

const actionUpdateAttendance = (attendances) => ({
    type: UPDATE_ATTENDANCE,
    payload: attendances
})

const actionDeleteAttendance = (attendances) => ({
    type: DELETE_ATTENDANCE,
    payload: attendances
})


// THUNKS
export const thunkGetSessionAttendees = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/attendees`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetSessionAttendees(data.Attendees))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkGetSessionAttendances = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/attendances`)
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetSessionAttendances(data.Attendances))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkGetMyAttendances = () => async dispatch => {
    const res = await csrfFetch('/api/attendances');
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetMyAttendances(data.Attendances))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkAddAttendance = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/attendance`, {
        method: 'POST'
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionAddAttendance(data))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkUpdateAttendance = (data, attendeeData) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${data.attendance.sessionId}/attendance`, {
        method: 'PUT',
        body: JSON.stringify(attendeeData)
    })
    if (res.ok) {
        const attendance = await res.json();
        data.attendee.Attendance.status = attendance.status;
        const payload = {attendance: attendance, attendee: data.attendee}
        dispatch(actionUpdateAttendance(payload))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkDeleteAttendance = (attendance, attendeeData) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${attendance.sessionId}/attendance`, {
        method: 'DELETE',
        body: JSON.stringify(attendeeData)
    })
    if (res.ok) {
        const message = await res.json();
        dispatch(actionDeleteAttendance(attendance))
        return message
    } else {
        const errors = await res.json();
        return errors
    }
}

// REDUCER

const initialState = { myAttendances: {}, sessionAttendances: {}, sessionAttendees: {}}
const checkInsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SESSION_ATTENDEES: {
            const newState = { myAttendances: {...state.myAttendances}, sessionAttendances: {...state.sessionAttendances}, sessionAttendees: {} };
            action.payload.forEach(attendee => newState.sessionAttendees[attendee.id] = attendee)
            return newState;
        }
        case GET_SESSION_ATTENDANCES: {
            const newState = { myAttendances: {...state.myAttendances}, sessionAttendances: {}, sessionAttendees:{...state.sessionAttendees}  };
            action.payload.forEach(attendance => newState.sessionAttendances[attendance.id] = attendance)
            return newState;
        }
        case GET_MY_ATTENDANCES: {
            const newState = { myAttendances: {}, sessionAttendances: {...state.sessionAttendances}, sessionAttendees:{...state.sessionAttendees}};
            action.payload.forEach(attendance => newState.myAttendances[attendance.id] = attendance)
            return newState;
        }
        case ADD_ATTENDANCE: {
            const newState = { sessionAttendees: {...state.sessionAttendees}, myAttendances: {...state.myAttendances}, sessionAttendances:{...state.sessionAttendances}  };
            newState.myAttendances = { ...newState.myAttendances, [action.payload.id]: action.payload}
            newState.sessionAttendances = { ...newState.sessionAttendances, [action.payload.id]: action.payload};
            return newState;
        }
        case UPDATE_ATTENDANCE: {
            const newState = { sessionAttendees: {...state.sessionAttendees}, myAttendances: {...state.myAttendances}, sessionAttendances:{...state.sessionAttendances}  };
            newState.sessionAttendees = { ...newState.sessionAttendees, [action.payload.attendee.id]: action.payload.attendee}
            newState.myAttendances = { ...newState.myAttendances, [action.payload.attendance.id]: action.payload.attendance}
            newState.sessionAttendances = { ...newState.sessionAttendances, [action.payload.attendance.id]: action.payload.attendance};
            return newState;
        }
        case DELETE_ATTENDANCE: {
            const newState = { sessionAttendees: {...state.sessionAttendees}, myAttendances: {...state.myAttendances}, sessionAttendances:{...state.sessionAttendances}  };
            delete newState.sessionAttendees[action.payload.userId]
            delete newState.myAttendances[action.payload.id];
            delete newState.sessionAttendances[action.payload.id];
            return newState;
        }
        default:
            return state;
    }
}

export default checkInsReducer;
