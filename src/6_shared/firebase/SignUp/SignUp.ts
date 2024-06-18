import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import toast from "react-hot-toast";

const RegisterUser = (email: string, password: string) => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      // ...
      return user;
    })
    .then((u) => console.log(u))
    .catch((error: any) => {
      toast(error.message);
      console.log(error);
    });
};

export default RegisterUser;
