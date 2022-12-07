
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import StarBorder from '@mui/icons-material/StarBorder';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import {
    WelcomeScreenBanner,
} from './'

export default function WelcomeScreen() {

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item xs={false} 
                sx = {{
                    backgroundColor: '#C0C0C0'
                }}
                sm={12}
                md={12}>
                <Box sx = {{textAlign:'center'}}>
                    <Typography sx ={{
                        display: "inline",
                        fontWeight: 'bold', color: 'white', fontSize:'400%', flex: '1'
                    }}>
                        Welcome to&nbsp; 
                    </Typography>
                    <Typography sx ={{
                        display: "inline",
                        fontWeight: 'bold', fontStyle: 'italic', color: '#C71F1F', fontSize:'400%', flex: '1',
                        
                    }}>
                        Playlister
                    </Typography>
                </Box>
            </Grid>
            <CssBaseline />
            <Grid
                item 
                xs={false}
                sm={4}
                md={6}
                sx={{
                    backgroundImage: 'url(https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <Grid item xs={12} sm={8} md={6} component={Paper} sx = {{backgroundColor: '#C0C0C0'}}>
            
                <Box
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        width: 500,
                        height: 300,
                        mx: 'auto',
                        border: '2px solid #A9A9A9',
                        my: 8,
                        backgroundColor: 'white'
                    }}
                >
                    <Typography align = 'center' sx={{
                        fontSize: '30px',
                        marginTop: '50px',
                        marginLeft: '10px',
                        marginRight: '10px'
                    }}>
                        Manage your playlists like never before, connect with thousands of other users and flex your curations skills. Join FREE today! 
                    </Typography>
                </Box>
                <Grid container spacing = {2}>
                    <Grid item xs={4}>
                        <Box justifyContent="center"
                        alignItems="center"
                        sx={{
                            width: '50%',
                            height: "70%",
                            mx: '75%',
                            my: "5%",
                        }}>
                            <Typography sx={{textAlign: "center", fontSize: "20px", fontStyle: 'italic'}}>Let's get started</Typography>
                            <Button component={Link} to="/register" href="/register" variant='contained' style = {{backgroundColor: '#FFFFFF', top:"10px"}}>
                                <Typography style = {{color: 'black'}}>
                                    Create Account
                                </Typography>
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs = {4}>
                        <Box justifyContent="center"
                        alignItems="center"
                        sx={{
                            width: '80%',
                            height: "70%",
                            mx: '75%',
                            my: "5%",
                        }}>
                            <Typography sx={{textAlign: "center", fontSize: "20px", fontStyle: 'italic'}}>Just want to browse?</Typography>
                            <Button variant='contained' style = {{backgroundColor: '#FFFFFF', top:"10px"}}>
                                <Typography style = {{color: 'black'}}>
                                    Continue as guest
                                </Typography>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx = {{alignContent: 'center', top: "6rem",
                            textAlign: 'center',
                            left: "12rem"}}>
                    <Typography sx={{
                            fontSize: "1.5rem",
                            textAlign: 'center',
                            fontStyle: 'italic',
                            my: "50px"
                        }}>
                        "Simply revolutionary..."
                    </Typography>
                    <Typography sx={{
                            fontSize: "1.25rem",
                            textAlign: 'center',
                            fontStyle: 'italic',
                            my: "-40px"
                        }}>
                        - New York Times
                    </Typography>
                    <Rating
                        name="text-feedback"
                        value={5}
                        readOnly
                        size = {'large'}
                        sx={{
                            fontSize: "4rem",
                            my: "40px",
                            textAlign: 'center',

                        }}
                        emptyIcon={<StarBorder style={{ opacity: 0.55 }} fontSize= "25px" />}
                    />
                </Box>

            </Grid>
        </Grid>
    );
}