import { create } from "zustand";
import { produce } from "immer";
import { subscribeWithSelector } from "zustand/middleware";

interface INavbarStore {
  showNabar: boolean;
  setNavbar: any;
}

export const useNavbarStore = create(
  subscribeWithSelector<INavbarStore>((set) => ({
    showNabar: true,
    setNavbar: (bool: boolean) =>
      set(
        produce((state) => {
          state.showNabar = bool;
        }),
      ),
  })),
);
