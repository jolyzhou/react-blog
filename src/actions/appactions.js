import * as constants from '../constants';

export function login(lg_status) {
    return { type: constants.LOG_IN, lg_status};
}

export function logout(lg_status) {
    return{ type: constants.LOG_OUT, lg_status};
}