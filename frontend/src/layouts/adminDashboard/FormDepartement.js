import { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { 
  Stack,
  TextField,  
  Grid,
 } from '@mui/material';

 import { LoadingButton } from '@mui/lab';

export default function FormDepartement({setshowAlert,setshowAlertError}){

const formik = useFormik({
    initialValues: {
     departement:''
     
    },
    onSubmit: async (values) => {
      const res = await fetch(`http://127.0.0.1:8000/api/registerdepartement`, {
      method: 'POST',
      headers:{"Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('auth_token')}`},
      body: JSON.stringify(values)
      });
     
      const response = await res.json();
          if (response.status === 200){setshowAlert(true);
        }
          else {setshowAlertError(true);}
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return(
 <FormikProvider value={formik}>
 <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
   <Stack spacing={3}>
       <TextField
           fullWidth
           type='string'
           label="Departement"
           {...getFieldProps('departement')}
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
         Ajouter Departement
       </LoadingButton>
     </Grid>
   </Stack>
 </Form>
</FormikProvider>

  );
  }