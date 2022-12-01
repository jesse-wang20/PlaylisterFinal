import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

export default function WelcomeScreenBanner() {
    const { auth } = useContext(AuthContext);
    const handleLogin = (event) =>
     {
        console.log("Bruh")

    };
    const handleLogout = (event) =>
        console.log("no")

     const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} ><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose} ><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        console.log("We are logged in")
        menu = loggedInMenu;
    }
    
    let welcome = <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style = {{background: '#f0f0f0'}}>
                <Toolbar>
                    <Typography
                        style = {{fontWeight: 'bold', fontStyle: 'italic', color: '#C71F1F', fontSize:'200%', flex: '1'}}>
                        Playlister
                    </Typography>
                    <Box>
                    <Grid container spacing={3} wrap='nowrap'>
                        <Grid item xs={24}>
                            <Typography style = {{color: 'black', bottom: '0%' , marginTop:'8px'}}>
                                Been here before?
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button component={Link} to="/login" variant='contained' style = {{backgroundColor: '#FFFFFF'}}>
                                <Typography style = {{color: 'black'}}>
                                    Login
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                        {/* <Typography style = {{color: 'black'}}>
                            Been here before?
                        </Typography>
                        <Button variant='contained' style = {{backgroundColor: '#FFFFFF'}}>
                            <Typography style = {{color: 'black'}}>
                                Login
                            </Typography>
                        </Button> */}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    const bruh = <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" style = {{background: '#f0f0f0'}}>
        <Toolbar>
            <Typography
                style = {{fontWeight: 'bold', fontStyle: 'italic', color: '#C71F1F', fontSize:'200%', flex: '1'}}>
                Playlister
            </Typography>
            <IconButton>
                <AccountCircle onClick = {handleProfileMenuOpen} sx = {{color: "gray"}}>
                
                </AccountCircle>
            </IconButton>
            {menu}
        </Toolbar>
    </AppBar>
</Box>
    if(auth.loggedIn){
        welcome = bruh
    }
    return (
        welcome
    );
}