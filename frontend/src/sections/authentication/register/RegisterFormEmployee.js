import * as Yup from 'yup';
import { useState,useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import { Stack, TextField, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { values } from 'lodash';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    nom: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    prenom: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('role is required')
  });

  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      role: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
      method: 'POST',
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(values)
    });
    const response = await res.json();
    if (response.status === 200) 
    {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_name', response.nom);
      navigate('/Login', { replace: true });  
      navigate('/employee/biens', { replace: true });
    }
  }
  });
  const [IsSelected, setIsSelected] = useState(true);
  const getBureau= async ()=> {
    
  }
  const getToken = async () => {
    const res = await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
    console.log(res);
  }

   useEffect(() => {
    getToken();
   },[]);
   
 

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="nom"
              autoComplete="nom"
              {...getFieldProps('nom')}
              error={Boolean(touched.nom && errors.nom)}
              helperText={touched.nom && errors.nom}
            />

            <TextField
              fullWidth
              label="prenom"
              autoComplete="prenom"
              {...getFieldProps('prenom')}
              error={Boolean(touched.prenom && errors.prenom)}
              helperText={touched.prenom && errors.prenom}
            />
          </Stack>
          <FormControl fullWidth>
            <InputLabel id="role_label">Role</InputLabel>
            <Select
              labelId="role_label"
              id="role_id"
              {...getFieldProps('role')}
              label="Role"
              
            >
              <MenuItem value="employee"  >employee</MenuItem>
              <MenuItem value="gestionnaire" >gestionnaire</MenuItem>
              <MenuItem value="service_de_reclamation" >service de reclamation</MenuItem>
            </Select>
          </FormControl>
          

          <FormControl fullWidth  >
               <InputLabel id="role_label">Role</InputLabel>
               <Select
                 labelId="role_label"
                 id="role_id"
                 {...getFieldProps('role')}
                 label="Role"
                 
               >
                 <MenuItem value="employee">employee</MenuItem>
                 <MenuItem value="gestionnaire">gestionnaire</MenuItem>
                 <MenuItem value="service_de_reclamation">service de reclamation</MenuItem>
               </Select>
            </FormControl>
            
         

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

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