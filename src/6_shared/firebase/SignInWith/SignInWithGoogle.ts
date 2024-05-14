import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential);
      // const token = credential?.accessToken || "";
      // const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      toast("Ошибка при попытке войти через Google");
      toast(`${errorMessage} Код ошибки:${errorCode}`);
    });
};

export default signInWithGoogle;
