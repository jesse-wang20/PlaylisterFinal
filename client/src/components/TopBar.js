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
import { GlobalStoreContext } from '../store'

export default function TopBar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const [text, setText] = useState ("")
    const isMenuOpen = Boolean(anchorEl);

    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.searchFunction(text)
        }
    }
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleSortName = ()=>{
        handleMenuClose()
        store.nameSort()
    }
    const handleDate = ()=>{
        handleMenuClose()
        store.dateSort()
    }
    const handleViews = ()=>{
        handleMenuClose()
        store.listensSort()
    }
    const handleLS = ()=>{
        handleMenuClose()
        store.likesSort()
    }
    const handleDS = ()=>{
        handleMenuClose()
        store.dislikesSort()
    }
    const handleHome = (event) =>
     {
        store.loadIdNamePairs()
    };
    const handleAll = (event) =>
     {
        store.loadAllPlaylists(1)
    };
    const handleUsers = (event) =>
     {
        store.loadAllPlaylists(2)
    };
    const menuId = 'primary-search-account-menu';
    if (auth.loggedIn){
        return <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style = {{background: '#C0C0C0'}}>
            <Toolbar>
                <IconButton>
                    <HomeIcon onClick = {handleHome} sx = {{fontSize: "48px"}}/>
                </IconButton>
                <IconButton>
                    <GroupsIcon onClick = {handleAll} sx = {{fontSize: "48px"}}/>
                </IconButton>
                <IconButton>
                    <PersonIcon onClick = {handleUsers} sx = {{fontSize: "48px"}}/>
                </IconButton>
                <Grid container spacing={3} wrap='nowrap'>
                    <Grid item xs={24}>
                        <TextField
                            onKeyPress={handleKeyPress}
                            onChange={handleUpdateText} value = {text}
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
                    <MenuItem onClick={handleSortName} >Name (A-Z)</MenuItem>
                    <MenuItem onClick={handleDate} >Publish Date (Newest)</MenuItem>
                    <MenuItem onClick={handleViews} >Listens (High - Low)</MenuItem>
                    <MenuItem onClick={handleLS} >Likes (High - Low)</MenuItem>
                    <MenuItem onClick={handleDS} >Dislikes (High - Low)</MenuItem>
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