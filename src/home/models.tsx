import type { Navigation } from "../common/models";

type homeRoutes = "Books" | "Films";
export const homeNavigation: Navigation<homeRoutes> = {
  Films: {
    path: "/films",
    title: "Films",
  },
  Books: {
    path: "/books",
    title: "Books",
  },
};
