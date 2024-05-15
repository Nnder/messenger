import { User } from "../User/User.types";

export interface ChatStore {
  Chats: Chat[];
  setChats: (chats: Chat[]) => void;
  removeChat: (chat: Chat) => void;
  updateChat: (chat: Chat) => void;
}

export interface Chat {
  createdAt: Date;
  updatedAt: Date;
  lastMessage: string;
  name: string;
  notRead: number | null;
  users: User[];
}
