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

// component
import ReadDemandeConfirmationAlert from './ReadDemandeConfirmationAlert';

// ----------------------------------------------------------------------

export default function ButtonReadDemande({getDemande,demande,user,employee,employees}) {
  const navigate = useNavigate();
  const ref = useRef(null);

  const [open, setOpen] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
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





  return (
    <>
    <Button variant="contained" component={RouterLink} to="#" color='primary'  onClick={handleClickOpen}
     sx={{
     color: '#fff',
       '&:hover': {
   backgroundColor: '#00AB55',
   color: '#fff',
 },
 }}
    > Consulter </Button>

    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogTitle>confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Veuillez confirmer la consultation de la demande 
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
              L'envoie de la confirmation a reconnu un problème ! 
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
               la confirmation de consultation est bien faite
            </Alert>
          </Collapse>

        </DialogContent>
        <DialogActions>
        <ReadDemandeConfirmationAlert getDemande={getDemande} demande={demande} user={user} setshowAlert={setshowAlert} setshowAlertError={setshowAlertError} />
          <Button onClick={handleClose} color='error'>Annuler</Button>
        </DialogActions>
    </Dialog>
    </>
  );
}






