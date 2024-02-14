
import { csrfFetch } from './csrf';


export const getGooglePlaces = async (query) => {
    const res = await csrfFetch(`/api/places`, {
        method: 'POST',
        body: JSON.stringify({query})
    })
    return res
}
