import { useRef, useState ,useEffect } from 'react';
import {useNavigate, Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import axios from 'axios';
// material
import { 
  Menu, MenuItem, ListItemIcon, ListItemText,
  Button,
  Component,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,  Collapse, Alert, IconButton,

 } from '@mui/material';
 import CloseIcon from '@mui/icons-material/Close';
import { color } from '@mui/system';

// component
import Confirmdelete from './Confirmdelete';

// ----------------------------------------------------------------------

export default function Buttondelete({idfonctionnel,nomfonctionnel,prenomfonctionnel,getEmployees,getServices,getGestionnaires,role}) {
  const navigate = useNavigate();
  const ref = useRef(null);

  const [open, setOpen] = useState(false);
  const [showAlert, setshowAlert] = useState(false);


  const [role1, setRole1] = useState(role);



  
  const [showAlertError, setshowAlertError] = useState(false);
   
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
};
const MyComponent = styled('div')({
  marginTop : '10px',
});




const [maxWidth, setMaxWidth] = useState('md');
const [fullWidth, setFullWidth] = useState(false);

useEffect(() => {
    setTimeout(() => {
        setOpen(false);
    }, 10000);
  },[open]);



  return (
    <>
    <Button variant="contained" component={RouterLink} to="#" color='error'  onClick={handleClickOpen}
     sx={{
     color: '#fff',
       '&:hover': {
   backgroundColor: '	#DC143C',
   color: '#fff',
 },
 }}
    > supprimer </Button>

    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogTitle>confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Veuillez confirmer la suppression de  {nomfonctionnel} {prenomfonctionnel}
          </DialogContentText>
          <Collapse in={showAlertError} sx={{marginTop : '4px'}}>
            <Alert
              severity="error"
              color='error'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setshowAlertError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              L'envoie de la demande a reconnu un problème ! 
            </Alert>
          </Collapse>
          <Collapse in={showAlert} sx={{marginTop : '4px'}}>
            <Alert
              color='primary'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setshowAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
               votre demande a ete envoyée
            </Alert>
          </Collapse>
             
         
        </DialogContent>
        <DialogActions>
        <Confirmdelete setshowAlert={setshowAlert} setshowAlertError={setshowAlertError} idfonctionnel={idfonctionnel} getEmployees={getEmployees} getGestionnaires={getGestionnaires} getServices={getServices} role={role} />
          <Button onClick={handleClose} color='error'>Annuler</Button>
        </DialogActions>
    </Dialog>
      
      {/* <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogTitle>confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Veuillez confirmer l'envoi de produit à rebut
          </DialogContentText>
          <Collapse in={showAlertError} sx={{marginTop : '4px'}}>
            <Alert
              severity="error"
              color='error'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setshowAlertError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              L'envoie de demande a reconnu un problème ! 
            </Alert>
          </Collapse>
          <Collapse in={showAlert} sx={{marginTop : '4px'}}>
            <Alert
              color='primary'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setshowAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Votre demande est envoyée ! 
            </Alert>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}   > Confirmer </Button>
          <Button onClick={handleClose} color='error' >Annuler</Button>
        </DialogActions>
    </Dialog> */}

    
    </>
  );
}