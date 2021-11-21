import { LOAD_USER, LOAD_USERS, LOGIN_USER as SET_USER, LOGOUT_USER } from "../actions/types";

const DEFAULT_STATE = {
    users: [],
    currentUserId: -1
}

export default function userReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUserId: action.payload,
                currentUser: state.users[action.payload] 
            } //I can see this failing if the user doesn't exist in our local state. Maybe consider a case for that?
        case LOAD_USERS:
            return {
                ...state,
                users: action.payload
            }
        case LOAD_USER:
            return {
                ...state,
                users: { ...state.users, [action.payload.id]: action.payload }
            }
        case LOGOUT_USER:
            return {
                ...state,
                currentUserId: -1,
                currentUser: null
            }
        default:
            return state;
    }
}