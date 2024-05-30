import { IUser } from "../User/User.types";

export interface IChatStore {
  Chats: IChat[];
  setChats: (chats: IChat[]) => void;
  removeChat: (chat: IChat) => void;
  updateChat: (chat: IChat) => void;
}

type firebaseDate = {
  seconds: number;
  nanoseconds: number;
};

export interface IChat {
  uid?: string;
  createdAt: firebaseDate;
  updatedAt: firebaseDate;
  lastMessage: string;
  name: string;
  notRead: number | null;
  users: IUser[];
}
