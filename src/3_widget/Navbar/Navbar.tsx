import {Box, Button, IconButton, Input, Modal} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Folder} from '@mui/icons-material';
import { useState } from "react";
// import { useTheme } from "@emotion/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const theme = useTheme();

  return (
    <Box sx={{width: {xs: "100vw", sm: "30vw"}, maxWidth: {xs:'100vw',md: '300px'}, background: 'black', height: "100vh", display: 'grid', gridTemplateRows: '56px 1fr', position:{xs: 'absolute', sm:'initial'}}}>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{width:{xs:'60vw', sm:'35vw'}, height:'100vh', background:' black', p:4}}>
          <Box>
            Modal
          </Box>
          
        </Box>
      </Modal>

      <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
        <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ m: 0.5, width: "20%"}}
                onClick={handleOpen}
              >
          <MenuIcon />
        </IconButton>
        <Input placeholder="Поиск" sx={{color: '#fff', mr: 1, width: "70%"}}/>
        
      </Box>
      <Box sx={{background: '#201E1F', display: {sm:'block', md:'flex'}, height: 'calc(100vh - 56px)'}}>
        <Box sx={{display: {xs:'none', sm: 'none', md:'block'}, width: '25%', background: '#201E1F', borderRight: '1px solid #353535', height: 'calc(100vh - 56px)', overflow: 'auto'}}>
          <Button variant="contained" 
          sx={{p: 0, py:1, m:0, width:1, fontSize: 13, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textAlign: 'center', textTransform: 'none'}}>
            <Folder/>
            Все чаты
          </Button>

          <Button variant="contained" 
          sx={{p: 0, pt:1, m:0, width:1, fontSize: 13, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textAlign: 'center', textTransform: 'none'}}>
            <Folder/>
            Личное
          </Button>
        </Box>

        <Box sx={{display: {xs:'flex' ,sm:'flex', md:'none'},  width: {xs:'100vw',sm:'30vw'}, background: '#201E1F', height: '56px', overflow: 'auto'}}>
          <Button variant="contained" 
          sx={{minWidth:'100px', borderRadius:0, p:0.5, m:0, lineHeight: 1.3, fontSize: 13, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textTransform: 'none'}}>
            Все чаты
          </Button>

          <Button variant="contained" 
          sx={{minWidth:'100px', borderRadius:0, p:0.5, m:0, fontSize: 13, lineHeight: 1.3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textTransform: 'none'}}>
            Личноеwdawd
          </Button>

          <Button variant="contained" 
          sx={{minWidth:'100px', borderRadius:0,  p:0.5, m:0, fontSize: 13, lineHeight: 1.3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textTransform: 'none'}}>
            Личное
          </Button>
          <Button variant="contained" 
          sx={{minWidth:'100px', borderRadius:0, p:0.5, m:0, fontSize: 13, lineHeight: 1.3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textTransform: 'none'}}>
            Личное
          </Button>
          <Button variant="contained" 
          sx={{minWidth:'100px', borderRadius:0, p:0.5, m:0, fontSize: 13, lineHeight: 1.3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textTransform: 'none'}}>
            Личное
          </Button>
          <Button variant="contained" 
          sx={{minWidth:'100px', borderRadius:0, p:0.5, m:0, fontSize: 13, lineHeight: 1.3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textTransform: 'none'}}>
            Личное
          </Button>
          <Button variant="contained" 
          sx={{minWidth:'100px', borderRadius:0, p:0.5, m:0, fontSize: 13, lineHeight: 1.3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textTransform: 'none'}}>
            Личное
          </Button>
          <Button variant="contained" 
          sx={{minWidth:'100px', borderRadius:0, p:0.5, m:0, fontSize: 13, lineHeight: 1.3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textTransform: 'none'}}>
            Личное
          </Button>
          <Button variant="contained" 
          sx={{minWidth:'100px', borderRadius:0, p:0.5, m:0, fontSize: 13, lineHeight: 1.3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textTransform: 'none'}}>
            Личное
          </Button>
          <Button variant="contained" 
          sx={{minWidth:'100px', borderRadius:0, p:0.5, m:0, fontSize: 13, lineHeight: 1.3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', textTransform: 'none'}}>
            Личное
          </Button>
        </Box>
        <Box sx={{width: {sm: '100%', md:'75%'}, height: {xs:'calc(100vh - 112px)', sm:'calc(100vh - 112px)', md:'calc(100vh - 56px)'}, overflow: 'auto'}}>
          <Button variant="contained" sx={{width: 1, borderRadius: 0, textAlign: 'start'}} href="/">
            1
          </Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/friends">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/chats">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/settings">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/friends">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/chats">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/settings">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/friends">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/chats">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/settings">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/friends">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/chats">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/settings">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/friends">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/chats">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/settings">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/friends">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/chats">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/settings">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/friends">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/chats">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/settings">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/friends">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/chats">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/settings">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/friends">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/chats">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/settings">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/friends">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/chats">1</Button>
          <Button variant="contained" sx={{width: 1, borderRadius: 0}} href="/settings">1</Button>
        </Box>
      </Box>
    </Box>
  )
}
