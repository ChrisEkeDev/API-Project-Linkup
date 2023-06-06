import { csrfFetch } from './csrf';


// TYPES
const GET_CURRENT_MEMBERS = '/linkup/memberships/GET_CURRENT_MEMBERS'
const GET_MEMBERSHIPS = '/linkup/memberships/GET_CURRENT_MEMBERSHIPS'
const ADD_MEMBERSHIP = '/linkup/memberships/ADD_MEMBERSHIP'
const UPDATE_MEMBERSHIP = '/linkup/memberships/UPDATE_MEMBERSHIP'
const DELETE_MEMBERSHIP = '/linkup/memberships/DELETE_MEMBERSHIP'


// ACTIONS

const actionGetCurrentMembers = (members) => ({
    type: GET_CURRENT_MEMBERS,
    payload: members
})

const actionGetCurrentMemberships = (memberships) => ({
    type: GET_MEMBERSHIPS,
    payload: memberships
})

const actionAddMembership = (membership) => ({
    type: ADD_MEMBERSHIP,
    payload: membership
})

const actionUpdateMembership = (membership) => ({
    type: UPDATE_MEMBERSHIP,
    payload: membership
})

const actionDeleteMembership = (membership) => ({
    type: DELETE_MEMBERSHIP,
    payload: membership
})


// THUNKS

export const thunkGetMembers = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/members`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetCurrentMembers(data.Members))
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}

export const thunkGetMemberships = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/memberships`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetCurrentMemberships(data.Memberships))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkAddMembership = (memberhsip) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${memberhsip.groupId}/memberships`, {
        method: 'POST'
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(actionAddMembership(data))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkUpdateMembership = (memberhsip) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${memberhsip.groupId}/memberships`, {
        method: 'PUT',
        body: JSON.stringify(memberhsip)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(actionUpdateMembership(data))
    } else {
        const errors = res.json();
        return errors;
    }
}

export const thunkDeleteMemnership = (memberhsip) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${memberhsip.groupId}/memberships`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const message = res.json();
        dispatch(actionDeleteMembership(memberhsip))
        return message;
    } else {
        const errors = res.json();
        return errors;
    }
}



// REDUCER

const initialState = { currentMembers: {}, memberships:{} }
const membershipsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CURRENT_MEMBERS: {
            const newState = { ...state };
            action.payload.forEach(member => newState.currentMembers[member.id] = member)
            return newState;
        };
        case GET_MEMBERSHIPS: {
            const newState = { ...state };
            action.payload.forEach(membership => newState.memberships[membership.id] = membership);
            return newState;
        };
        case ADD_MEMBERSHIP:
        case UPDATE_MEMBERSHIP: {
            const newState = { ...state };
            newState.memberships = {...newState.memberships, [action.payload.id]: action.payload};
            return newState;
        }
        case DELETE_MEMBERSHIP: {
            const newState = { ...state };
            delete newState.memberships[action.payload.id];
            return newState;
        }
        default:
            return state;
    }
}

export default membershipsReducer;
