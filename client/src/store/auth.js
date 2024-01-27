import { csrfFetch } from "./csrf";

// TYPES

const SET_AUTH = '/backcourts/auth/SET_AUTH';
const REMOVE_AUTH = '/backcourts/auth/REMOVE_AUTH';
const GET_AUTH = '/backcourts/auth/GET_AUTH';
const GET_SETTINGS = '/backcourts/auth/GET_SETTINGS'
const CHANGE_THEME_PREFERENCE = '/backcourts/auth/CHANGE_THEME_PREFERENCE'
const CHANGE_LOCATION_PREFERENCE = '/backcourts/auth/CHANGE_LOCATION_PREFERENCE'
const CHANGE_NOTIFICATION_PREFERENCE = '/backcourts/auth/CHANGE_NOTIFICATION_PREFERENCE'

export const signIn = async (playerData) => {
    const res = await csrfFetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(playerData)
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const signInGuest = async () => {
    const playerData = {email: 'pcartwirght@email.com', password: 'password1'}
    const res = await csrfFetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(playerData)
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const signOut = async () => {
    const res = await csrfFetch('/api/auth', { method: 'DELETE'});
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const signUp = async (playerData) => {
    const res = await csrfFetch('/api/players', {
        method: 'POST',
        body: JSON.stringify(playerData)
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getAuth = async () => {
    const res = await csrfFetch(`/api/auth`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getMyTeams= async (id) => {
    const res = await csrfFetch(`/api/teams/current`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}



export const getMySessions = async () => {
    const res = await csrfFetch(`/api/sessions/current`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getMyCheckIns = async (id) => {
    const res = await csrfFetch(`/api/check-ins/current`)
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getMyMemberships = async () => {
    const res = await csrfFetch(`/api/memberships/current`)
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}


export const getMySettings = async () => {
    const res = await csrfFetch('/api/settings/current')
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getMyLikes = async () => {
    const res = await csrfFetch(`/api/likes/current`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const actionSetAuthPlayer = (player) => ({
    type: SET_AUTH,
    payload: player
})

const actionRemoveAuthPlayer = () => ({
    type: REMOVE_AUTH
})

const actionChangeThemePreference = (settings) => ({
    type: CHANGE_THEME_PREFERENCE,
    payload: settings
})
const actionChangeLocationPreference = (settings) => ({
    type: CHANGE_LOCATION_PREFERENCE,
    payload: settings
})
const actionChangeNotificationPreference = (settings) => ({
    type: CHANGE_NOTIFICATION_PREFERENCE,
    payload: settings
})

// GOOGLE
export const googleAuthSignIn = () => async dispatch => {
    const res = await csrfFetch('/api/auth/google')
    console.log('GOOOOO')
    try {
        const jsonResponse = await res.json();
        console.log(jsonResponse)
    } catch(error) {
        console.error(error)
    }
}


// THUNKS

export const thunkSignInPlayer = (playerData) => async dispatch => {
    const res = await csrfFetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(playerData)
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionSetAuthPlayer(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkSignOutPlayer = () => async dispatch => {
    const res = await csrfFetch('/api/auth', { method: 'DELETE'});

    try {
        const jsonResponse = await res.json();
        dispatch(actionRemoveAuthPlayer());
        return jsonResponse;
    } catch (error) {
        console.error(error);
    }
}

export const thunkSignUpPlayer = (playerData) => async dispatch => {
    const res = await csrfFetch('/api/players', {
        method: 'POST',
        body: JSON.stringify(playerData)
    })

    try {
        const jsonResponse = await res.json();
        dispatch(actionSetAuthPlayer(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error);
    }
}

export const thunkChangeThemePreference = (value) => async dispatch => {
    const res = await csrfFetch('/api/settings/theme', {
        method: 'PUT',
        body: JSON.stringify({value})
    })
    try {
        const jsonResponse = await res.json();
        dispatch(actionChangeThemePreference(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error);
    }
}

export const thunkChangeLocationPreference = (value) => async dispatch => {
    const res = await csrfFetch('/api/settings/locations', {
        method: 'PUT',
        body: JSON.stringify({value})
    })
    try {
        const jsonResponse = await res.json();
        dispatch(actionChangeLocationPreference(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error);
    }
}

export const thunkChangeNotificationPreference = (value) => async dispatch => {
    const res = await csrfFetch('/api/settings/notifications', {
        method: 'PUT',
        body: JSON.stringify({value})
    })
    try {
        const jsonResponse = await res.json();
        dispatch(actionChangeNotificationPreference(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error);
    }
}



// REDUCER

const initialState = { player: null, settings: {} };

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH:
        case GET_AUTH: {
            const newState = { ...state };
            newState.player = action.payload;
            return newState
        };
        case REMOVE_AUTH: {
            const newState = { ...state };
            newState.player = null;
            return newState
        };
        case GET_SETTINGS:
        case CHANGE_THEME_PREFERENCE:
        case CHANGE_LOCATION_PREFERENCE:
        case CHANGE_NOTIFICATION_PREFERENCE: {
            const newState = { ...state };
            newState.settings = action.payload;
            return newState
        }
        default:
            return state;
    }
}

export default authReducer;
