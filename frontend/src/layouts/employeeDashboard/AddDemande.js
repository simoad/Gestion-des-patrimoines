import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useFormik, Form, FormikProvider,Field } from 'formik';

// material
import { 
    TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,  
  Select ,
  InputLabel,
  FormControl,
  Grid,
  Collapse, Alert, IconButton,
 } from '@mui/material';
 import CloseIcon from '@mui/icons-material/Close';
 import { LoadingButton } from '@mui/lab';

 export default function AffecterBienDialog({getDemande,open,setOpen}){
    const [showAlert, setshowAlert] = useState(false);
    const [showAlertError, setshowAlertError] = useState(false);
    const [maxWidth, setMaxWidth] = useState('md');
    const [fullWidth, setFullWidth] = useState(false);

    const [user, setUser] = useState({
        nom:'',
        prenom:'',
        email:''
      });
      const getUser = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/user');
        setUser(res.data);
      }
    
       useEffect(() => { 
        getUser();
       },[]);

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
          nom_bien : null,
          description : null,
        },
        onSubmit: async (values) => {
          const res = await fetch(`http://127.0.0.1:8000/api/add-demande/${user.id_employe}`, {
          method: 'POST',
          headers:{"Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`},
          body: JSON.stringify(values)
          });
          getDemande();
          const response = await res.json();
          if (response.status === 200){setshowAlert(true);}
          else {setshowAlertError(true);}
        }
      });
  
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    const MyComponent = styled('div')({
      marginTop : '10px',
    });

    return(
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogTitle>Demander un bien</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Veuillez donner le nom du bien et une description de la demande.
          </DialogContentText>
          <Collapse in={showAlertError} sx={{marginTop : '4px'}}>
            <Alert
              severity="error"
              color='error'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setshowAlertError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              La demande du bien a reconnu un problème ! 
            </Alert>
          </Collapse>
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
              Votre demande est envoyée ! 
            </Alert>
          </Collapse>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                  <FormControl fullWidth>
                    <TextField
                    fullWidth
                    label="Nom du bien"
                    {...getFieldProps('nom_bien')}
                    error={Boolean(touched.nom_bien && errors.nom_bien)}
                    helperText={touched.nom_bien && errors.nom_bien}
                  />
                  </FormControl>

                  <FormControl fullWidth>
                    <TextField
                    fullWidth
                    label="Description"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  </FormControl>

                <Grid container justify="center">
                  <LoadingButton
                    sx={{ mx: 'auto', width: 200 }}
                    size="large"
                    width="medium"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Demander le bien
                  </LoadingButton>
                </Grid>
              </Stack>
            </Form>
          </FormikProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Quitter</Button>
        </DialogActions>
    </Dialog>
     );
 }