import { IconButton } from '@mui/material';
import { color } from '@mui/system';
import Box from '@mui/material/Box';
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import DeleteIcon from '@mui/icons-material/Delete';

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { comment } = props;
    let cardClass = "list-card unselected-list-card";
    return (
        <Box>
            <Box>
                <b
                    style={{color: 'blue'}}
                    href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
                    {comment.username}
                </b>
            </Box>

            <b
                style= {{color :'black'}}>
                {comment.comment}
            </b>
        </Box>
    );
}

export default CommentCard;