import axios from "@/libs/axios";
import constants from "@/constants.js";

export default {
  async fetchUserFeed(_, { skills, getboardedId }) {
    try {
      const resObj = await axios.post(
        `${constants.feedServiceUrl}/userRecommendations`,
        {
          skills,
          // personalityTraits,
          getboardedId,
        }
      );
      return resObj.data;
    } catch (error) {
      console.log(error);
      return "FEED_API_ERROR";
    }
  },
  async updateCourseStatus(_, updateObj) {
    try {
      const resObj = await axios.put(`${constants.feedServiceUrl}/updateitem`, {
        getboardedId: updateObj.getboardedId,
        itemId: updateObj.itemId,
        type: updateObj.type,
        status: updateObj.status,
      });
      return resObj.data;
    } catch (error) {
      console.log(error);
      return "FEED_API_ERROR";
    }
  },
  async doneItems(_, userId) {
    try {
      const resObj = await axios.post(`${constants.feedServiceUrl}/doneitems`, {
        getboardedId: userId,
      });
      return resObj.data;
    } catch (error) {
      console.log(error);
      return "FEED_API_ERROR";
    }
  },
  async doingItems({ commit }, userId) {
    try {
      const resObj = await axios.post(
        `${constants.feedServiceUrl}/doingitems`,
        { getboardedId: userId }
      );

      if (resObj && Array.isArray(resObj.data)) {
        commit("SET_DOING_ITEMS", resObj.data);
      } else {
        commit("SET_DOING_ITEMS", []);
      }
      return resObj.data;
    } catch (error) {
      return "FEED_API_ERROR";
    }
  },
  async distributedItems(_, orgId) {
    try {
      const resObj = await axios.get(
        `${constants.feedServiceUrl}/getorgitems?getboardedOrgId=${orgId}`
      );

      if (resObj && Array.isArray(resObj.data)) {
        return resObj.data;
      } else {
        return [];
      }
    } catch (error) {
      return "FEED_API_ERROR";
    }
  },
};
