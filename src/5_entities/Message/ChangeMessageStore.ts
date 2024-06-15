import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { IMessage } from "./Message";
import { produce } from "immer";

interface IChangeMessageStore {
  editMessage: Partial<IMessage>;
  newMessage: Partial<IMessage>;
  setNewMessage: (message: Partial<IMessage>) => void;
  setEditMessage: (message: Partial<IMessage>) => void;
  getMsg: () => [Partial<IMessage>, Partial<IMessage>];
  removeMsg: () => void;
}

export const useChangeMessageStore = create(
  subscribeWithSelector<IChangeMessageStore>((set, get) => ({
    editMessage: {},
    newMessage: {},
    setNewMessage: (message: Partial<IMessage>) =>
      set(
        produce((state) => {
          state.newMessage = { ...message };
        }),
      ),
    setEditMessage: (message: Partial<IMessage>) =>
      set(
        produce((state) => {
          state.editMessage = { ...message };
        }),
      ),
    getMsg: () => {
      const data = get();
      return [data.editMessage, data.newMessage];
    },
    removeMsg: () =>
      set(
        produce((state) => {
          state.newMessage = {};
          state.editMessage = {};
        }),
      ),
  })),
);
