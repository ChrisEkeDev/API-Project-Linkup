import { csrfFetch } from './csrf';

// TYPES
const GET_CURRENT_ATTENDEES = '/linkup/attendances/GET_CURRENT_ATTENDANCES';
const GET_ATTENDANCES = '/linkup/attendances/GET_ATTENDANCES';
const ADD_ATTENDANCE = '/linkup/attendances/ADD_ATTENDANCE';
const UPDATE_ATTENDANCE = '/linkup/attendances/UPDATE_ATTENDANCE';
const DELETE_ATTENDANCE = '/linkup/attendances/DELETE_ATTENDANCE';

// ACTIONS
const actionGetCurrentAttendees = (attendees) => ({
    type: GET_CURRENT_ATTENDEES,
    payload: attendees
})

const actionGetAttendances = (attendances) => ({
    type: GET_ATTENDANCES,
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
export const thunkGetAttendees = (eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}/attendees`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetCurrentAttendees(data.Attendees))
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}

export const thunkGetAttendances = (eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}/attendances`)
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetAttendances(data.Attendances))
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}

export const thunkAddAttendance = (attendance) => async dispatch => {
    const res = await csrfFetch(`/api/events/${attendance.id}/attendances`, {
        method: 'POST'
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionAddAttendance(data))
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}

export const thunkUpdateAttendance = (attendance) => async dispatch => {
    const res = await csrfFetch(`/api/events/${attendance.id}/attendance`, {
        method: 'PUT'
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionUpdateAttendance(data))
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}

export const thunkDeleteAttendance = (attendance) => async dispatch => {
    const res = await csrfFetch(`/api/events/${attendance.id}/attendance`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const message = await res.json();
        dispatch(actionDeleteAttendance(attendance))
        return message
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}

// REDUCER

const initialState = { currentAttendees: {}, attendances: {} }
const attendancesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CURRENT_ATTENDEES: {
            const newState = { ...state };
            action.payload.forEach(attendee => newState.currentAttendees[attendee.id] = attendee)
            return newState;
        }
        case GET_ATTENDANCES: {
            const newState = { ...state };
            action.payload.forEach(attendance => newState.attendances[attendance.id] = attendance)
            return newState;
        }
        case ADD_ATTENDANCE:
        case UPDATE_ATTENDANCE: {
            const newState = { ...state };
            newState.attendances = { ...newState.attendances, [action.payload.id]: action.payload};
            return newState;
        }
        case DELETE_ATTENDANCE: {
            const newState = { ...state };
            delete newState.attendances[action.payload.id];
            return newState;
        }
        default:
            return state;
    }
}

export default attendancesReducer;
