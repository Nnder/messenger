import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { AuthProviders, IUser } from "./User.types";
import toast from "react-hot-toast";
import { createChat } from "../Chat/Chat";
import { IChat } from "../Chat/Chat.types";

const createUser = async (params: IUser) => {
  const user = await addDoc(collection(db, "users"), params);
  params.uid = user.id;
  params.ref = doc(db, "users", user.id);
  return params;
};

export const fetchCurrentUser = async (
  email: string,
  AuthProvider: AuthProviders,
) => {
  const queryUser = await query(
    collection(db, "users"),
    where("email", "==", email),
    where("provider", "==", AuthProvider),
  );

  const data: any[] = [];

  const querySnapshot = await getDocs(queryUser);

  await Promise.all(
    querySnapshot.docs.map(async (document) => {
      const ref = doc(db, "users", document.id);
      const user = document.data();

      const friends: IUser[] = [];

      // Изменения для получения данных о друзьях
      await Promise.all(
        user.friends.map(
          async (friend: DocumentReference<DocumentData, DocumentData>) => {
            const friendData = (await getDoc(friend)).data();
            if (friendData)
              friends.push({
                ...friendData,
                ref: friend,
                uid: friend.id,
              } as IUser);
          },
        ),
      );

      console.log("friends", friends);

      data.push({ ...user, uid: document.id, ref: ref, friends });
    }),
  );

  if (data.length) return data[0];

  const params: IUser = {
    createdAt: new Date(),
    lastOnline: new Date(),
    status: "offline",
    username: email,
    email: email,
    provider: AuthProvider,
    friends: [],
  };

  return await createUser(params);
};

export const fetchUser = async (uid: string): Promise<IUser> => {
  const userRef = doc(db, "users", uid);
  const user = (await getDoc(userRef)).data();
  return { ...user, uid } as IUser;
};

export const fetchUsers = async (
  users: DocumentReference<DocumentData, DocumentData>[],
) => {
  const data: IUser[] = [];
  await Promise.all(
    users.map(async (user: DocumentReference<DocumentData, DocumentData>) => {
      const userData = (await getDoc(user)).data();
      if (userData) data.push({ ...userData, ref: user } as IUser);
    }),
  );
  return data;
};

export const updateUser = async (uid: string, params: Partial<IUser>) => {
  const docRef = doc(db, "users", uid);

  let user: Partial<IUser> = {};

  try {
    await setDoc(docRef, { ...params }, { merge: true });
    user = (await getDoc(docRef)).data() as IUser;
  } catch (e) {
    toast("Ошибка при обновлении данных");
  }

  console.log("update", user);
  return user;
};

export const addToFriend = async (
  userRef: DocumentReference<DocumentData, DocumentData>,
  friendRef: DocumentReference<DocumentData, DocumentData>,
) => {
  const user = (await getDoc(userRef)).data() as IUser;
  const friend = (await getDoc(friendRef)).data() as IUser;
  try {
    await setDoc(
      userRef,
      { ...user, friends: [...user.friends, friendRef] },
      { merge: true },
    );
    await setDoc(
      friendRef,
      { ...friend, friends: [...friend.friends, userRef] },
      { merge: true },
    );
    toast("Новый контакт");
  } catch (e) {
    toast("Ошибка при обновлении данных");
  }

  const chatParams: Partial<IChat<Date>> = {
    createdAt: new Date(),
    lastMessage: "",
    type: "personal",
    name: "personal",
    updatedAt: new Date(),
    //@ts-ignore
    users: [userRef, friendRef],
  };
  createChat(chatParams);
  return user;
};

export const addToFriendUID = async (userUid: string, friendUid: string) => {
  const userRef = doc(db, "users", userUid);
  const friendRef = doc(db, "users", friendUid);
  const user = (await getDoc(userRef)).data() as IUser;
  const friend = (await getDoc(friendRef)).data() as IUser;
  try {
    await setDoc(
      userRef,
      { ...user, friends: [...user.friends, friendRef] },
      { merge: true },
    );
    await setDoc(
      friendRef,
      { ...friend, friends: [...friend.friends, userRef] },
      { merge: true },
    );
    toast("Новый контакт");
  } catch (e) {
    toast("Ошибка при обновлении данных");
  }

  const chatParams: Partial<IChat<Date>> = {
    createdAt: new Date(),
    lastMessage: "",
    type: "personal",
    name: "personal",
    updatedAt: new Date(),
    //@ts-ignore
    users: [userRef, friendRef],
  };
  createChat(chatParams);
  return user;
};
