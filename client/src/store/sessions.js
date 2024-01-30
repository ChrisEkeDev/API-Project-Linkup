import { csrfFetch } from './csrf';

export const searchSessions = async (query, sortBy) => {
    const res = await csrfFetch(`/api/sessions/search/?query=${query}&sortBy=${sortBy}`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSession = async (id) => {
    const res = await csrfFetch(`/api/sessions/${id}`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSessionCheckInStatus = async (id) => {
    const res = await csrfFetch(`/api/sessions/${id}/current`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSessionCheckIns = async (id) => {
    const res = await csrfFetch(`/api/sessions/${id}/check-ins`)
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSessionFeed = async (id) => {
    const res = await csrfFetch(`/api/sessions/${id}/feed`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const createSession = async () => {
    const res = await csrfFetch('/api/sessions', {
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

export const updateSession = async (data) => {
    const res = await csrfFetch(`/api/sessions/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const deleteSession = async (id) => {
    const res = await csrfFetch(`/api/sessions/${id}`, {
        method: 'DELETE'
    })
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}
