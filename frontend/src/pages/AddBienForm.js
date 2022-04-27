import * as Yup from 'yup';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useFormik, Form, FormikProvider, Field } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { Stack, 
  TextField, 
  Select ,
  MenuItem,
  InputLabel,
  FormControl,Collapse, Alert, IconButton,
} from '@mui/material'; 
import CloseIcon from '@mui/icons-material/Close';

import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------

export default function AddBienForm() {
    const [categories, setCategories] = useState([{
      id_categorie : 1,
      nom_categorie : ''
    }]);
  
    const [showAlert, setshowAlert] = useState(false);
  
    const BienSchema = Yup.object().shape({
      code_barre : Yup.string().min(2, 'Trop court!').required('Code Barre est requis'),
      id_categorie : Yup.number().required('Categorie est requis'),
      nom_bien : Yup.string().min(2, 'Trop court!').required('Nom est requis'),
      garantie : Yup.number().required('Garantie est requis'),
      duree_de_vie : Yup.number().required('Duree de vie est requis')
    });
  
  
    const formik = useFormik({
      initialValues: {
        code_barre : null,
        id_categorie : null,
        nom_bien : null,
        garantie : null,
        duree_de_vie : null,
        statut : 0,
      },
      validationSchema: BienSchema,
      onSubmit: async (values) => {
        await fetch("http://127.0.0.1:8000/api/add-bien", {
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(values)
        });
        setshowAlert(true);
      }
    });
  
    const getCategories = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/get-categories');
      setCategories(res.data.categories);
     };
     
     useEffect(() => {
      getCategories();
     },[]);
  
    const ITEM_HEIGHT = 48;
  
    const ContentStyle = styled('div')(({ theme }) => ({
      maxWidth: 600,
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(3, 0)
    }));
  
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  
    return (
      <>
      <Collapse in={showAlert} sx={{marginTop : '4px'}}>
            <Alert
              color='primary'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setshowAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Votre bien est ajouté ! 
            </Alert>
          </Collapse>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
  
                  <TextField
                    fullWidth
                    label="Code Barre"
                    {...getFieldProps('code_barre')}
                    onChange={formik.handleChange}
                    value={formik.values.code_barre}
                    error={Boolean(touched.code_barre && errors.code_barre)}
                    helperText={touched.code_barre && errors.code_barre}
                  />
  
                  <TextField  
                    fullWidth 
                    label="Nom" 
                    {...getFieldProps('nom_bien')} 
                    error={Boolean(touched.nom_bien && errors.nom_bien)}
                    helperText={touched.nom_bien && errors.nom_bien}
                  />
  
                  <FormControl fullWidth>
                    <InputLabel id="categorie-input-label">Catégorie</InputLabel>
                    <Select
                      labelId="categorie-input-label"
                      id="categorie-input"
                      {...getFieldProps('id_categorie')}
                      onChange={formik.handleChange}
                      label="Catégorie"
                      PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                          },
                      }}
                    >
                    {categories.map((item) => (
                      <MenuItem key={item.id_categorie} value={item.id_categorie}>{item.nom_categorie}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
  
                  <TextField  
                    fullWidth 
                    label="Garantie" 
                    {...getFieldProps('garantie')} 
                    onChange={formik.handleChange}
                    value={formik.values.garantie}
                    error={Boolean(touched.garantie && errors.garantie)}
                    helperText={touched.garantie && errors.garantie}
                  />
  
                  <TextField  
                    fullWidth 
                    label="Durée de vie" 
                    {...getFieldProps('duree_de_vie')} 
                    onChange={formik.handleChange}
                    value={formik.values.duree_de_vie}
                    error={Boolean(touched.duree_de_vie && errors.duree_de_vie)}
                    helperText={touched.duree_de_vie && errors.duree_de_vie}
                  />
  
                  <Field  
                    hidden
                    name="statut"
                    value="0"
                  />
  
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Ajouter bien
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
          </>
    );
  }
  