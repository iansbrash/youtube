import { User, Session as NextAuthSession } from "next-auth";

export type Session = Omit<NextAuthSession, "user"> & {
  user: User;
};
