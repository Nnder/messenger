import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { IChat } from "./Chat.types";
import { IUser } from "../User/User.types";

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

// export const fetchChat = async (user: User, chatUID: string) => {
//   const queryChats = await query(
//     collection(db, "chats"),
//     where("users", "array-contains", user.ref),
//     where("chats", "", chatUID)
//   );

//   let chat: Chat = {} as Chat;

//   const querySnapshot = await getDocs(queryChats);
//   querySnapshot.forEach((doc) => {
//     chat = { ...doc.data(), uid: doc.id } as Chat;
//   });
//   return chat;
// };

// export const subscribeOnChat = async (
//   user: User,
//   callback: (chat: Chat) => void,
// ) => {
//   const queryChats = await query(
//     collection(db, "chats"),
//     where("users", "array-contains", user.ref),
//   );

//   onSnapshot(queryChats, (snapshot: any) => {
//     const chats: Chat[] = [];
//     snapshot.forEach((doc: any) => {
//       chats.push({ ...doc.data(), uid: doc.id });
//     });

//     callback(chats);
//   });
// };
