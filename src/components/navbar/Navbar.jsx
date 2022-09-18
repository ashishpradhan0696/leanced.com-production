import React from 'react'
import AuthModal from '../Authentication/AuthModal'
import UserProfile from '../userProfile/UserProfile'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom";


export default function Navbar({user,watchlist}) {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


 const navigate=useNavigate();


  return (
    <>
    <AppBar position="fixed" sx={{backgroundColor:'#404040',backdropFilter:"blur(20px)"}}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 900,
              fontSize:"30px",
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
           onClick={()=>navigate("/home")}>
            LEANCED
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'},
              }}
            >
             
              <MenuItem onClick={()=>navigate("/home")}>
                  <Typography textAlign="center">HOME</Typography>
                </MenuItem>
                <MenuItem onClick={()=>navigate("/faq")}>
                  <Typography textAlign="center">FAQ</Typography>
                </MenuItem>
                <MenuItem onClick={()=>navigate("/about")}>
                  <Typography textAlign="center">ABOUT</Typography>
                </MenuItem>
                <MenuItem onClick={()=>navigate("/contact")}>
                  <Typography textAlign="center">CONTACT</Typography>
                </MenuItem>
            </Menu>
          </Box>
          
          <Typography className="leancedMobile"
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: -3,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
           onClick={()=>navigate("/home")}>
            LEANCED
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={()=>navigate("/home")}
                sx={{ my: 2, display: 'block',color:"whitesmoke", ':hover' :{backgroundColor:"white" , color:"black"}  }}
              >
                HOME
              </Button>

              <Button
                onClick={()=>navigate("/faq")}
                sx={{ my: 2, display: 'block' , color:"whitesmoke", ':hover' :{backgroundColor:"white" , color:"black"}}}
              >
                FAQ
              </Button>

              <Button
                onClick={()=>navigate("/about")}
                sx={{ my: 2, display: 'block' , color:"whitesmoke",':hover' :{backgroundColor:"white" , color:"black"} }}
              >
                ABOUT
              </Button>

              <Button
                onClick={()=>navigate("/contact")}
                sx={{ my: 2, display: 'block' , color:"whitesmoke",':hover' :{backgroundColor:"white", color:"black"}}}
               >
                CONTACT
              </Button>



          </Box>

          <Box sx={{ flexGrow: 0 }}>
        
              <div className="loginContainer">
                    {user ? <UserProfile user={user} watchlist={watchlist} /> : <AuthModal/>}
              </div>
           
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}
