import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

export default function ButtonText({
  children,
  background,
  ...props
}: PropsWithChildren<ButtonProps & { background: string }>) {
  return (
    <Button
      variant="contained"
      sx={{
        minWidth: "100px",
        borderRadius: 0,
        p: 0.5,
        m: 0,
        lineHeight: 1.3,
        fontSize: 13,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "none",
        background: background,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
