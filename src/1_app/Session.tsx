import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../6_shared/firebase/firebase";
import { PropsWithChildren } from "react";

export default function Session({ children, ...props }: PropsWithChildren) {
  const [user, loading, error] = useAuthState(auth);

  // if(!user && !loading){
  //   console.log('please auth')
  // }

  console.log(!!user);

  return <>{children}</>;
}
