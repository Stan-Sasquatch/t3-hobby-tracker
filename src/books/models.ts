import type { Navigation } from "../common/models";

export const googleVolumeQueryTypes = { author: "inauthor", title: "intitle" };
type bookRoutes = "Create" | "All";
export const booksNavigation: Navigation<bookRoutes> = {
  Create: {
    path: "/create",
    title: "New Rating",
  },
  All: {
    path: "",
    title: "All Book Ratings",
  },
};
