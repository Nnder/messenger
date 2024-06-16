import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { IChat } from "./Chat.types";
import { IUser } from "../User/User.types";
import toast from "react-hot-toast";
import { fetchUsers } from "../User/User";

export const createChat = async (params: Partial<IChat>) => {
  return await addDoc(collection(db, "chats"), params);
};

export const fetchChats = async (user: IUser) => {
  const queryChats = await query(
    collection(db, "chats"),
    where("users", "array-contains", user.ref),
    orderBy("updatedAt", "desc"),
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
    orderBy("updatedAt", "desc"),
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
      const data = await docSnap.data();
      const chatUsers = await fetchUsers(data.users);
      chat = { ...data, uid: docSnap.id, users: chatUsers } as IChat;
    } else {
      toast("Чат не найден");
    }
  } catch (e) {
    toast("Ошибка при получении чата");
  }

  console.log("chatusers", chat);

  return chat;
};

export const subscribeOnChat = async (
  chatUID: string,
  callback: (chat: IChat) => void,
) => {
  const docRef = doc(db, "chats", chatUID);

  const unsub = onSnapshot(docRef, async (snapshot: any) => {
    const data = await snapshot.data();
    const chatUsers = await fetchUsers(data.users);
    let chat: IChat = { ...data, uid: snapshot.id, users: chatUsers };
    callback(chat);
  });

  return unsub;
};

export const updateChat = async (
  chatUID: string,
  params: Partial<IChat<Date>>,
) => {
  const docRef = doc(db, "chats", chatUID);

  let chat: IChat = {} as IChat;

  try {
    await setDoc(docRef, { ...params }, { merge: true });
    chat = (await getDoc(docRef)).data() as IChat;
  } catch (e) {
    toast("Ошибка при обновлении чата");
  }

  return chat;
};
