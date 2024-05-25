import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { Chat } from "./Chat.types";
import { User } from "../User/User.types";

import { useList } from "react-firebase-hooks/database";

export const createChat = async (params: Partial<Chat>) => {
  return await addDoc(collection(db, "chats"), params);
};

export const fetchChats = async (user: User) => {
  const queryChats = await query(
    collection(db, "chats"),
    where("users", "array-contains", user.ref),
  );

  const chats: Chat[] = [];

  const querySnapshot = await getDocs(queryChats);
  querySnapshot.forEach((doc) => {
    chats.push({ ...doc.data(), uid: doc.id } as Chat);
  });

  subscribeOnChats(user);

  return chats;
};

export const subscribeOnChats = async (user: User) => {
  const queryChats = await query(
    collection(db, "chats"),
    where("users", "array-contains", user.ref),
  );

  const unsubscibe = onSnapshot(queryChats, (snapshot: any) => {
    const chats: Chat[] = [];
    snapshot.forEach((doc: any) => {
      chats.push({ ...doc.data(), uid: doc.id });
    });
    console.log("Current chats: ", chats);
  });
};
