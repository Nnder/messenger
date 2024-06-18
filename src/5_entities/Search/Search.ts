import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { IUser } from "../User/User.types";
import { IChat } from "../Chat/Chat.types";

export const fetchBySearch = async (searchByName: string, user: IUser) => {
  const queryChats = await query(
    collection(db, "chats"),
    where("type", "==", "chat"),
    where("name", ">=", searchByName.toUpperCase()),
    where("name", "<=", searchByName.toLowerCase() + "\uf8ff"),
    where("owner", "!=", user?.ref),
  );

  const queryUsers = await query(
    collection(db, "users"),
    where("username", ">=", searchByName.toUpperCase()),
    where("username", "<=", searchByName.toLowerCase() + "\uf8ff"),
    where("email", "!=", user.email),
  );

  let chats: IChat[] = [];
  let users: IUser[] = [];

  const querySnapshot = await getDocs(queryChats);
  querySnapshot.forEach((doc) => {
    chats.push({ ...doc.data(), uid: doc.id, ref: doc.ref } as IChat);
  });

  const querySnapshotUsers = await getDocs(queryUsers);
  querySnapshotUsers.forEach((doc) => {
    users.push({ ...doc.data(), uid: doc.id, ref: doc.ref } as IUser);
  });

  chats = chats.filter((chat: IChat) => {
    const name = chat.name.toLowerCase();
    return name.includes(searchByName.toLowerCase());
  });

  users = users.filter((user: IUser) => {
    const name = user.username.toLowerCase();
    return name.includes(searchByName.toLowerCase());
  });

  return { chats, users };
};
