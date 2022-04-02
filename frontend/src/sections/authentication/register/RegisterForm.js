import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component

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
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });


  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      role: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
        await fetch("http://127.0.0.1:8000/api/register", {
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(values)
      });
    }
  });

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
              onChange={formik.handleChange}
            value={formik.values.nom}
              {...getFieldProps('nom')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="prenom"
              autoComplete="prenom"
              onChange={formik.handleChange}
            value={formik.values.prenom}
              {...getFieldProps('prenom')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <FormControl fullWidth>
            <InputLabel id="role_label">Role</InputLabel>
            <Select
              labelId="role_label"
              id="role_id"
              onChange={formik.handleChange}
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
            onChange={formik.handleChange}
            value={formik.values.email}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
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