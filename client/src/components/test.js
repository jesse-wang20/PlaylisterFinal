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

// Render function for Prismic headless CMS pages
function YoutubePlayer() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");
  const { store } = useContext(GlobalStoreContext);

  let currentSongIndex = 0
  let videoCode;
  if (videoUrl) {
    videoCode = videoUrl
  }
  let currentPlaylist = null
  if (store.currentList){
    currentPlaylist = store.currentList.songs
    videoCode = currentPlaylist[currentSongIndex].youTubeId
  }
    
  const handleBack = (e) => {
  }
  const handlePlay = (e) => {
    setPlaying(true)
  }
  const handleForward = (e) => {

  }
  const handleStop = (e) => {
    setPlaying(false)

  }

  const playNextSong = (e) => {
    currentSongIndex = currentSongIndex+1
    videoCode = currentPlaylist[currentSongIndex].youTubeId
    // e.target.playVideo()
  }
  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
  };

  const opts = {
    height: '300',
      width: '600',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };
  
  let playListName = ""
  let currentSong = ""
  let currentArtist = ""

  if(store.currentList){
    playListName = store.currentList.name
    currentSong = store.currentList.songs[currentSongIndex].title
    currentArtist = store.currentList.songs[currentSongIndex].artist

  }

  return (
    <div>
      <div>
        <h1>Video</h1>
        <div></div>
      </div>
      <div>
        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <div>
          <YouTube
            videoId={videoCode}
            containerClassName="embed embed-youtube"
            onStateChange={(e) => checkElapsedTime(e)}
            opts={opts}
            onEnd = {playNextSong}
          />
        </div>
      </div>
      <Box sx= {{backgroundColor: 'lightblue', width : "97%"}}>
          
          <Typography sx = {{fontWeight: 'bold'}}>
            Playlist: {playListName}
          </Typography>
          <Typography sx = {{fontWeight: 'bold'}}>
            Song: {currentSong}
          </Typography>
          <Typography sx = {{fontWeight: 'bold'}}>
            Artist: {currentArtist}
          </Typography>

          <Box sx={{backgroundColor: "white", width : "45%", position:"relative", left:"28%"}}>
            <IconButton>
                <FastRewindIcon onClick = {handleBack} sx = {{fontSize: "48px"}}/>
            </IconButton>
            <IconButton>
                <StopIcon onClick = {handleStop} sx = {{fontSize: "48px"}}/>
            </IconButton>
            <IconButton>
                <PlayArrowIcon onClick = {handlePlay} sx = {{fontSize: "48px"}}/>
            </IconButton>
            <IconButton>
                <FastForwardIcon onClick = {handleForward} sx = {{fontSize: "48px"}}/>
            </IconButton>
          </Box>
      </Box>
    </div>

  );
  
}

export default YoutubePlayer;
