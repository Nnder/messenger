import signInWithGoogle from "../../6_shared/firebase/SignInWith/SignInWithGoogle";

export default function SignIn() {
  return (
    <div>
      <form>
        <input type="text" />
        <input type="text" />
        <button>Войти</button>
      </form>

      <div>
        <button onClick={signInWithGoogle}>Войти через google</button>
      </div>
    </div>
  );
}
