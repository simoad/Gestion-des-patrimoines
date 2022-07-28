import { useFormik, Form, FormikProvider } from 'formik';

// material
import { 
  Stack,
  Grid,
 } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function ToRebutConfirmationAlert({setshowAlert,setshowAlertError,codeBarre, getBiensRebut,user}){

  const formik = useFormik({
    initialValues: {
      code_barre : codeBarre,
      id_gestionnaire : user,
    },
    onSubmit: async (values) => {
      const res = await fetch(`http://127.0.0.1:8000/api/envoyer-au-rebut`, {
      method: 'POST',
      headers:{"Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('auth_token')}`},
      body: JSON.stringify(values)
      });
      const response = await res.json();
        if (response.status === 200){setshowAlert(true);
          getBiensRebut();
        }
        else{
          setshowAlertError(true);
          getBiensRebut();
        }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;


 

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