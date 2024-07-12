import { Box, Button } from "@mui/material";
import SignInForm from "../../4_features/Forms/SignIn";
// import { SignInWith } from "../../4_features/SignInwith/SignInWith";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import SignUpForm from "../../4_features/Forms/SignUp";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Sign() {
  const [login, setLogin] = useState<boolean>(true);
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  if (error) toast("Ошибка пользователя");

  if (!loading && user?.email) navigate("/");

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "95%",
          maxWidth: "400px",
        }}
      >
        {login ? <SignInForm /> : <SignUpForm />}
        <Button
          sx={{ width: 1, my: 2 }}
          variant="contained"
          onClick={() => setLogin((prev) => !prev)}
        >
          {login ? "Регистрация" : "Вход"}
        </Button>
        {/* <SignInWith /> */}
      </Box>
    </Box>
  );
}
