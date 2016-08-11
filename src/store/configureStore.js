import { createStore, applyMiddleware, combineReducers} from 'redux';
import logger from '../middleware/logger';
import reducers from '../reducers/reducers';
import { routerReducer} from 'react-router-redux';

const createStoreWithMiddleware = applyMiddleware(
    logger
)(createStore);

const comReducers = combineReducers({
    reducers,
    routing: routerReducer
});

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(comReducers, initialState);

    return store;
}
