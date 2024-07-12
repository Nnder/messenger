import { Box, Button, TextField } from "@mui/material";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { useUserStore } from "../../5_entities/User/UserStore";
import { updateUser } from "../../5_entities/User/User";
import { IUser } from "../../5_entities/User/User.types";
import once from "../../6_shared/helpers/onceClick";

export const UserSettings = ({ hide }: { hide: () => void }) => {
  const { username, getUser, setUser } = useUserStore();
  const defaultValues = {
    username,
  };

  const { uid, ref } = { ...getUser() };

  const methods = useForm({ defaultValues: defaultValues });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handle = async (data: FieldValues) => {
    if (uid) {
      const params = {
        username: data.username,
      };
      if (ref)
        updateUser(ref, params as Partial<IUser>).then((user) =>
          setUser(user as IUser),
        );
      hide();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
      }}
    >
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
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                variant="filled"
                color={errors.username ? "error" : "secondary"}
                sx={{ width: 1, m: 1 }}
                label="имя пользователя"
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
            onClick={handleSubmit((data) => once(handle)(data))}
          >
            Сохранить
          </Button>
        </div>
      </FormProvider>
    </Box>
  );
};
