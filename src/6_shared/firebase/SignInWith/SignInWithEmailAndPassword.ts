import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

const SignInWithData = (email: string, password: string) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      toast(error.message);
      console.log(error);
    });
};

export default SignInWithData;
