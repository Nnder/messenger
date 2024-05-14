import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatItem({
  children,
  href,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(href || "")}
      variant="contained"
      sx={{ width: 1, borderRadius: 0 }}
      {...props}
    >
      {children}
    </Button>
  );
}
