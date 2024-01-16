import { csrfFetch } from './csrf';


// TYPES
const GET_MY_MEMBERSHIPS = '/linkup/memberships/GET_MY_MEMBERSHIPS'
const GET_TEAM_MEMBERSHIPS = '/linkup/memberships/GET_TEAM_MEMBERSHIPS'
const JOIN_TEAM = '/linkup/memberships/JOIN_TEAM'
const LEAVE_TEAM = '/linkup/memberships/LEAVE_TEAM'
const ADD_TO_TEAM = '/linkup/memberships/ADD_TO_TEAM'
const PROMOTE_TO_CO_HOST = '/linkup/memberships/PROMOTE_TO_CO_HOST'
const REMOVE_FROM_TEAM = '/linkup/memberships/REMOVE_FROM_TEAM'


// ACTIONS
const actionGetMyMemberships = (memberships) => ({
    type: GET_MY_MEMBERSHIPS,
    payload: memberships
})

const actionGetTeamMemberships = (memberships) => ({
    type: GET_TEAM_MEMBERSHIPS,
    payload: memberships
})

const actionJoinTeam = (membership) => ({
    type: JOIN_TEAM,
    payload: membership
})

const actionAddToTeam = (membership) => ({
    type: ADD_TO_TEAM,
    payload: membership
})

const actionPromoteToCoHost = (membership) => ({
    type: PROMOTE_TO_CO_HOST,
    payload: membership
})

const actionLeaveTeam = (membership) => ({
    type: LEAVE_TEAM,
    payload: membership
})

const actionRemoveFromTeam = (membership) => ({
    type: REMOVE_FROM_TEAM,
    payload: membership
})


// THUNKS
export const thunkGetMyMemberships = () => async dispatch => {
    const res = await csrfFetch('/api/memberships/current');
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetMyMemberships(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkGetTeamMemberships = (teamId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}/memberships`);
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetTeamMemberships(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}


export const thunkJoinTeam = (teamId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}/join-team`, {
        method: 'POST'
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionJoinTeam(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkAddToTeam = (teamId, playerId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}/add-to-team`, {
        method: 'PUT',
        body: JSON.stringify({playerId})
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionAddToTeam(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkPromoteToCoHost = (teamId, playerId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}/promote-to-co-host`, {
        method: 'PUT',
        body: JSON.stringify({playerId})
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionPromoteToCoHost(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkLeaveTeam = (teamId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}/leave-team`, {
        method: 'DELETE',
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionLeaveTeam(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkRemoveFromTeam = (teamId, playerId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}/remove-from-team`, {
        method: 'DELETE',
        body: JSON.stringify({playerId})
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionRemoveFromTeam(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}



// REDUCER

const initialState = { myMemberships: {}, teamMemberships: {} }
const membershipsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TEAM_MEMBERSHIPS: {
            const newState = { ...state, teamMemberships: {} }
            action.payload.forEach(membership => newState.teamMemberships[membership.id] = membership)
            return newState;
        }
        case GET_MY_MEMBERSHIPS: {
            const newState = { ...state, myMemberships: {} }
            action.payload.forEach(membership => newState.myMemberships[membership.id] = membership)
            return newState;
        }
        case JOIN_TEAM: {
            const newState = { ...state, myMemberships: { ...state.myMemberships } };
            newState.myMemberships = { ...newState.myMemberships, [action.payload.id]: action.payload };
            return newState;
        }
        case PROMOTE_TO_CO_HOST: {
            const newState = { ...state, teamMemberships: { ...state.teamMemberships } };
            newState.teamMemberships = { ...newState.teamMemberships, [action.payload.id]: action.payload };
            return newState;
        }
        case ADD_TO_TEAM: {
            const newState = { ...state, teamMemberships: { ...state.teamMemberships } };
            newState.teamMemberships = { ...newState.teamMemberships, [action.payload.id]: action.payload };
            return newState;
        }
        case LEAVE_TEAM: {
            const newState = { ...state, myMemberships: { ...state.myMemberships } };
            delete newState.myMemberships[action.payload.id];
            return newState;
        }
        case REMOVE_FROM_TEAM: {
            const newState = { ...state, teamMemberships: { ...state.teamMemberships } };
            delete newState.teamMemberships[action.payload.id];
            return newState;
        }
        default:
            return state;
    }
}

export default membershipsReducer;
