import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { AuthProviders, IUser } from "./User.types";

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
