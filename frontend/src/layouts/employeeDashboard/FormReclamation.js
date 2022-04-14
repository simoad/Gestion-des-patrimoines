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



export default function FormReclamerBien({codeBarre}){



const formik = useFormik({
    initialValues: {
      id_employe : null,
      code_barre : codeBarre,
      description: null
    },
    onSubmit: async (values) => {
      const res = await fetch(`http://127.0.0.1:8000/api/reclamer`, {
      method: 'POST',
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(values)
      });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;




  return(

 <FormikProvider value={formik}>
 <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
   <Stack spacing={3}>
       

       
       <TextField
           fullWidth
           label="id_employee"
           {...getFieldProps('id_employe')}
         />
       <TextField
           fullWidth
           label="description"
           {...getFieldProps('description')}
         />

     <Grid container justify="center">
       <LoadingButton
         sx={{ mx: 'auto', width: 200 }}
         size="large"
         width="medium"
         type="submit"
         variant="contained"
         loading={isSubmitting}
       >
         Reclamer bien
       </LoadingButton>
     </Grid>
   </Stack>
 </Form>
</FormikProvider>

  );
  }