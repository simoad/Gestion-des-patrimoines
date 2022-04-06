import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// component
 import CSRFInput from "@ueaweb/laravel-react-csrf-input";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------

export default function LoginForm() {
 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [csrfTokenState, setcsrfTokenState] = useState('');
  

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('required')
  });
  
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role:''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
       await fetch("http://127.0.0.1:8000/api/login", {
      method: 'POST',
      headers:{
              "Accept":"application/json",
              "Content-Type": "application/json"
    },
      body:  JSON.stringify(values)

    });


    alert(JSON.stringify(values ,null , 3));
    navigate('/Register');
  }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <TextField type="hidden" name="_token" id="token" value="{{ csrfTokenState }}"/>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <FormControl fullWidth>
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
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
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
          Login
        </LoadingButton>
        </Stack>
        
      </Form>
    </FormikProvider>
  );
}
