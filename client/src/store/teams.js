import { csrfFetch } from './csrf';

// TYPES
const GET_ALL_TEAMS = '/linkup/teams/GET_ALL_TEAMS'
const SEARCH_TEAMS = '/linkup/teams/SEARCH_TEAMS';
const GET_MY_TEAMS = '/linkup/teams/GET_MY_TEAMS';
const GET_SINGLE_TEAM = '/linkup/teams/GET_SINGLE_TEAM';
const GET_TEAM_SESSIONS = '/linkup/teams/GET_TEAM_SESSIONS'
const CREATE_TEAM = '/linkup/teams/CREATE_TEAM';
const UPDATE_TEAM = '/linkup/teams/UPDATE_TEAM';
const DELETE_TEAM = '/linkup/teams/DELETE_TEAM';



// ACTIONS
const actionGetAllTeams = (teams) => ({
    type: GET_ALL_TEAMS,
    payload: teams
})

const actionSearchTeams = (teams) => ({
    type: SEARCH_TEAMS,
    payload: teams
})

const actionGetMyTeams = (teams) => ({
    type: GET_MY_TEAMS,
    payload: teams
})

const actionGetSingleTeam = (team) => ({
    type: GET_SINGLE_TEAM,
    payload: team
})

const actionGetTeamSessions = (sessions) => ({
    type: GET_TEAM_SESSIONS,
    payload: sessions
})

const actionCreateTeam = (team) => ({
    type: CREATE_TEAM,
    payload: team
})

const actionUpdateTeam = (team) => ({
    type: UPDATE_TEAM,
    payload: team
})

const actionDeleteTeam = (team) => ({
    type: DELETE_TEAM,
    payload: team
})


//THUNKS

export const thunkGetAllTeams = () => async dispatch => {
    const res = await csrfFetch(`/api/teams/all`);
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetAllTeams(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkSearchTeams = (query, sortBy) => async dispatch => {
    const res = await csrfFetch(`/api/teams/search/?query=${query}&sortBy=${sortBy}`);
    try {
        const jsonResponse = await res.json();
        await dispatch(actionSearchTeams(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkGetMyTeams = () => async dispatch => {
    const res = await csrfFetch('/api/teams/current');
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetMyTeams(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkGetSingleTeam = (teamId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}`);
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetSingleTeam(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkGetTeamSessions = (teamId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}/sessions`);
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetTeamSessions(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkCreateNewTeam = (teamData) => async dispatch => {
    const res = await csrfFetch('/api/teams', {
        method: 'POST',
        body: JSON.stringify(teamData)
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionCreateTeam(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkUpdateTeam = (teamData, teamId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}`, {
        method: 'PUT',
        body: JSON.stringify(teamData)
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionUpdateTeam(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkDeleteTeam = (teamId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}`, {
        method: 'DELETE'
    })
    try {
        const jsonResponse = await res.json();
        await dispatch(actionDeleteTeam(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}


// REDUCER
const initialState = { allTeams:{}, searchedTeams: [], singleTeam: {}, myTeams: {}, teamSessions:{} };

const teamsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_TEAMS: {
            const newState = { ...state, allTeams: {} };
            action.payload.forEach(team => newState.allTeams[team.id] = team);
            return newState;
        }
        case SEARCH_TEAMS: {
            const newState = { ...state, searchedTeams: [] }
            action.payload.forEach(team => newState.searchedTeams.push(team));
            return newState;
        };
        case GET_MY_TEAMS: {
            const newState = { ...state, myTeams: {} };
            action.payload.forEach(team => newState.myTeams[team.id] = team);
            return newState;
        };
        case GET_SINGLE_TEAM:
        case CREATE_TEAM:
        case UPDATE_TEAM: {
            const newState = { ...state, singleTeam: {}  };
            newState.singleTeam = action.payload;
            return newState;
        };
        case GET_TEAM_SESSIONS: {
            const newState = { ...state, teamSessions: {} };
            action.payload.forEach(session => newState.teamSessions[session.id] = session);
            return newState;
        }
        case DELETE_TEAM: {
            const newState = { ...state, myTeams: { ...state.myTeams }  };
            delete newState.myTeams[action.payload.id];
            return newState;
        };
        default:
            return state;
    }
}

export default teamsReducer;
