import { DocumentData, DocumentReference } from "firebase/firestore";
import { IUser } from "../User/User.types";

export interface IChatStore {
  Chats: IChat[];
  setChats: (chats: IChat[]) => void;
  removeChat: (chat: IChat) => void;
  updateChat: (chat: IChat) => void;
}

export type firebaseDate = {
  seconds: number;
  nanoseconds: number;
};

export interface IChat<T = firebaseDate> {
  uid?: string;
  createdAt: T;
  updatedAt: T;
  lastMessage: string;
  name: string;
  notRead: number | null;
  users: IUser[];
  type: string;
  owner: DocumentReference<DocumentData, DocumentData>;
}
