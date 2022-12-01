import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import { IconButton, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

export default function TopBar() {
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogin = (event) =>
     {
        console.log("Bruh")

    };
    const menuId = 'primary-search-account-menu';
    if (auth.loggedIn){
        return <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style = {{background: '#C0C0C0'}}>
            <Toolbar>
                <IconButton>
                    <HomeIcon sx = {{fontSize: "48px"}}/>
                </IconButton>
                <IconButton>
                    <GroupsIcon sx = {{fontSize: "48px"}}/>
                </IconButton>
                <IconButton>
                    <PersonIcon sx = {{fontSize: "48px"}}/>
                </IconButton>
                <Grid container spacing={3} wrap='nowrap'>
                    <Grid item xs={24}>
                        <TextField
                            required
                            fullWidth
                            name="search"
                            label="search"
                            type="search"
                            id="search"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx = {{position: 'relative', top: "25%"}}>
                            <Typography sx = {{color: 'black', fontSize: '20PX',fontWeight: 'bold'}}>
                                SORT BY   
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <IconButton onClick={handleProfileMenuOpen}>
                    <SortIcon sx = {{fontSize: "48px"}}/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    id={menuId}
                    keepMounted
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose} ><Link to='/login/'>Name (A-Z)</Link></MenuItem>
                    <MenuItem onClick={handleMenuClose} ><Link to='/register/'>Publish Date (Newest)</Link></MenuItem>
                    <MenuItem onClick={handleMenuClose} ><Link to='/register/'>Listens (High - Low)</Link></MenuItem>
                    <MenuItem onClick={handleMenuClose} ><Link to='/register/'>Likes (High - Low)</Link></MenuItem>
                    <MenuItem onClick={handleMenuClose} ><Link to='/register/'>Dislikes (High - Low)</Link></MenuItem>
                </Menu>
                    {/* <Typography style = {{color: 'black'}}>
                        Been here before?
                    </Typography>
                    <Button variant='contained' style = {{backgroundColor: '#FFFFFF'}}>
                        <Typography style = {{color: 'black'}}>
                            Login
                        </Typography>
                    </Button> */}
            </Toolbar>
        </AppBar>
    </Box>
        }
    return null ;
}