import type { Navigation } from "../common/models";

type homeRoutes = "Books" | "TV and Film" | "Connections" | "Exercise";
export const homeNavigation: Navigation<homeRoutes> = {
  "TV and Film": {
    path: "/films",
    title: "Films",
    disabled: true,
  },
  Books: {
    path: "/books",
    title: "Books",
  },
  Connections: {
    path: "/connections",
    title: "Connections",
    disabled: true,
  },
  Exercise: {
    path: "/exercise",
    title: "Exercise",
    disabled: true,
  },
};
