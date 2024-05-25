import { User } from "../User/User.types";

export interface ChatStore {
  Chats: Chat[];
  setChats: (chats: Chat[]) => void;
  removeChat: (chat: Chat) => void;
  updateChat: (chat: Chat) => void;
}

type firebaseDate = {
  seconds: number;
  nanoseconds: number;
};

export interface Chat {
  uid?: string;
  createdAt: firebaseDate;
  updatedAt: firebaseDate;
  lastMessage: string;
  name: string;
  notRead: number | null;
  users: User[];
}
