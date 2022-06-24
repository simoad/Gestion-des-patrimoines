import { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'axios';

// material
import { 
  Stack,
  TextField,  
  Grid,
 } from '@mui/material';
 import InputLabel from '@mui/material/InputLabel';
 import MenuItem from '@mui/material/MenuItem';
 import FormControl from '@mui/material/FormControl';
 import Select from '@mui/material/Select';
 import { LoadingButton } from '@mui/lab';

export default function FormBureau({setshowAlert,setshowAlertError}){

    const ITEM_HEIGHT = 48;
    const [departements, setDepartements] = useState([{
      id_departement : 1,
      nom_departement : ''
    }]);

const formik = useFormik({
    initialValues: {
     departement:''
     
    },
    onSubmit: async (values) => {
      const res = await fetch(`http://127.0.0.1:8000/api/registerbureau`, {
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

  const getToken = async () => {
    const res = await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
    console.log(res);
  }
   useEffect(() => {
    getToken();
   },[]);
 

  const getDepartements = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/get-departements');
    setDepartements(res.data.departements);
    };

   
    useEffect(() => {
      getDepartements();
      },[]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return(
 <FormikProvider value={formik}>
 <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
 <Stack spacing={3}>
         
    
          
       
         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
         <FormControl fullWidth>
                   <InputLabel id="departement-input-label">Département</InputLabel>
                   <Select
                     required
                     labelId="departement-input-label"
                     id="departement-input"
                     {...getFieldProps('numerod')}
                     onChange={formik.handleChange}
                     label="Département"
                     PaperProps={{
                         style: {
                           maxHeight: ITEM_HEIGHT * 4.5,
                           width: '20ch',
                         },
                     }}
                   >
                   {departements.map((item) => (
                     <MenuItem  key={item.id_departement} value={item.id_departement}>{item.nom_departement}</MenuItem>
                     ))}
                   </Select>
                 </FormControl>

                 <TextField
             fullWidth
             label="bureau"
             autoComplete="bureau"
             {...getFieldProps('numerob')}
             error={Boolean(touched.bureau && errors.bureau)}
             helperText={touched.bureau && errors.bureau}
           />
            </Stack>
        

       

     

         <LoadingButton
           fullWidth
           size="large"
           type="submit"
           variant="contained"
           loading={isSubmitting}
         >
           Ajouter Bureau
         </LoadingButton>
       </Stack>
 </Form>
</FormikProvider>

  );
  }