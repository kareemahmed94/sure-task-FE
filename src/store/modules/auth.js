import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from "../actions/auth";
import {USER_ERROR, USER_REQUEST, USER_SUCCESS} from '../actions/user'

const base_url = 'http://127.0.0.1:8000/'
const state = {
    token: localStorage.getItem("user_token") || "",
    status: "",
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
};

const actions = {
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            window.axios.post('auth', {username: user.username,password: user.password,remember: user.remember})
                .then(resp => {
                    if (resp.data.error_code == 200) {
                        localStorage.setItem("jwt", resp.data.token);
                        window.axios.get('user', {
                            headers: {'Authorization': 'Bearer '+localStorage.user_token, }
                        },).then(resp => {
                            localStorage.setItem("is_v", resp.data.data.email_verified_at ? 1 : 0);
                            localStorage.setItem("user", JSON.stringify(resp.data.data));
                            resolve(resp);
                            commit(USER_SUCCESS, resp);
                        })
                    } else if (resp.data.error_code == 500) {
                        commit(AUTH_ERROR, resp.data.msg);
                        reject(resp.data.msg);
                    }
                })
                .catch(err => {
                    let error = 'حدث خطأ برجاء المحاولة مرة أخرى';
                    commit(AUTH_ERROR, error);
                    localStorage.removeItem("user_token");
                    reject(error);
                });

        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem("user_token");
            resolve();
        });
    }
};

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, resp) => {
        state.status = "success";
        state.token = resp.token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: state => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
        state.token = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
