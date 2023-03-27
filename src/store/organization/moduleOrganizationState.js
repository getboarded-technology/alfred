import { isUserLoggedIn, getAccessToken } from "@/services/auth.service";

export default {
  avatarNameGenerator: (f, l) => {
    if (f) {
      return `${f.charAt(0)}%20${l.charAt(0)}`;
    } else {
      return `S%20G`;
    }
  },
  org: {},
  orgUsers: {},
  accessToken: getAccessToken() || "",
  isUserLoggedIn: isUserLoggedIn(),
  orgKnowledgeToken: "",
};
