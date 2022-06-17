import { useFormik, Form, FormikProvider } from 'formik';

// material
import { 
  Stack,
  TextField,  
  Grid,
 } from '@mui/material';

 import { LoadingButton } from '@mui/lab';



export default function FormReclamerBien({setshowAlert,setshowAlertError,codeBarre,user}){



const formik = useFormik({
    initialValues: {
      id_employe: user.id_employe,
      code_barre : codeBarre,
      description: null,
      status: -1
    },
    onSubmit: async (values) => {
      const res = await fetch(`http://127.0.0.1:8000/api/reclamer`, {
      method: 'POST',
      headers:{
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('auth_token')}`},
      body: JSON.stringify(values)
      });
      const response = await res.json();
          if (response.status === 200){setshowAlert(true);}
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
           disabled
           label="id_employe"
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