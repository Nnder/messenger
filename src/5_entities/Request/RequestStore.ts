import { create } from "zustand";
import { IRequestReady } from "./Request";
import { produce } from "immer";
import { subscribeWithSelector } from "zustand/middleware";

export interface IRequestStore {
  requests: IRequestReady[];
  setRequests: (request: IRequestReady[]) => void;
}

export const useRequestStore = create(
  subscribeWithSelector<IRequestStore>((set) => ({
    requests: [],
    setRequests: (request: IRequestReady[]) =>
      set(
        produce((state) => {
          state.request = [...request];
        }),
      ),
  })),
);
