import { Box, Typography } from "@mui/material";
import { IMessage } from "../../5_entities/Message/Message";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { IUser } from "../../5_entities/User/User.types";

export const Message = ({
  message,
  content,
}: {
  message: IMessage<IUser, DocumentReference<DocumentData, DocumentData>>;
  content: string;
}) => {
  return (
    <Box
      key={message.uid}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: content,
      }}
    >
      <Box
        sx={{
          backgroundColor: "gray",
          borderRadius: 1,
          p: 0.5,
          m: 0.5,
        }}
      >
        <Typography>{message.owner.username || "-"}</Typography>
        <Typography>{message.text}</Typography>
      </Box>
    </Box>
  );
};
