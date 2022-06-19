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
  Select ,
  InputLabel,
  TextField,
  FormControl,
  Grid,
  Collapse, Alert, IconButton,
 } from '@mui/material';
 import { LoadingButton } from '@mui/lab';
 import CloseIcon from '@mui/icons-material/Close';
 import FormAjoutCategorie from './FormAjoutCategorie';

 export default function AjoutCategorieDialog({getCategories,open,setOpen}){


    const [showAlert, setshowAlert] = useState(false);
    const [showAlertError, setshowAlertError] = useState(false);


    const ITEM_HEIGHT = 48;
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
        <DialogTitle>Ajouter une catégorie des biens</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Veuillez ajouter la nouvelle catégorie des biens
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
              L'ajout du catégorie a reconnu un problème ! 
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
              Votre catégorie est ajoutée ! 
            </Alert>
          </Collapse>
          <MyComponent>
            <FormAjoutCategorie getCategories={getCategories} setshowAlert={setshowAlert} setshowAlertError={setshowAlertError}/>
          </MyComponent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Quitter</Button>
        </DialogActions>
    </Dialog>
     );
 }