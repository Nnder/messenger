import { create } from "zustand";
import { UserStore, User } from "./user.types";

export const useUserStore = create<UserStore>((set) => ({
  uid: null,
  createdAt: new Date(),
  lastOnline: new Date(),
  email: "",
  username: "",
  status: "offline",
  provider: "",
  setUser: (user: User) => set(() => ({ ...user })),

  // openModal: () => set((state) => ({ modal: true })),
  // closeModal: () => set((state) => ({ modal: false, selectedBid: null })),
  // setSelectedBid: (bid: Bid) => set(produce((state) => {
  //   state.selectedBid = bid
  // }))
}));
