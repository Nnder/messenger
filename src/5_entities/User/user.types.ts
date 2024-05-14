export type AuthProvider = "password" | "google.com" | "";

export interface User {
  uid: string | null;
  createdAt: Date;
  lastOnline: Date;
  email: string;
  username: string;
  status: boolean;
  provider: AuthProvider;
}

export interface UserStore extends User {
  setUser: (user: User) => void;
}
