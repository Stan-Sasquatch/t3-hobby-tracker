import { z } from "zod";
import type { Navigation } from "../common/models";

type connectionRoutes = "Friends" | "Requests";
export const CompleteStatusEnum = z.enum(["CONFIRMED", "REJECTED"]);
export type CompleteStatusEnum = z.infer<typeof CompleteStatusEnum>;
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
