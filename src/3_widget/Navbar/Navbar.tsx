import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    // <div>
    //     <div>
    //         <Link to={'/'}>Главная</Link>
    //     </div>
    //     <div>
    //         <Link to={'/friends'}>Друзья</Link>
    //     </div>
    //     <div>
    //         <Link to={'/chats'}>Чаты</Link>
    //     </div>
    //     <div>
    //         <Link to={'/settings'}>Настройки</Link>
    //     </div>
    // </div>
  )
}
