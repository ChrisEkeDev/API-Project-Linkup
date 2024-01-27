import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth';
import teamsReducer from './teams';
import sessionsReducer from './sessions';
import membershipsReducer from './memberships';
import chatsReducer from './chats';
import checkInsReducer from './checkins';

const rootReducer = combineReducers({
    auth: authReducer,
    teams: teamsReducer,
    sessions: sessionsReducer,
    memberships: membershipsReducer,
    checkIns: checkInsReducer,
    chats: chatsReducer,
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
