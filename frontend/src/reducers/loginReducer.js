import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/types";

const DEFAULT_STATE = {
    loading: false,
    error: null,
    data: null
}

export default function loginReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: true,
                data: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        default:
            return state;
    }
}