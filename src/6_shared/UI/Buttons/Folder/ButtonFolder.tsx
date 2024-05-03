import { Folder } from "@mui/icons-material";
import { Button } from "@mui/material";
import { PropsWithChildren } from "react";

export default function ButtonFolder({
  children,
  ...props
}: PropsWithChildren) {
  return (
    <Button
      variant="contained"
      sx={{
        p: 0,
        py: 1,
        m: 0,
        width: 1,
        fontSize: 13,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        textTransform: "none",
      }}
      {...props}
    >
      <Folder />
      {children}
    </Button>
  );
}
