import { useFormik, Form, FormikProvider } from 'formik';

// material
import { 
  Stack,
  Grid,
 } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function ReadDemandeConfirmationAlert({getDemande,demande,setshowAlert,setshowAlertError,user}){

  const formik = useFormik({
    initialValues: {
      demande,
      id_gestionnaire : user.id_gestionnaire,
    },
    onSubmit: async (values) => {
      const res = await fetch(`http://127.0.0.1:8000/api/confirmer-consulter-demande`, {
      method: 'POST',
      headers:{"Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('auth_token')}`},
      body: JSON.stringify(values)
      });
      const response = await res.json();
        if (response.status === 200){setshowAlert(true);
            getDemande();
        }
        else{
          setshowAlertError(true);
          getDemande();
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