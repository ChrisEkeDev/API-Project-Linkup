import { csrfFetch } from './csrf';


// TYPES
const GET_CURRENT_MEMBERS = '/linkup/memberships/GET_CURRENT_MEMBERS'
const GET_ALL_MEMBERSHIPS = '/linkup/memberships/GET_ALL_MEMBERSHIPS'
const ADD_MEMBERSHIP = '/linkup/memberships/ADD_MEMBERSHIP'
const UPDATE_MEMBERSHIP = '/linkup/memberships/UPDATE_MEMBERSHIP'
const DELETE_MEMBERSHIP = '/linkup/memberships/DELETE_MEMBERSHIP'


// ACTIONS

const actionGetCurrentMembers = (members) => ({
    type: GET_CURRENT_MEMBERS,
    payload: members
})

const actionGetAllMemberships = (memberships) => ({
    type: GET_ALL_MEMBERSHIPS,
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

export const thunkGetAllMemberships = () => async dispatch => {
    const res = await csrfFetch('/api/memberships');
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetAllMemberships(data.Memberships))
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}


export const thunkAddMembership = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/membership`, {
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

export const thunkUpdateMembership = (memberhsip, memberData) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${memberhsip.groupId}/membership`, {
        method: 'PUT',
        body: JSON.stringify(memberData)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(actionUpdateMembership(data))
    } else {
        const errors = res.json();
        return errors;
    }
}

export const thunkDeleteMemnership = (memberhsip, memberData) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${memberhsip.groupId}/membership`, {
        method: 'DELETE',
        body: JSON.stringify(memberData)
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

const initialState = { currentMembers: {}, allMemberships:{} }
const membershipsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CURRENT_MEMBERS: {
            const newState = { ...state, currentMembers: {}};
            action.payload.forEach(member => newState.currentMembers[member.id] = member)
            return newState;
        };
        case GET_ALL_MEMBERSHIPS: {
            const newState = { ...state, allMemberships: {}}
            action.payload.forEach(membership => newState.allMemberships[membership.id] = membership);
            return newState;
        }
        case ADD_MEMBERSHIP:
        case UPDATE_MEMBERSHIP: {
            const newState = { currentMembers: {}, ...state };
            newState.allMemberships = {...newState.allMemberships, [action.payload.id]: action.payload};
            return newState;
        }
        case DELETE_MEMBERSHIP: {
            const newState = { currentMembers: {}, ...state };
            delete newState.allMemberships[action.payload.id];
            return newState;
        }
        default:
            return state;
    }
}

export default membershipsReducer;
