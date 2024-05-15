import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../6_shared/firebase/firebase";
import { AuthProviders, User } from "./User.types";

const createUser = async (params: User) => {
  const user = await addDoc(collection(db, "users"), params);
  params.uid = user.id;
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
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), uid: doc.id });
  });

  console.log("chech", data[0]);

  if (data.length) return data[0];

  const params: User = {
    createdAt: new Date(),
    lastOnline: new Date(),
    status: "offline",
    username: email,
    email: email,
    provider: AuthProvider,
  };

  return await createUser(params);
};
