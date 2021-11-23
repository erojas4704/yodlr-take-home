import axios from "axios";
import { LOAD_USER, LOGOUT_USER, SET_USER, LOAD_USERS_SUCCESS, CREATE_USER, LOAD_USER_SUCCESS, CREATE_USER_FAIL, LOAD_USER_FAIL, LOAD_USERS, LOAD_USERS_FAIL, CREATE_USER_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN, CANCEL_LOGIN } from "./types";

const getAllUsersFromAPI = () => {
    return async dispatch => {
        dispatch({ type: LOAD_USERS });
        try {
            const res = await axios.get('/users');
            dispatch({ type: LOAD_USERS_SUCCESS, payload: res.data });
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
            dispatch({ type: LOAD_USER_SUCCESS, payload: res.data });
        } catch (err) {
            console.error(err);
            dispatch({ type: LOAD_USER_FAIL, payload: err.response.data.message });
        }
    }
}

const createUser = (formData) => {
    return async dispatch => {
        dispatch({ type: CREATE_USER, payload: formData });
        try {
            const res = await axios.post('/users', formData);
            dispatch({ type: CREATE_USER_SUCCESS });
            dispatch({ type: LOAD_USER_SUCCESS, payload: res.data });
            dispatch({ type: SET_USER, payload: res.data.id });
        } catch (err) {
            console.error(err);
            dispatch({ type: CREATE_USER_FAIL, payload: err.message });
        }
    }
}

const login = (formData) => {
    return async dispatch => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();

        dispatch({ type: LOGIN, payload: { ...formData, source } });
        try {
            const res = await axios.post('/users/login', formData, { cancelToken: source.token });
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            dispatch({ type: LOAD_USER_SUCCESS, payload: res.data });
            dispatch({ type: SET_USER, payload: res.data.id });
        } catch (err) {
            console.error(err);
            let message = err.response;
            if (err.response) message = err.response.data.message;
            dispatch({ type: LOGIN_FAIL, payload: message });
        }
    };
}

const cancelLogin = () => {
    return async (dispatch, getState) => {
        const { source, loading } = getState().login; //concern: Is it ok practice to access the state in an action?
        if (loading && source) {
            dispatch({ type: CANCEL_LOGIN });
            source.cancel();
        }
    }
}

const logoutUser = () => {
    return async dispatch => {
        await axios.post('/users/logout');
        dispatch({ type: LOGOUT_USER });
    }
}

export { getAllUsersFromAPI, getUserFromAPI, createUser, logoutUser, login, cancelLogin };