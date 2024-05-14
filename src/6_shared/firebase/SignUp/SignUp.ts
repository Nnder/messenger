import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

const RegisterUser = (email: string, password: string) => {
  const auth = getAuth();
  const params = {
    createdAt: new Date(),
    lastOnline: new Date(),
    status: "offline",
    username: email,
    email: email,
    provider: "UserWithEmailAndPassword",
  };

  addDoc(collection(db, "users"), params)
    .then(() => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error: any) => {
          toast(error.message);
          console.log(error);
        });
    })
    .catch((error: any) => {
      toast(error.message);
      console.log(error);
    });
};

export default RegisterUser;
