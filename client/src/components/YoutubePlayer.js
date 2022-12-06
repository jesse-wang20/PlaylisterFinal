import React from 'react';
import { useContext, useState } from 'react'
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { Typography } from "@mui/material";

export default function YoutubePlayer() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    const { store } = useContext(GlobalStoreContext);
    const [playing, setPlaying] = React.useState(false);
    const [player, setPlayer] = React.useState(false);
    const [currentSongIndex, setcurrentSongIndex] = React.useState(0);

    

    let currentPlaylist = null
    let videoCode = ""
    if (store.currentList){
      currentPlaylist = store.currentList.songs
      if(currentPlaylist[currentSongIndex]){
        videoCode = currentPlaylist[currentSongIndex].youTubeId
      }
    }
    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST


    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST

    const playerOptions = {
        height: '390',
        width: '600',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        // setRenders(Math.random())
        if(currentPlaylist){
            let song = ""
            if(currentPlaylist[currentSongIndex]){
                song = currentPlaylist[currentSongIndex].youTubeId
              }
            player.loadVideoById(song);
            player.playVideo();
        }
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        let val = currentSongIndex
        console.log(val)
        val++;
        if(val == currentPlaylist.length){
            val = 0
        }
        console.log("AFTER INC", val)
        setcurrentSongIndex(val)
        loadAndPlayCurrentSong(player)
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        setPlayer(event.target)
    }
    const handleBack = (e) => {
        let val = currentSongIndex
        console.log(val)
        val--;
        if(val < 0 ){
            val = currentPlaylist.length - 1
        }
        console.log("AFTER INC", val)
        setcurrentSongIndex(val)
        loadAndPlayCurrentSong(player)
    }
    const handlePlay = (e) => {
        console.log("set to true")
        setPlaying(true)
        player.playVideo()
    }
    const handleStop = (e) => {
      player.pauseVideo()
  
    }
    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
            loadAndPlayCurrentSong(event.target)
        }
    }
    let val = 2
    if(playing){
        val = 1
    }
    let playListName = ""
    let currentSSong = ""
    let currentArtist = ""
    let songHolder = ""
    if(store.currentList){
        playListName = store.currentList.name
        console.log(playListName)
        if(store.currentList.songs[currentSongIndex]){
            currentSSong = store.currentList.songs[currentSongIndex].title
                console.log(currentSSong)
            currentArtist = store.currentList.songs[currentSongIndex].artist
        }
        songHolder = <Box>
            <Typography sx = {{fontWeight: 'bold'}}>
                Playlist: {playListName}
            </Typography>
            <Typography sx = {{fontWeight: 'bold'}}>
                Song: #{currentSongIndex}
            </Typography>
            <Typography sx = {{fontWeight: 'bold'}}>
                Song: {currentSSong}
            </Typography>
            <Typography sx = {{fontWeight: 'bold'}}>
                Artist: {currentArtist}
            </Typography>
        </Box>

    }
    
    return(
        <div>
        <div>
            <h1></h1>
            <div></div>
        </div>
        <div>
            <div>
            <YouTube
            videoId={videoCode}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
            />
            </div>
        </div>
        <Box sx = {{backgroundColor: 'lightblue', width : "100%"}}>
            
            {songHolder}

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
                    <FastForwardIcon onClick = {incSong} sx = {{fontSize: "48px"}}/>
                </IconButton>
            </Box>
        </Box>
        </div>
    );
}