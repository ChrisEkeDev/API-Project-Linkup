import { csrfFetch } from "./csrf";

// TYPE

const SEARCH = '/linkup/search/SEARCH';


// ACTION

const actionSearch = (results) => ({
    type: SEARCH,
    payload: results
})

// THUNK

export const thunkSearch = (query) => async dispatch => {
    const res = await csrfFetch(`/api/search/?query=${query}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionSearch(data.Results))
    }
}


// REDUCER

const initialState = { results: {} }
const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH: {
            const newState = { results: {}}
            action.payload.forEach((result, idx) => newState.results[idx] = result);
            return newState;
        }
        default:
            return state;
    }
}


export default searchReducer;
