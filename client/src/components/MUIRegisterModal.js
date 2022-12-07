import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const style2 = {
    top: "10px",
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
}

export default function MUIRegisterModal() {
    const { store } = useContext(GlobalStoreContext);
    function handleCloseModal(event) {
        store.hideModals();
    }
    let name = ""
    if(store.registerOk){
        console.log("ste", store.registerOk.errorMessage)
        name = store.registerOk.errorMessage
    }
    console.log(store.registerOk !== null, "REGISTER OK")
    return (

        <Modal
            open={store.registerOk !== null}
        >
            <Box sx={style}>
            <Alert variant="filled" severity="error">
                {name}
            </Alert>
            <Button variant="contained" onClick = {handleCloseModal} sx = {style2}>Close</Button>
            </Box>
        </Modal>
    );
}