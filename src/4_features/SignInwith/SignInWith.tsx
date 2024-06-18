import { Box, Button } from "@mui/material";
import signInWithGoogle from "../../6_shared/firebase/SignInWith/SignInWithGoogle";

export const SignInWith = () => {
  // const handleGoogle = async () => await signInWithGoogle();
  return (
    <Box sx={{ width: 1, mt: 2 }}>
      <Button variant="contained" sx={{ width: 1 }} onClick={signInWithGoogle}>
        Войти через google
      </Button>
    </Box>
  );
};
