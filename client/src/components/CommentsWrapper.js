import { IconButton, TextField } from '@mui/material';
import { color } from '@mui/system';
import Box from '@mui/material/Box';
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import CommentCard from './CommentCard'
import DeleteIcon from '@mui/icons-material/Delete';
import List from "@mui/material/List";
import AuthContext from '../auth'

function CommentsWrapper(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState("");

    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.addComment(text)
            setText("")
        }
    }
    let comments = ""
    if(store.currentList){
        console.log(store.currentList.comments)
        comments =
        <Box sx = {{marginRight:"2%", marginLeft:"2%"}}>
        <List 
      id="playlist-cards" 
      sx={{ width: '100%', bgcolor: "#d69a29", border:'1', borderRadius: '16px', color:'green'}}
  >
      {
          store.currentList.comments.map((comment) => (
            <CommentCard
                id={'username' + comment.username}
                key={'commentby' + comment.username}
                comment={comment}
            />
        )) 
      }
   </List> </Box>  
    }
    let enabled = false
    if(auth.isGuest){
        enabled = true
    }
    return (
        <Box sx ={{backgroundColor: "#1980ba"}}>
            <Box sx ={{width: "100%", height: "300px", backgroundColor: "#1980ba"}}>
                {comments}
            </Box>
            <TextField disabled = {enabled}  onKeyPress={handleKeyPress}
                onChange={handleUpdateText} value = {text} label="Add Comment" sx={{width: "100%"}}>

            </TextField>
        </Box>
    );
}

export default CommentsWrapper;