import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal.js'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import YoutubePlayer from './YoutubePlayer.js'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '40%', left: '5%' , top: "7%", bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <Grid container sx={{ height: '100vh', backgroundColor: '#C0C0C0',}}>
            <Grid item 
                xs={12}
                sm={4}
                md={6.5} sx={{top:"100px"}}>
                
                <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={5.5} sx = {{backgroundColor: '#C0C0C0'}}>
                <YoutubePlayer />
            </Grid>
        </Grid>
    )
}

export default HomeScreen;