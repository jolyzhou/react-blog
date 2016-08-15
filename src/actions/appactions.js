import * as constants from '../constants';
/**
 * login action
 * @param lg_status
 * @returns {{type: string, lg_status: *}}
 */
export function login(lg_status) {
    return { type: constants.LOG_IN, lg_status};
}
/**
 * logout action
 * @param lg_status
 * @returns {{type, lg_status: *}}
 */
export function logout(lg_status) {
    return { type: constants.LOG_OUT, lg_status };
}
/**
 * posts all pages num
 * @param page_num
 * @returns {{type: string, page_num: *}}
 */
export function posts_allcount(page_num) {
    return { type: constants.POST_GET_COUNT, page_num };
}
/**
 * posts list data
 * @param data
 * @returns {{type, data: *}}
 */
export function posts_alllist(data) {
    return { type: constants.POST_GET_LIST, data};
}
/**
 * prev page
 * @param page_num
 * @param offset
 * @returns {{type, page_num: *, offset: *}}
 */
export function page_prev(page_num, offset) {
    return { type: constants.PAGE_PREV, page_num, offset};
}
/**
 * next page
 * @param page_num
 * @param offset
 * @returns {{type, page_num: *, offset: *}}
 */
export function page_next(page_num, offset) {
    return { type: constants.PAGE_NEXT, page_num, offset};
}