import { DocumentReference } from "firebase/firestore";

export type AuthProviders = "password" | "google.com" | "";
export type UserStatus = "offline" | "online";

export interface User {
  ref?: DocumentReference;
  uid?: string | null;
  createdAt: Date;
  lastOnline: Date;
  email: string;
  username: string;
  status: UserStatus;
  provider: AuthProviders;
}

export interface UserStore extends User {
  setUser: (user: User) => void;
  getUser: () => User;
}
