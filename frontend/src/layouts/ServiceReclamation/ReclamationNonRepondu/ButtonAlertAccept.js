import {  useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,  Collapse, Alert, IconButton,
 } from '@mui/material';
 import CloseIcon from '@mui/icons-material/Close';

// component
import ToReparerConfirmationAlert from './ToReparerConfirmationAlert';

// ----------------------------------------------------------------------

export default function ButtonAlertAccept({codeBarre,idReclamation, getReclamations,nomProduit,user}) {
 
  const [open, setOpen] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [showAlertError, setshowAlertError] = useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
};

const [maxWidth, setMaxWidth] = useState('md');
const [fullWidth, setFullWidth] = useState(false);



  return (
    <>
    <Button variant="contained" component={RouterLink} to="#" onClick={handleClickOpen} 
     sx={{backgroundColor: '#00ab55',
            color: '#fff',
              '&:hover': {
          backgroundColor: '#228B22',
          color: '#fff',
        },
        }}> bien réparer </Button>
      
      <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogTitle>confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Veuillez confirmer la reparation de {nomProduit} 
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
          <ToReparerConfirmationAlert user={user} onClick={handleClose} setshowAlert={setshowAlert} setshowAlertError={setshowAlertError} codeBarre={codeBarre} idReclamation={idReclamation}  getReclamations={getReclamations}/>
          <Button onClick={handleClose} color='error'>Annuler</Button>
        </DialogActions>
    </Dialog>
    </>
  );
}

