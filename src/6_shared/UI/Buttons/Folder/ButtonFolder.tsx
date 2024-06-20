import { Folder } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

export default function ButtonFolder({
  children,
  background,
  ...props
}: PropsWithChildren<ButtonProps & { background: string }>) {
  return (
    <Button
      variant="contained"
      sx={{
        p: 0,
        py: 1,
        m: 0,
        width: 1,
        fontSize: { md: 10, lg: 11, xl: 12 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        textTransform: "none",
        background: background,
      }}
      {...props}
    >
      <Folder />
      {children}
    </Button>
  );
}
