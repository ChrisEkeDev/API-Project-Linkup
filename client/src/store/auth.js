import { csrfFetch } from "./csrf";


export const signIn = async (playerData) => {
    const res = await csrfFetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(playerData)
    });
    return res
}

export const signInGuest = async () => {
    const playerData = {email: 'pcartwirght@email.com', password: 'password1'}
    const res = await csrfFetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(playerData)
    });
    return res
}

export const signOut = async () => {
    const res = await csrfFetch('/api/auth', { method: 'DELETE'});
    return res
}

export const signUp = async (playerData) => {
    const res = await csrfFetch('/api/players', {
        method: 'POST',
        body: JSON.stringify(playerData)
    });
    return res
}

export const getAuth = async () => {
    const res = await csrfFetch(`/api/auth`);
    return res
}

export const getMyTeams = async (id) => {
    const res = await csrfFetch(`/api/teams/current`);
    return res
}

export const getMySessions = async () => {
    const res = await csrfFetch(`/api/sessions/current`);
    return res
}

export const getMyCheckIns = async (id) => {
    const res = await csrfFetch(`/api/check-ins/current`)
    return res
}

export const getMyMemberships = async () => {
    const res = await csrfFetch(`/api/memberships/current`)
    return res
}


export const getMySettings = async () => {
    const res = await csrfFetch('/api/settings/current')
    return res
}

export const getMyLikes = async () => {
    const res = await csrfFetch(`/api/likes/current`);
    return res
}

export const addLike = async (data) => {
    const res = await csrfFetch(`/api/likes`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res
}

export const removeLike = async (data) => {
    const res = await csrfFetch(`/api/likes`, {
        method: 'DELETE',
        body: JSON.stringify(data)
    });
    return res
}

export const toggleThemes = async (value) => {
    const res = await csrfFetch('/api/settings/theme', {
        method: 'PUT',
        body: JSON.stringify({value})
    })
    return res
}

export const toggleLocations = async (value) => {
    const res = await csrfFetch('/api/settings/locations', {
        method: 'PUT',
        body: JSON.stringify({value})
    })
    return res
}

export const toggleNotifications = async (value) => {
    const res = await csrfFetch('/api/settings/notifications', {
        method: 'PUT',
        body: JSON.stringify({value})
    })
    return res
}

// GOOGLE
export const googleAuthSignIn = async () => {
    const res = await csrfFetch('/api/auth/google')
    return res
    // try {
    //     const jsonResponse = await res.json();
    //     console.log(jsonResponse)
    // } catch(error) {
    //     console.error(error)
    // }
}
