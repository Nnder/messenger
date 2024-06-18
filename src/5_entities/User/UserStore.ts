import { create } from "zustand";
import { IUserStore, IUser } from "./User.types";

export const useUserStore = create<IUserStore>((set, get) => ({
  uid: null,
  createdAt: new Date(),
  lastOnline: new Date(),
  email: "",
  username: "",
  status: "offline",
  provider: "",
  friends: [],
  friendCount: 0,
  setUser: (user: IUser) => set(() => ({ ...user })),
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
      friends: data.friends,
    } as IUser;
  },

  // setSelectedBid: (bid: Bid) => set(produce((state) => {
  //   state.selectedBid = bid
  // }))
}));
