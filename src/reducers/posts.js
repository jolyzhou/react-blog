import * as constants from '../constants';
/**
 * init state
 * @type {{data: string, offset: number, limit: number, page: number, page_num: number}}
 */
const initialState = {
    data: "",
    offset: 0,
    limit: 2,
    page: 1,
    page_num: 1
};

export default (state = initialState, action) => {
    switch (action.type) {
        case constants.POST_GET_COUNT:
            return {...state, page: action.page_num};
        case constants.POST_GET_LIST:
            return {...state, data: action.data};
        case constants.PAGE_PREV:
            return {...state, page_num: action.page_num, offset: action.offset};
        case constants.PAGE_NEXT:
            return {...state, page_num: action.page_num, offset: action.offset};
        default:
            return state;

    }
}