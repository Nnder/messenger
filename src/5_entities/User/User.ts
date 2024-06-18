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
  onSnapshot,
  DocumentSnapshot,
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

      data.push({
        ...user,
        uid: document.id,
        ref: ref,
        friends,
        friendCount: user.friendCount,
      });
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
    friendCount: 0,
  };

  return await createUser(params);
};

export const subscribeOnUser = async (
  uid: string,
  callback: (user: IUser) => void,
) => {
  const docRef = doc(db, "users", uid);

  const unsub = onSnapshot(
    docRef,
    async (snapshot: DocumentSnapshot<DocumentData>) => {
      const data = await snapshot.data();

      const friends: IUser[] = [];

      // Изменения для получения данных о друзьях
      await Promise.all(
        data?.friends.map(
          async (friendRef: DocumentReference<DocumentData>) => {
            const friendSnapshot = await getDoc(friendRef);
            const friendData = friendSnapshot.data();
            if (friendData) {
              friends.push({
                ...friendData,
                ref: friendRef,
                uid: friendSnapshot.id,
              } as IUser);
            }
          },
        ),
      );

      let readyUser: IUser = {
        ...(data as IUser),
        uid: snapshot.id,
        ref: docRef,
        friends,
      };
      console.log(readyUser);
      callback(readyUser);
    },
  );

  return unsub;
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

export const updateUser = async (
  docRef: DocumentReference<DocumentData, DocumentData>,
  params: Partial<IUser>,
) => {
  let user: IUser = (await getDoc(docRef)).data() as IUser;

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
      {
        ...user,
        friends: [...user.friends, friendRef],
        friendCount: user.friendCount + 1,
      },
      { merge: true },
    );
    await setDoc(
      friendRef,
      {
        ...friend,
        friends: [...friend.friends, userRef],
        friendCount: friend.friendCount + 1,
      },
      { merge: true },
    );
    toast("Новый контакт");
  } catch (e) {
    toast("Ошибка при обновлении данных");
  }

  const chatParams: Partial<IChat<Date>> = {
    createdAt: new Date(),
    lastMessage: "Чат Создан",
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
