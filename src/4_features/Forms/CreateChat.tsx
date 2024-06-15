import { Box, Button, TextField } from "@mui/material";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { createChat } from "../../5_entities/Chat/Chat";
import { doc } from "firebase/firestore";
import { useUserStore } from "../../5_entities/User/UserStore";
import { db } from "../../6_shared/firebase/firebase";

const defaultValues = {
  createdAt: new Date(),
  name: "",
  updatedAt: new Date(),
  lastMessage: "Чат создан",
  users: [],
};

export const ChatForm = ({ hide }: { hide: () => void }) => {
  const methods = useForm({ defaultValues: defaultValues });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { uid } = useUserStore();

  const handle = async (data: FieldValues) => {
    // @ts-ignore
    const docRef = doc(db, "users", uid);
    data.users.push(docRef);
    createChat(data);
    hide();
  };

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        maxWidth: 560,
        maxHeight: 560,
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
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                variant="filled"
                color={errors.name ? "error" : "secondary"}
                sx={{ width: 1, m: 1 }}
                label="Название чата"
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
            Создать чат
          </Button>
        </div>
      </FormProvider>
    </Box>
  );
};
