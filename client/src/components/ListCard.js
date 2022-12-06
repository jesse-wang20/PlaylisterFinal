import { useContext, useState, useEffect} from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SongCard from './SongCard';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    // const [likes, setLikes] = useState(0)
    const { idNamePair, selected } = props;

    const [open, setOpen] = React.useState(false);
    console.log(idNamePair)
    let likes = idNamePair.likes
    let Dislikes = idNamePair.dislikes
    let views = idNamePair.views
    let date = idNamePair.publishedDate.substring(0,10)
    console.log("HERE", likes)
    const handleCloseClick = (event) => {
      setOpen(!open);
    }
    const handleAddSong = (event) => {
        store.addNewSong()
    }
    const handleDuplicate = (event,id) => {
        console.log("HIT DUPLICATE")
        store.handleDuplicate(id)
    }
    const handleClick = (event,id) => {
        setOpen(!open);
        store.handleView(idNamePair._id)
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    };
    const handleDbl = (event) => {
        setEditActive(!editActive)
    }
    const handleLike = (event) => {
        store.handleLike(idNamePair._id)
    }
    const handleDislike = () => {
        store.handleDislike(idNamePair._id)
    }
    const handleUndo = () => {
        store.undo()
    }
    const handleRedo = () => {
        store.redo()
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        let _id = event.target.id;
        console.log("IDA", id)
        _id = ("" + _id).substring("delete-list-".length);
        console.log(id)
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let songCard = null
    if(store.currentList){
      songCard = <Box sx = {{marginRight:"10%", marginLeft:"10%"}}>
        <List 
      id="playlist-cards" 
      sx={{ width: '100%', bgcolor: 'navy' }}
  >
      {
          store.currentList.songs.map((song, index) => (
              <SongCard
                  id={'playlist-song-' + (index)}
                  key={'playlist-song-' + (index)}
                  index={index}
                  song={song}
              />
          ))  
      }
      <div>
            <b
                style= {{color :'yellow'}}
                className="song-link">
                Add Song
            </b>

                <IconButton display="flex"
                >
                    <AddIcon type="button"
                    onClick={handleAddSong}
                    sx = {{marginRight:"10%", color: "white"}}></AddIcon>
                </IconButton>

        </div>
   </List> </Box>  
    }
    let color = "background.paper"
    if(open){
        color = "#d69a29"
    }
    console.log("LIKES IS", likes)
    let test = ""
    test = 
    <List
      id={idNamePair._id}
      sx={{ width: "100%", bgcolor: color}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
  >
    <ListItemButton onDoubleClick={handleDbl}>
      <ListItemText primary={idNamePair.name} secondary = "By Jesse"  />
       <Typography>
         Published: {date} &nbsp;&nbsp; views: {views}  &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       </Typography>

      <ThumbUpIcon onClick = {handleLike}/> 
      <Typography>
       &nbsp;&nbsp; {likes}  &nbsp;&nbsp;
      </Typography>
      <ThumbDownIcon onClick = {handleDislike}/>
      <Typography>
        &nbsp;&nbsp; {Dislikes} &nbsp;&nbsp;
      </Typography>
      {open ? <ExpandLess onClick = {handleCloseClick} /> : <ExpandMore onClick={(event) => {
                handleClick(event, idNamePair._id)
            }}/>}
    </ListItemButton>
    
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <Box>
          {songCard}           
         </Box>
      </List>
      <Button variant = "contained" onClick = {handleUndo} sx = {{color: "black", background: "lightgray"}}>
        Undo
      </Button>
      <Button variant = "contained"  onClick = {handleRedo} sx = {{color: "black", background: "lightgray"}}>
        Redo
      </Button>
      <Button variant = "contained" sx = {{color: "black", background: "lightgray"}}>
        Publish
      </Button>
      <Button id={idNamePair._id} variant = "contained" onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)}} sx = {{color: "black", background: "lightgray", float: "right"}}>
          Delete
      </Button>
      <Button variant = "contained" onClick={(event) => {
                        handleDuplicate(event, idNamePair._id)}} sx = {{color: "black", background: "lightgray", float: "right"}}>
        Duplicate
      </Button>
    </Collapse>
  </List>
    

    if (editActive) {
        test =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        test 
    );
}

export default ListCard;