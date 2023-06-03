import { csrfFetch } from './csrf';

// TYPES
const GET_ALL_EVENTS = '/linkup/events/GET_ALL_EVENTS';
const GET_CURRENT_EVENTS = '/linkup/events/GET_CURRENT_EVENTS';
const GET_SINGLE_EVENT = '/linkup/events/GET_SINGLE_EVENT';
const CREATE_EVENT = '/linkup/events/CREATE_EVENT';
const UPDATE_EVENT = '/linkup/events/UPDATE_EVENT';
const DELETE_EVENT = '/linkup/events/DELETE_EVENT';



// ACTIONS
const actionGetAllEvents = (events) => ({
    type: GET_ALL_EVENTS,
    payload: events
})

const actionGetCurrentEvents = (events) => ({
    type: GET_CURRENT_EVENTS,
    payload: events
})

const actionGetSingleEvent = (event) => ({
    type: GET_SINGLE_EVENT,
    payload: event
})

const actionCreateEvent = (event) => ({
    type: CREATE_EVENT,
    payload: event
})

const actionUpdateEvent = (event) => ({
    type: UPDATE_EVENT,
    payload: event
})

const actionDeleteEvent = (event) => ({
    type: DELETE_EVENT,
    payload: event
})

//THUNKS

export const thunkGetAllEvents = () => async dispatch => {
    const res = await csrfFetch('/api/events');
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetAllEvents(data.Events))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkGetCurrentEvents = () => async dispatch => {
    const res = await csrfFetch('/api/events/current');
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetCurrentEvents(data.Events))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkGetSingleEvent = (eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}`);
    if (res.ok) {
        const event = await res.json();
        dispatch(actionGetSingleEvent(event))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkCreateEvent = (event, image) => async dispatch => {
    const res = await csrfFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(event)
    });

    if (res.ok) {
        const newEvent = await res.json();
        dispatch(actionCreateEvent(newEvent))
        await csrfFetch(`/api/events/${newEvent.id}/images`, {
            method: 'POST',
            body: JSON.stringify(image)
        })
        return newEvent;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkUpdateEvent = (event) => async dispatch => {
    const res = await csrfFetch(`/api/events/${event.id}`, {
        method: 'PUT',
        body: JSON.stringify(event)
    });
    if (res.ok) {
        const updatedEvent = await res.json();
        dispatch(actionUpdateEvent(updatedEvent))
        return updatedEvent
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkDeleteEvent = (event) => async dispatch => {
    const res = await csrfFetch(`/api/events/${event.id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const message = await res.json();
        dispatch(actionDeleteEvent(event))
        return message
    } else {
        const errors = await res.json();
        return errors;
    }
}


// REDUCER
const initialState = { allEvents: {}, singleEvent: {}, currentEvents: {}};

const eventsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_EVENTS: {
            const newState = { ...state, allEvents: {} }
            action.payload.forEach(event => newState.allEvents[event.id] = event);
            return newState;
        };
        case GET_CURRENT_EVENTS: {
            const newState = { ...state, currentEvents: {} };
           action.payload.forEach(event => newState.currentEvents[event.id] = event);
            return newState;
        };
        case GET_SINGLE_EVENT: {
            const newState = { ...state, singleEvent: {} };
            newState.singleEvent = action.payload;
            return newState
        };
        case CREATE_EVENT:
        case UPDATE_EVENT: {
            const newState = { ...state };
            newState.allEvents = { ...newState.allEvents, [action.payload.id]: action.payload };
            return newState;
        };
        case DELETE_EVENT: {
            const newState = { ...state };
            delete newState.allEvents[action.payload.id];
            return newState;
        };
        default:
            return state;
    }
}

export default eventsReducer;
