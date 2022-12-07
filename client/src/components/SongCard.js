import { IconButton } from '@mui/material';
import { color } from '@mui/system';
import Box from '@mui/material/Box';
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import DeleteIcon from '@mui/icons-material/Delete';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2 && !store.currentList.isPublished) {
            console.log(store.isEditSongModalOpen())
            store.showEditSongModal(index, song);
        }
    }
    let val = true
    let deletes =  <IconButton display="flex"
    justifyContent="flex-end"
    alignItems="flex-end">
        <DeleteIcon type="button"
        id={"remove-song-" + index}
        value={"\u2715"}
        onClick={handleRemoveSong}
        sx = {{marginRight:"10%", color: "white"}}></DeleteIcon>
    </IconButton>
    if(store.currentList){
        if(store.currentList.isPublished){
            val = false;
            deletes = ""
        }
    }
    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable={val}
            onClick={handleClick}
            style= {{color :'yellow'}}
        >
            {index + 1}.
            <b
                id={'song-' + index + '-link'}
                style= {{color :'yellow'}}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </b>
            {deletes}
               

        </div>
    );
}

export default SongCard;