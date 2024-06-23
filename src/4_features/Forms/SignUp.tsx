import RegisterUser from "../../6_shared/firebase/SignUp/SignUp";
import { Box, Button, TextField } from "@mui/material";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";

const defaultValues = {
  created_at: new Date(),
  email: "",
  password: "",
};

export default function SignUpForm() {
  const methods = useForm({ defaultValues: defaultValues });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handle = async (data: FieldValues) => {
    await RegisterUser(data.email, data.password);
  };

  return (
    <Box sx={{ m: 1, width: "1" }}>
      <FormProvider {...methods}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                variant="filled"
                color={errors.email ? "error" : "secondary"}
                sx={{ width: 1, m: 1 }}
                label="Email"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                type="password"
                variant="filled"
                color={errors.email ? "error" : "secondary"}
                sx={{ width: 1, m: 1 }}
                label="Пароль"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <Button
            sx={{ width: 1 }}
            variant="contained"
            onClick={handleSubmit((data) => handle(data))}
          >
            Зарегистрироваться
          </Button>
        </div>
      </FormProvider>
    </Box>
  );
}
