import type { Navigation } from "../common/models";

type connectionRoutes = "Friends" | "Requests";
export const connectionsNavigation: Navigation<connectionRoutes> = {
  Requests: {
    path: "/friendRequests",
    title: "Friend Requests",
  },
  Friends: {
    path: "",
    title: "All Friends",
  },
};
