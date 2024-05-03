import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

export default function ChatItem({children, href, ...props}: PropsWithChildren<ButtonProps>) {
  return (
    <Button variant="contained" 
    sx={{width: 1, borderRadius: 0}} 
    href={href} 
    {...props}>
      {children}
    </Button>
  )
}
