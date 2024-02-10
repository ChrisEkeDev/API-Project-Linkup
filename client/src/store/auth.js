import { csrfFetch } from "./csrf";


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

export const addLike = async (data) => {
    const res = await csrfFetch(`/api/likes`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const removeLike = async (data) => {
    const res = await csrfFetch(`/api/likes`, {
        method: 'DELETE',
        body: JSON.stringify(data)
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const changeTheme = async (value) => {
    const res = await csrfFetch('/api/settings/theme', {
        method: 'PUT',
        body: JSON.stringify({value})
    })
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const changeLocation = async (value) => {
    const res = await csrfFetch('/api/settings/locations', {
        method: 'PUT',
        body: JSON.stringify({value})
    })
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const changeNotifications = async (value) => {
    const res = await csrfFetch('/api/settings/notifications', {
        method: 'PUT',
        body: JSON.stringify({value})
    })
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

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
