import { DocumentReference } from "firebase/firestore";

export type AuthProviders = "password" | "google.com" | "";
export type UserStatus = "offline" | "online";

export interface IUser {
  ref?: DocumentReference;
  uid?: string | null;
  createdAt: Date;
  lastOnline: Date;
  email: string;
  username: string;
  status: UserStatus;
  provider: AuthProviders;
  friends: IUser[];
}

export interface IUserStore extends IUser {
  setUser: (user: IUser) => void;
  getUser: () => IUser;
}
