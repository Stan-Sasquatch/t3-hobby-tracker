import type { Navigation } from "../common/models";

type homeRoutes = "Books" | "TV and Film" | "Connections" | "Exercise";
export const homeNavigation: Navigation<homeRoutes> = {
  "TV and Film": {
    path: "/vMedia",
    title: "TV and Film",
  },
  Books: {
    path: "/books",
    title: "Books",
  },
  Connections: {
    path: "/connections",
    title: "Connections",
  },
  Exercise: {
    path: "/exercise",
    title: "Exercise",
    disabled: true,
  },
};
