import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../actions/user";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";

const state = {
    status: "",
    profile: {} ,
    verified: localStorage.getItem("is_v") ? localStorage.getItem("is_v") === '1' ? true : false : "",
    employer: localStorage.getItem("u_t") ? localStorage.getItem("u_t") === '3' ? true : false : "",
    job_seeker: localStorage.getItem("u_t") ? localStorage.getItem("u_t") === '4' ? true : false : "",
};

const getters = {
    isVerified: state => state.verified,
    isEmployer: state => state.employer,
    isJobSeeker: state => state.job_seeker,
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name
};

const actions = {
    [USER_REQUEST]: ({ commit, dispatch }) => {
        commit(USER_REQUEST);
        window.axios.get(process.env.ApiUrl + 'user', {
            headers: {'Authorization': 'Bearer '+localStorage.user_token, }
        },)
            .then(resp => {
                localStorage.setItem("is_v", resp.data.data.verified_at ? 1 : 0);
                localStorage.setItem("u_t", resp.data.data.account_type_id);
                if (resp.data.data.account_type_id == 3) {
                    if (resp.data.data.employer) {
                        localStorage.setItem("avatar", resp.data.data.employer.logo);
                    }
                } else if (resp.data.data.account_type_id == 4) {
                    if (resp.data.data.job_seeker) {
                        localStorage.setItem("avatar", resp.data.data.job_seeker.avatar);
                    }
                }
                localStorage.setItem("user", JSON.stringify(resp.data.data));
                commit(USER_SUCCESS, resp);
            })
        // .catch(() => {
        //   commit(USER_ERROR);
        //   // if resp is unauthorized, logout, to
        //   dispatch(AUTH_LOGOUT);
        // });
    }
};

const mutations = {
    [USER_REQUEST]: state => {
        state.status = "loading";
    },
    [USER_SUCCESS]: (state, resp) => {
        state.status = "success";
        Vue.set(state, "profile", resp);
    },
    [USER_ERROR]: state => {
        state.status = "error";
    },
    [AUTH_LOGOUT]: state => {
        state.profile = {};
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
