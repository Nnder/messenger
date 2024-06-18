import { create } from "zustand";
import { produce } from "immer";
import { subscribeWithSelector } from "zustand/middleware";
import { IChat } from "../Chat/Chat.types";

export interface IFolderStore {
  folderType: "all" | "personal" | "chat";
  chats: IChat[];
  filterdChats: IChat[];
  setType: (folderType: string) => void;
  setChats: (chats: IChat[]) => void;
  setFilterdChats: () => void;
}

export const useFolderStore = create(
  subscribeWithSelector<IFolderStore>((set, get) => ({
    folderType: "all",
    chats: [],
    filterdChats: [],
    setChats: (chats: IChat[]) =>
      set(
        produce((state) => {
          state.chats = [...chats];
        }),
      ),
    setType: (folderType: string) =>
      set(
        produce((state) => {
          state.folderType = folderType;
        }),
      ),
    setFilterdChats: () =>
      set(
        produce((state) => {
          const { folderType, chats } = get();
          if (folderType === "all") {
            state.filterdChats = [...chats];
          } else {
            const filterdChats = chats.filter((chat: IChat) => {
              return chat.type === folderType;
            });
            state.filterdChats = [...filterdChats];
          }
        }),
      ),
  })),
);
