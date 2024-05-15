import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { Chat } from "./Chat.types";

const createChat = async (params: Partial<Chat>) => {
  return await addDoc(collection(db, "chats"), params);
};

export const fetchChats = async (uid: string) => {
  const queryChats = await query(
    collection(db, "chats"),
    where("users", "array-contains", uid),
  );

  const chats: Chat[] = [];

  const querySnapshot = await getDocs(queryChats);
  querySnapshot.forEach((doc) => {
    chats.push(doc.data() as Chat);
  });

  return chats;
};
