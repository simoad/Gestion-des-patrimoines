import * as Yup from 'yup';
import { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import { Stack, TextField, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { isNull, values } from 'lodash';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function Registerbureau() {


  const ITEM_HEIGHT = 48;
  const [departements, setDepartements] = useState([{
    id_departement : 1,
    nom_departement : ''
  }]);
  
const [bureaux, setBureaux] = useState([{
  id_bureau : null,
}]);


  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

//   const RegisterSchema = Yup.object().shape({
    
//     email: Yup.string().email('Email must be a valid email address').required('Email is required'),
//     password: Yup.string().required('Password is required'),
//     role: Yup.string().required('role is required')
//   });

  const formik = useFormik({
    initialValues: {
      numerob: '',
      numerod: ''
    },
    // validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const res = await fetch("http://127.0.0.1:8000/api/registerbureau", {
      method: 'POST',
      headers:{"Content-Type": "application/json",

      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('auth_token')}`},
      body: JSON.stringify(values)
    });
    const response = await res.json();
    if (response.status === 200) 
    {
      
      navigate('/admin/structure', { replace: true });  
    } 
    else{
       
        navigate('/admin/ajoutbureau', { replace: true }); 

    }
   
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
  

  return (
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
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}