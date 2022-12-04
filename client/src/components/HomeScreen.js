import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal.js'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import YoutubePlayerWrapper from './YoutubePlayerWrapper.js'
import { IconButton } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        console.log("EDIT OPEN")
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ left: '5%' , top: "7%", bgcolor: 'background.paper' }}>
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
        <Grid container sx={{ height: '100vh', backgroundColor: '#C0C0C0', overflowY: "scroll"}}>
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Player" {...a11yProps(0)} />
                <Tab label="Comments" {...a11yProps(1)} />
            </Tabs>
            </Box>
                <TabPanel value={value} index={0}>
                    <YoutubePlayerWrapper />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Comments
                </TabPanel>

                
            </Grid>
            <Box sx={{display: 'flex', position: 'absolute',alignItems:'center', left:"40%", bottom: '-20%', flexDirection: 'row', justifyContent:'center', textAlign:"center"}}>
                <Typography sx={{fontSize : '32px'}} >
                    <IconButton >
                        <AddIcon sx = {{color: 'black', fontSize: '64px'}}/>
                    </IconButton>
                    Your Lists
                </Typography>
            </Box>
            {modalJSX}
        </Grid>
    )
}

export default HomeScreen;