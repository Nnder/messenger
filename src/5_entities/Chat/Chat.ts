import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { IChat } from "./Chat.types";
import { IUser } from "../User/User.types";
import toast from "react-hot-toast";

export const createChat = async (params: Partial<IChat>) => {
  return await addDoc(collection(db, "chats"), params);
};

export const fetchChats = async (user: IUser) => {
  const queryChats = await query(
    collection(db, "chats"),
    where("users", "array-contains", user.ref),
  );

  const chats: IChat[] = [];

  const querySnapshot = await getDocs(queryChats);
  querySnapshot.forEach((doc) => {
    chats.push({ ...doc.data(), uid: doc.id } as IChat);
  });
  return chats;
};

export const subscribeOnChats = async (
  user: IUser,
  callback: (chats: IChat[]) => void,
) => {
  const queryChats = await query(
    collection(db, "chats"),
    where("users", "array-contains", user.ref),
  );

  onSnapshot(queryChats, (snapshot: any) => {
    const chats: IChat[] = [];
    snapshot.forEach((doc: any) => {
      chats.push({ ...doc.data(), uid: doc.id });
    });

    callback(chats);
  });
};

export const fetchChat = async (chatUID: string) => {
  const docRef = doc(db, "chats", chatUID);

  let chat: IChat = {} as IChat;

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      chat = { ...docSnap.data(), uid: docSnap.id } as IChat;
    } else {
      toast("Чат не найден");
    }
  } catch (e) {
    toast("Ошибка при получении чата");
  }

  return chat;
};

export const subscribeOnChat = async (
  chatUID: string,
  callback: (chat: IChat) => void,
) => {
  const docRef = doc(db, "chats", chatUID);

  const unsub = onSnapshot(docRef, (snapshot: any) => {
    let chat: IChat = { ...snapshot.data(), uid: snapshot.id };
    callback(chat);
  });

  return unsub;
};
