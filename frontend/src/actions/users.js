import axios from "axios";
import { LOAD_USER, LOGOUT_USER, LOGIN_USER, LOAD_USERS_SUCCESS, CREATE_USER, LOAD_USER_SUCCESS, CREATE_USER_FAIL, LOAD_USER_FAIL, LOAD_USERS, LOAD_USERS_FAIL } from "./types";

const getAllUsersFromAPI = () => {
    return async dispatch => {
        dispatch({ type: LOAD_USERS });
        try {
            const res = await axios.get('/users');
            dispatch(setUsersList(res.data));
        } catch (err) {
            console.error(err);
            dispatch({ type: LOAD_USERS_FAIL, payload: err.response.data.message });
        }
    }
}

const getUserFromAPI = (id) => {
    return async dispatch => {
        dispatch({ type: LOAD_USER, payload: id });
        try {
            const res = await axios.get(`/users/${id}`);
            dispatch(setUserData(res.data));
        } catch (err) {
            console.error(err);
            dispatch({ type: LOAD_USER_FAIL, payload: err.response.data.message });
        }
    }
}

const createUser = (formData) => {
    return async dispatch => {
        dispatch({ type: CREATE_USER });
        try {
            const res = await axios.post('/users', formData);
            dispatch(setUserData(res.data));
            dispatch(loginToUser(res.data.id));
        } catch (err) {
            dispatch({ type: CREATE_USER_FAIL, payload: err.response.data.message });
        }
    }
}

const loginToUser = (id) => {
    return { type: LOGIN_USER, payload: id };
}

const setUserData = (data) => {
    return { type: LOAD_USER_SUCCESS, payload: data };
}

const setUsersList = (users) => {
    return { type: LOAD_USERS_SUCCESS, payload: users };
}

const logoutUser = () => {
    return { type: LOGOUT_USER };
}

export { getAllUsersFromAPI, getUserFromAPI, createUser, logoutUser };