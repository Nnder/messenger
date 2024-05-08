import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const logout = () => {
  signOut(auth);
};

export default logout;
