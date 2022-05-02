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

 import { LoadingButton } from '@mui/lab';



export default function ToReparerConfirmationAlert({setshowAlert,setshowAlertError,codeBarre,idReclamation, getReclamations}){



const formik = useFormik({
    initialValues: {
      codeBarre,
      idReclamation,
      idServiceReclamation: 2,
      ServiceReponse: 'En Reparation'
    },
    onSubmit: async (values) => {
      const res = await fetch(`http://127.0.0.1:8000/api/responceReclamation`, {
      method: 'POST',
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(values)
      });
      const response = await res.json();
          if (response.status === 200){
            setshowAlert(true);
            getReclamations();
        }
          else {setshowAlertError(true);}
    }
  });

  const { handleSubmit, isSubmitting } = formik;


 

  return(

 <FormikProvider value={formik}>
 <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
   <Stack spacing={3}>

     <Grid container justify="center">
       <LoadingButton
         sx={{ mx: 'auto', width: 100   , 
         backgroundColor: '#fff',
         color: '#00ab55',
         zIndex:0,
         boxShadow:0,
         '&:hover': {
          backgroundColor: '#00ab55',
          color: '#fff',
        },
        }}
         size="medium"
         width="medium"
         type="submit"
         variant="contained"
         loading={isSubmitting}
       >
         Confirmer
       </LoadingButton>
     </Grid>
   </Stack>
 </Form>
</FormikProvider>

  );
}