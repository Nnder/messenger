import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { AuthProviders, IUser } from "./User.types";
import toast from "react-hot-toast";

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

  const data: any = [];

  const querySnapshot = await getDocs(queryUser);
  querySnapshot.forEach((document) => {
    const ref = doc(db, "users", document.id);
    data.push({ ...document.data(), uid: document.id, ref: ref });
  });

  if (data.length) return data[0];

  const params: IUser = {
    createdAt: new Date(),
    lastOnline: new Date(),
    status: "offline",
    username: email,
    email: email,
    provider: AuthProvider,
  };

  return await createUser(params);
};

export const fetchUser = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const user = (await getDoc(userRef)).data();
  return { ...user, uid };
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
