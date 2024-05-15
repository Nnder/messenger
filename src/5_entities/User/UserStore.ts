import { create } from "zustand";
import { UserStore, User } from "./User.types";

export const useUserStore = create<UserStore>((set) => ({
  uid: null,
  createdAt: new Date(),
  lastOnline: new Date(),
  email: "",
  username: "",
  status: "offline",
  provider: "",
  setUser: (user: User) => set(() => ({ ...user })),

  // setSelectedBid: (bid: Bid) => set(produce((state) => {
  //   state.selectedBid = bid
  // }))
}));
