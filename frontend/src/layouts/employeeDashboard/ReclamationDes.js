import { useRef, useState } from 'react';
import {useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import { 
  Menu, MenuItem, IconButton, ListItemIcon, ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
 } from '@mui/material';
// component
import ReclamerBien from './ReclamerBien';

// ----------------------------------------------------------------------

export default function ReclamationDes({codeBarre,user}) {
  const navigate = useNavigate();
  const ref = useRef(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  

  return (
    <>
        <Button variant="contained" component={RouterLink} to="#" onClick={handleClickOpen}> reclamer </Button>

        <ReclamerBien open={open} setOpen={setOpen} codeBarre={codeBarre} user={user}/>

       

      
      
    </>
  );
}
