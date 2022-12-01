import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'


import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppBanner() {
    const handleLogin = (event) =>
     {
        console.log("Bruh")

    };
    const welcome = <Box sx={{ flexGrow: 1 }}>
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
            <AccountCircle sx = {{color: "gray"}}>
                
            </AccountCircle>
        </Toolbar>
    </AppBar>
</Box>
    return (
        welcome
    );
}