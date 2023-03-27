import axios from "@/libs/axios";
import constants from "@/constants";

export default {
  //wallet updation
  updateWalletInfo({ commit }, payload) {
    commit("UPDATE_WALLET_INFO", payload);
  },
  async saveUserDetails({ commit }, payload) {
    const userDetails = await axios.post(
      `${constants.apiUrl}auth/walltetSignIn`,
      payload
    );
    localStorage.setItem("accessToken", userDetails.data.token);
    localStorage.setItem("user", JSON.stringify(userDetails.data.user));
    commit("SET_USER_DETAILS", userDetails.data);
    commit("SET_BEARER_TOKEN", userDetails.data.token);
    return userDetails;
  },
  async editUserData({ commit }, payload) {
    const updatedUserDetails = await axios.patch(
      `${constants.apiUrl}users/user/${payload.id}`,
      payload.updatedDetails
    );
    commit("EDIT_USER_DETAILS", payload.updatedDetails);
    return updatedUserDetails;
  },
  async getUserData({ commit }, payload) {
    const userDetails = await axios.get(
      `${constants.apiUrl}users/user/${payload}`
    );
    const details = {
      user: userDetails.data,
    };
    commit("SET_USER_DETAILS", details);
    return userDetails;
  },
  async getOrgData() {
    const orgDetails = await axios.get(
      `${constants.apiUrl}org/organization/641ed84742fe9010218b5293`
    );
    return orgDetails;
  },
  async assignTask(_, payload) {
    const orgDetails = await axios.post(
      `${constants.apiUrl}org/assign-task`,
      payload
    );
    return orgDetails;
  },
  async getAssignTask(_, payload) {
    const tasks = await axios.post(
      `${constants.apiUrl}users/get-assigned-tasks`,
      {
        userId: payload.userId,
        organizationId: "641ed84742fe9010218b5293",
      }
    );
    return tasks;
  },
  async updateAssignTask(_, payload) {
    const tasks = await axios.post(
      `${constants.apiUrl}org/assign-task`,
      payload
    );
    return tasks;
  },
};
