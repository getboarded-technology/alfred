import axios from "@/libs/axios";
import constants from "@/constants";

export default {
  async getOrgData({ commit }, payload) {
    const orgDetails = await axios.get(
      `${constants.apiUrl}org/organization/${payload.orgId}`
    );
    commit("SET_ORG_DETAILS", orgDetails.data);
    return orgDetails.data;
  },
  async getOrgBalance(_, payload) {
    const orgBalance = await axios.post(
      `${constants.apiUrl}vault/get-user-balance`,
      payload
    );
    return orgBalance.data;
  },
  async addOrgKnt(_, payload) {
    const token = await axios.post(
      `${constants.apiUrl}vault/create-know-pool`,
      payload
    );
    return token.data;
  },
  async getOrgAssignedTask(_, payload) {
    const token = await axios.get(
      `${constants.apiUrl}org/get-approved-task/${payload.orgId}`
    );
    return token.data;
  },
};
