import axios from "@/libs/axios";
// import moment from "moment";

export default {
  UPDATE_WALLET_INFO(state, value) {
    state.walletAddress = value;
    state.user.walletAddress = value;
  },
  SET_USER_DETAILS(state, value) {
    state.user = value.user;
    state.isUserLoggedIn = true;
    value.token
      ? (state.accessToken = value.token)
      : localStorage.getItem("accessToken");
  },
  SET_BEARER_TOKEN(state, value) {
    axios.defaults.headers.common.Authorization = `Bearer ${value}`;
  },
  UPDATE_SKILL_SET(state, value) {
    state.user.skills = value;
  },
  EDIT_USER_DETAILS(state, value) {
    state.user = { ...state.user, ...value };
  },
  SET_USER_LOGGED(state, value) {
    state.isUserLoggedIn = value;
  },
};
