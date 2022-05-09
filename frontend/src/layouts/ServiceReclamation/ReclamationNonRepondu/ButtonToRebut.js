import { useRef, useState } from 'react';
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
import ToRebutConfirmationAlert from './ToRebutConfirmationAlert';

// ----------------------------------------------------------------------

export default function ButtonToRebut({codeBarre,idEmployee,idReclamation, getReclamations,nomProduit,user}) {
  const navigate = useNavigate();
  const ref = useRef(null);

  const [open, setOpen] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [showAlertError, setshowAlertError] = useState(false);
  const [alertError, setalertError] = useState(false);
 
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
    > à rebut </Button>

    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogTitle>confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Veuillez confirmer l'envoi de {nomProduit} à rebut 
          </DialogContentText>
          <Collapse in={alertError} sx={{marginTop : '4px'}}>
            <Alert
              severity="error"
              color='error'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setalertError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              le produit est deja en rebut ! 
            </Alert>
          </Collapse>
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
        <ToRebutConfirmationAlert user={user} setshowAlert={setshowAlert} setalertError={setalertError}  setshowAlertError={setshowAlertError} codeBarre={codeBarre} idReclamation={idReclamation}  getReclamations={getReclamations} />
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






