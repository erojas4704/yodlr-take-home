import { LOAD_USER, LOAD_USERS, LOAD_USERS_FAIL, LOAD_USERS_SUCCESS, LOAD_USER_SUCCESS, SET_USER, LOGOUT_USER, CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL } from "../actions/types";

const DEFAULT_STATE = {
    users: [],
    currentUserId: -1,
    newUser: {}
}

//TODO user.users redundant. 
//Reducer is too long
//TODO seperate into more reducers
//TODO edit state in another reducer OK practice? feasible?
export default function userReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUserId: action.payload,
                currentUser: state.users.data[action.payload]
            } //I can see this failing if the user doesn't exist in our local state. Maybe consider a case for that?
        case LOAD_USERS:
            return {
                ...state,
                users: {
                    data: {},
                    loading: true
                }
            }
        case LOAD_USERS_SUCCESS:
            return {
                ...state,
                users: {
                    data: action.payload,
                    loading: false
                }
            }
        case LOAD_USERS_FAIL:
            return {
                ...state,
                users: {
                    data: {},
                    loading: false,
                    error: action.payload
                }
            }
        case LOAD_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    data: {
                        ...state.users.data,
                        [action.payload]: { loading: true }
                    }
                }
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                users: {
                    ...state.users,
                    data: {
                        ...state.users.data,
                        [action.payload.id]: action.payload
                    }
                }
            }
        case LOGOUT_USER:
            return {
                ...state,
                currentUserId: -1,
                currentUser: null
            }
        case CREATE_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                },
                newUser: {
                    loading: true,
                    error: null,
                    data: action.payload
                }
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                newUser: {
                    loading: false
                }
            }
        case CREATE_USER_FAIL:
            return {
                ...state,
                newUser: {
                    ...state.newUser,
                    loading: false,
                    error: action.payload
                }
            }
        default:
            return state;
    }
}