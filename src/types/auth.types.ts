import { User } from "firebase/auth";

export type Value = {
  currentUser: User | null;
  signup: (email: string, password: string, userName: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => {};
};
