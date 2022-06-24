import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { 
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Collapse, Alert, IconButton,
 } from '@mui/material';
 import CloseIcon from '@mui/icons-material/Close';
 import FormModifSeuil from './FormModifSeuil';

 export default function ModifSeuilDialog({getCategories,open,setOpen,idCat,seuilCategorie}){

    const [showAlert, setshowAlert] = useState(false);
    const [showAlertError, setshowAlertError] = useState(false);

    const [maxWidth, setMaxWidth] = useState('md');
    const [fullWidth, setFullWidth] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const MyComponent = styled('div')({
      marginTop : '10px',
    });

    return(
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogTitle>Modifier le seuil de votre catégorie</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Veuillez inserer le nouveau seuil. 
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
              La modification du seuil a reconnu un problème ! 
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
              Le seuil de votre catégorie est modifié ! 
            </Alert>
          </Collapse>
          <MyComponent>
               <FormModifSeuil getCategories={getCategories} setshowAlert={setshowAlert} setshowAlertError={setshowAlertError} idCat={idCat} seuilCat={seuilCategorie}/>
          </MyComponent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Quitter</Button>
        </DialogActions>
    </Dialog>
     );
 }