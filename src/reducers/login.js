import * as constants from '../constants';

export default (state = { lg_status :false, email: null, password: null }, action) => {
    switch (action.type) {
        case constants.LOG_IN:
            return {...state, lg_status:action.lg_status};
        case constants.LOG_OUT:
            return {...state, lg_status:action.lg_status, email: null, password: null};
        case constants.LOG_INPUT_EMAIL:
            return {...state, email: action.email };
        case constants.LOG_INPUT_PASSWORD:
            return {...state, password: action.password};
        default:
            return state;
    }
}