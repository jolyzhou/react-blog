import * as constants from '../constants';

export default (state = { lg_status :false }, action) => {
    switch (action.type) {
        case constants.LOG_IN:
            return {...state, lg_status:action.lg_status};
        case constants.LOG_OUT:
            return {...state, lg_status:action.lg_status};
        default:
            return state;
    }
}