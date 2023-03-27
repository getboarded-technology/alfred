import axios from "@/libs/axios";
// import moment from "moment";

export default {
  SET_ORG_DETAILS(state, value) {
    state.org = value.orgDetails;
    state.orgUsers = value.user;
    state.isUserLoggedIn = true;
    value.token
      ? (state.accessToken = value.token)
      : localStorage.getItem("accessToken");
  },
  SET_BEARER_TOKEN(state, value) {
    axios.defaults.headers.common.Authorization = `Bearer ${value}`;
  },
  SET_ORG_KNT(state, value) {
    state.orgKnowledgeToken = value;
  },
  SET_USER_LOGGED(state, value) {
    state.isUserLoggedIn = value;
  },
};
