import React from "react";
import YouTube from "react-youtube";
import Modal from "react-modal";
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from "@mui/material";
import YoutubePlayer from "./YoutubePlayer.js";

// Render function for Prismic headless CMS pages
function YoutubePlayerWrapper() {

    


  return (
    <YoutubePlayer/>

  );
  
}

export default YoutubePlayerWrapper;
