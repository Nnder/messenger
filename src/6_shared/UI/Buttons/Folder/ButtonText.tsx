import {Button} from "@mui/material";
import { PropsWithChildren } from "react";

export default function ButtonText({children, ...props}: PropsWithChildren) {
  return (
    <Button variant="contained" 
      sx={{minWidth:'100px', 
      borderRadius:0, 
      p:0.5, 
      m:0, 
      lineHeight: 1.3, 
      fontSize: 13, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems:'center', 
      textTransform: 'none'
      }} {...props}>

      {children}
    </Button>
  )
}
