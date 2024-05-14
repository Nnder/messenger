import { create } from "zustand";
import { UserStore, User } from "./user.types";

export const useUserStore = create<UserStore>((set, get) => ({
  uid: null,
  createdAt: new Date(),
  lastOnline: new Date(),
  email: "",
  username: "",
  status: false,
  provider: "",
  setUser: (user: User) => set((state) => ({ ...user })),

  // openModal: () => set((state) => ({ modal: true })),
  // closeModal: () => set((state) => ({ modal: false, selectedBid: null })),
  // setSelectedBid: (bid: Bid) => set(produce((state) => {
  //   state.selectedBid = bid
  // }))
}));
