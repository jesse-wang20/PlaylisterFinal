import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    LOGIN_ERROR: "LOGIN_ERROR",
    REGISTER_ERROR: "REGISTER_ERROR",
    INCREMENT_SONG: "INCREMENT_SONG",
    CHANGE: "CHANGE",
    VIEW: "VIEW",
    CHANGE_SCREEN: "CHANGE SCREEN"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG",
    LOGIN_ERROR : "LOGIN_ERROR",
    REGISTER_ERROR : "REGISTER_ERROR"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        loginOk: null,
        currentIndexPlaying: 0,
        changed: false,
        currentUser: null,
        currentScreen: null,
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        console.log("TYPE IS ", type)
        console.log(store.currentScreen)
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.pairsArray,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: payload.currentUser,
                    currentScreen: payload.number
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: payload.currentSong,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                });
            }
            case GlobalStoreActionType.LOGIN_ERROR: {
                return setStore({
                    currentModal : CurrentModal.LOGIN_ERROR,
                    loginOk: payload,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                });
            }
            case GlobalStoreActionType.REGISTER_ERROR: {
                return setStore({
                    currentModal: CurrentModal.REGISTER_ERROR,
                    loginOk: null,
                    registerOk: payload,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                });
            }
            case GlobalStoreActionType.INCREMENT_SONG:{
                return setStore({
                    currentModal: null,
                    idNamePairs: store.idNamePairs,
                    loginOk: null,
                    registerOk: null,
                    listMarkedForDeletion: null,
                    currentIndexPlaying: payload,
                    currentScreen: store.currentScreen
                });
            }
            case GlobalStoreActionType.CHANGE:{
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: payload.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                });
            }
            case GlobalStoreActionType.VIEW:{
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: store.currentScreen
                });
            }
            case GlobalStoreActionType.CHANGE_SCREEN:{
                console.log("CHANGED CURRENT SCREEN", payload)
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: store.idNamePairs,
                    currentList: store.playlist,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    loginOk: null,
                    registerOk: null,
                    currentIndexPlaying: store.currentIndexPlaying,
                    currentUser: store.currentUser,
                    currentScreen: payload,
                });
            }
            default:
                return store;
        }
    }
    store.currentLikes = function(id){
        // return 2
        let playlist = ""
        async function asyncChangeListName(id) {
            console.log("Ok")
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                console.log(playlist.likes)
            }
            console.log(response.data)
        }
        asyncChangeListName(id);
        return playlist.likes
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.
    store.nameSort = function (){
        console.log(store.idNamePairs)
        let val = store.idNamePairs.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        console.log(val)
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: {
                pairsArray: val,
                currentUser: auth.user.username,
                number: store.currentScreen
            }
        });
    }
    store.dateSort = function (){
        console.log(store.idNamePairs)
        let val = store.idNamePairs.sort(function(a, b){
            if(a.publishedDate > b.publishedDate) { return -1; }
            if(a.publishedDate < b.publishedDate) { return 1; }
            return 0;
        })
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: {
                pairsArray: val,
                currentUser: auth.user.username,
                number: store.currentScreen
            }
        });
    }
    store.listensSort = function (){
        console.log(store.idNamePairs)
        let val = store.idNamePairs.sort(function(a, b){
            if(a.views > b.views) { return -1; }
            if(a.views < b.views) { return 1; }
            return 0;
        })
        console.log(val)
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: {
                pairsArray: val,
                currentUser: auth.user.username,
                number: store.currentScreen
            }
        });
    }
    store.likesSort = function (){
        console.log(store.idNamePairs)
        let val = store.idNamePairs.sort(function(a, b){
            if(a.likes > b.likes) { return -1; }
            if(a.likes < b.likes) { return 1; }
            return 0;
        })
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: {
                pairsArray: val,
                currentUser: auth.user.username,
                number: store.currentScreen
            }
        });
    }
    store.dislikesSort = function (){
        console.log(store.idNamePairs)
        let val = store.idNamePairs.sort(function(a, b){
            if(a.dislikes > b.dislikes) { return -1; }
            if(a.dislikes < b.dislikes) { return 1; }
            return 0;
        })
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: {
                pairsArray: val,
                currentUser: auth.user.username,
                number: store.currentScreen
            }
        });
    }
    
    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }
    store.addComment = function (written) {
        let user = store.currentUser
        console.log("CURRENT USER IS ",user)
        let val = {
            username: user,
            comment: written
        }
        console.log(val)
        store.currentList.comments.splice(store.currentList.comments.length, 0, val);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.handleLike = function(id) {
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.likes = playlist.likes + 1;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPubPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE,
                                    payload: {
                                        idNamePairs: pairsArray,
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }
    store.handlePublish = function(id) {
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                console.log(playlist)
                playlist.isPublished = true
                playlist.publishedDate = new Date()
                console.log("AFTER", playlist)
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE,
                                    payload: {
                                        idNamePairs: pairsArray,
                                    }
                                });
                                console.log("PUBLISHED")
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }
    store.handleDuplicate = function(id){
        console.log("DOING DUPLICATE")
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            console.log(response)
            if (response.data.success) {
                let playlist = response.data.playlist;
                async function updateList(playlist) {
                    response = api.createPlaylist(playlist.name, playlist.songs, auth.user.email, []);
                    if (response.status === 201) {
                        let newList = response.data.playlist;
                        storeReducer({
                            type: GlobalStoreActionType.CREATE_NEW_LIST,
                            payload: newList
                        }
                        );
            
                        // IF IT'S A VALID LIST THEN LET'S START EDITING IT
                        history.push("/")
                    }
                    else {
                        console.log("API FAILED TO CREATE A NEW LIST");
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }
    store.handleDislike = function(id) {
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.dislikes = playlist.dislikes + 1;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPubPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE,
                                    payload: {
                                        idNamePairs: pairsArray,
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }
    store.handleView = function(id){
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.views = playlist.views + 1;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPubPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.VIEW,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }
    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        console.log("CLOSING")
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        history.push("/")
        tps.clearAllTransactions();
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;

        const response = await api.createPlaylist(newListName, [], auth.user.email, [], auth.user.username);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/")
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }


    store.incrementCurrentSongIndex = function (){
        console.log("SKIPPING SONG")
        if(store.currentList){
            let val = store.currentIndexPlaying + 1
            val = val % store.currentList.songs.length;
            console.log("AFTER", val)
            storeReducer({
                type: GlobalStoreActionType.INCREMENT_SONG,
                payload: val
            }
        );
        }
    }
    store.decrementCurrentSongIndex = function (){
        
        let val = store.currentIndexPlaying - 1
        if(val < 0){
            val = store.currentList.songs.length -1
        }
        storeReducer({
            type: GlobalStoreActionType.INCREMENT_SONG,
            payload: val
        }
        );
    }
    store.noMoreSong = function (){
        storeReducer({
            type: GlobalStoreActionType.INCREMENT_SONG,
            payload: -1
        }
        );
    }
    store.moreSong = function (){
        storeReducer({
            type: GlobalStoreActionType.INCREMENT_SONG,
            payload: 0
        }
        );
        
    }
    store.loadAllPlaylists = function (num) {
        if(num == 1){
            storeReducer({
                type: GlobalStoreActionType.CHANGE_SCREEN,
                payload: 1
            });
        }
        else{
            storeReducer({
                type: GlobalStoreActionType.CHANGE_SCREEN,
                payload: 2
            });
        }
        async function asyncLoadIdNamePairs() {
            const response = await api.getPubPlaylistPairs();
            console.log(response)
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: {
                        pairsArray: pairsArray,
                        currentUser: auth.user.username,
                        number: num
                    }
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }
    store.searchFunction = function (text) {
        console.log("CURRENT SCREEN, ", store.currentScreen)
        console.log("TExT", text)
        if(store.currentScreen == 2){
            console.log("USERS searcj")
            async function asyncLoadIdNamePairs() {
                const response = await api.getPlaylistsByUser(text);
                console.log(response)
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: {
                            pairsArray: pairsArray,
                            currentUser: auth.user.username,
                            number: store.currentScreen
                        }
                    });
                }
                else {
                    console.log("API FAILED TO GET THE LIST PAIRS");
                }
            }
            asyncLoadIdNamePairs();
        }
        if(store.currentScreen == 1){
            console.log("Name searcj")
            async function asyncLoadIdNamePairs() {
                const response = await api.getPlaylistsByName(text);
                console.log(response)
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: {
                            pairsArray: pairsArray,
                            currentUser: auth.user.username,
                            number: store.currentScreen
                        }
                    });
                }
                else {
                    console.log("API FAILED TO GET THE LIST PAIRS");
                }
            }
            asyncLoadIdNamePairs();
        }


    }
    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_SCREEN,
            payload: 0
        });
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            console.log(response)
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: {
                        pairsArray: pairsArray,
                        currentUser: auth.user.username,
                        number: store.currentScreen
                    }
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }
    store.logInError = function(cer){
        let errorMessage = ""
        if(cer == 400){
            errorMessage = "Please enter all required fields."
        }
        else if (cer == 401){
            errorMessage = "Wrong email or password provided."
        }
        storeReducer({
            type: GlobalStoreActionType.LOGIN_ERROR,
            payload: {errorMessage}
        });
        
    }
    store.registerError = function(cer){
        let errorMessage = cer
        console.log("FAILED", cer)
        storeReducer({
            type: GlobalStoreActionType.REGISTER_ERROR,
            payload: {errorMessage}
        });
    }
    store.FoolProof = function(){
        console.log(!(store.currentModal === CurrentModal.NONE))
        return !(store.currentModal === CurrentModal.NONE);
    }
    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            console.log(response)
            if (response.status == 200) {
                store.loadIdNamePairs();
                console.log("SUCCESS")
                history.push("/");
            }
        }
        processDelete(id);
    }
    store.resetScreen = function () {
        history.push("/")
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }
    store.isLoginModalOpen = () => {
        console.log(store.currentModal === CurrentModal.LOGIN_ERROR)
        return store.currentModal === CurrentModal.LOGIN_ERROR; 
    }
    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                   // history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "Unknown", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "Unknown", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
            else {
                console.log("ERROR")
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };