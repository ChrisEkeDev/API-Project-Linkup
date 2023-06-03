import { csrfFetch } from './csrf';

// TYPES
const GET_ALL_GROUPS = '/linkup/groups/GET_ALL_GROUPS';
const GET_CURRENT_GROUPS = '/linkup/groups/GET_CURRENT_GROUPS';
const GET_SINGLE_GROUP = '/linkup/groups/GET_SINGLE_GROUP';
const CREATE_GROUP = '/linkup/groups/CREATE_GROUP';
const UPDATE_GROUP = '/linkup/groups/UPDATE_GROUP';
const DELETE_GROUP = '/linkup/groups/DELETE_GROUP';



// ACTIONS
const actionGetAllGroups = (groups) => ({
    type: GET_ALL_GROUPS,
    payload: groups
})

const actionGetCurrentGroups = (groups) => ({
    type: GET_CURRENT_GROUPS,
    payload: groups
})

const actionGetSingleGroup = (group) => ({
    type: GET_SINGLE_GROUP,
    payload: group
})

const actionCreateGroup = (group) => ({
    type: CREATE_GROUP,
    payload: group
})

const actionUpdateGroup = (group) => ({
    type: UPDATE_GROUP,
    payload: group
})

const actionDeleteGroup = (group) => ({
    type: DELETE_GROUP,
    payload: group
})

//THUNKS

export const thunkGetAllGroups = () => async dispatch => {
    const res = await csrfFetch('/api/groups');
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetAllGroups(data.Groups))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkGetCurrentGroups = () => async dispatch => {
    const res = await csrfFetch('/api/groups/current');
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetCurrentGroups(data.Groups))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkGetSingleGroup = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}`);
    if (res.ok) {
        const group = await res.json();
        dispatch(actionGetSingleGroup(group))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkCreateGroup = (group, image) => async dispatch => {
    const res = await csrfFetch('/api/groups', {
        method: 'POST',
        body: JSON.stringify(group)
    });

    if (res.ok) {
        const newGroup = await res.json();
        dispatch(actionCreateGroup(newGroup))
        await csrfFetch(`/api/groups/${newGroup.id}/images`, {
            method: 'POST',
            body: JSON.stringify(image)
        })
        return newGroup;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkUpdateGroup = (group) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${group.id}`, {
        method: 'PUT',
        body: JSON.stringify(group)
    });
    if (res.ok) {
        const updatedGroup = await res.json();
        dispatch(actionUpdateGroup(updatedGroup))
        return updatedGroup
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkDeleteGroup = (group) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${group.id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const message = await res.json();
        dispatch(actionDeleteGroup(group))
        return message
    } else {
        const errors = await res.json();
        return errors;
    }
}


// REDUCER
const initialState = { allGroups: {}, singleGroup: {}, currentGroups: {}};

const groupsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_GROUPS: {
            const newState = { ...state, allGroups: {} }
            action.payload.forEach(group => newState.allGroups[group.id] = group);
            return newState;
        };
        case GET_CURRENT_GROUPS: {
            const newState = { ...state, currentGroups: {} };
           // action.payload.forEach(group => newState.currentGroups[group.id] = group);
            return newState;
        };
        case GET_SINGLE_GROUP: {
            const newState = { ...state, singleGroup: {} };
            newState.singleGroup = action.payload;
            return newState
        };
        case CREATE_GROUP:
        case UPDATE_GROUP: {
            const newState = { ...state };
            newState.allGroups = { ...newState.allGroups, [action.payload.id]: action.payload };
            return newState;
        };
        case DELETE_GROUP: {
            const newState = { ...state };
            delete newState.allGroups[action.payload.id];
            return newState;
        };
        default:
            return state;
    }
}

export default groupsReducer;
