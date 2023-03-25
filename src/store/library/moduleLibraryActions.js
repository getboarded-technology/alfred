import axios from "@/libs/axios";
import constants from "@/constants";

export default {
  async getLibraryItems() {
    const libraryItems = await axios.get(
      `${constants.libraryUrl}/user/63386b52e53144001cb09ddb/619f758aa209bcda350c9cf6`
    );
    return libraryItems.data;
  },
};
