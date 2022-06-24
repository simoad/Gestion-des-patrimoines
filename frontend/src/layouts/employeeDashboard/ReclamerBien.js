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
  Stack,
  TextField,  
  Select ,
  InputLabel,
  FormControl,
  Grid,
  Collapse, Alert, IconButton,
 } from '@mui/material';
 import CloseIcon from '@mui/icons-material/Close';
 import { LoadingButton } from '@mui/lab';

 import FormReclamation from './FormReclamation';

 export default function ReclamerBien({open,setOpen,codeBarre,user}){

  

    const [showAlert, setshowAlert] = useState(false);
    const [showAlertError, setshowAlertError] = useState(false);


    const ITEM_HEIGHT = 48;
    const [maxWidth, setMaxWidth] = useState('md');
    const [fullWidth, setFullWidth] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const MyComponent = styled('div')({
      marginTop : '4px',
    });

    return(
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogTitle>Reclamer votre bien</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Veuillez saisir le probleme 
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
              L'envoie du reclamation a reconnu un problème ! 
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
              Votre reclamation est envoyée ! 
            </Alert>
          </Collapse>
          <MyComponent>
               <FormReclamation setshowAlert={setshowAlert} setshowAlertError={setshowAlertError} codeBarre={codeBarre} user={user}/>
          </MyComponent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Quitter</Button>
        </DialogActions>
    </Dialog>
     );
 }