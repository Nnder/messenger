import { create } from "zustand";
import { UserStore, User } from "./User.types";

export const useUserStore = create<UserStore>((set, get) => ({
  uid: null,
  createdAt: new Date(),
  lastOnline: new Date(),
  email: "",
  username: "",
  status: "offline",
  provider: "",
  setUser: (user: User) => set(() => ({ ...user })),
  getUser: () => {
    const data = get();
    return {
      createdAt: data.createdAt,
      lastOnline: data.lastOnline,
      email: data.email,
      provider: data.provider,
      status: data.status,
      username: data.username,
      uid: data.uid,
      ref: data.ref,
    } as User;
  },

  // setSelectedBid: (bid: Bid) => set(produce((state) => {
  //   state.selectedBid = bid
  // }))
}));
