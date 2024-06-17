import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { IUser } from "../User/User.types";
import { IChat } from "../Chat/Chat.types";

export const fetchBySearch = async (searchByName: string) => {
  const queryChats = await query(
    collection(db, "chats"),
    where("type", "==", "chat"),
    where("name", ">=", searchByName.toUpperCase()),
    where("name", "<=", searchByName.toLowerCase() + "\uf8ff"),
  );

  const queryUsers = await query(
    collection(db, "users"),
    where("username", ">=", searchByName.toUpperCase()),
    where("username", "<=", searchByName.toLowerCase() + "\uf8ff"),
  );

  const chats: IChat[] = [];
  const users: IUser[] = [];

  const querySnapshot = await getDocs(queryChats);
  querySnapshot.forEach((doc) => {
    chats.push({ ...doc.data(), uid: doc.id, ref: doc.ref } as IChat);
  });

  const querySnapshotUsers = await getDocs(queryUsers);
  querySnapshotUsers.forEach((doc) => {
    users.push({ ...doc.data(), uid: doc.id, ref: doc.ref } as IUser);
  });

  return { chats, users };
};
