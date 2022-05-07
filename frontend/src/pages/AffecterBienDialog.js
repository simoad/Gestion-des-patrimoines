import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { 
  MenuItem,
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

 export default function AffecterBienDialog({user,getBiens,open,setOpen,codeBarre}){

    const [departements, setDepartements] = useState([{
        id_departement : 1,
        nom_departement : ''
      }]);
      
    const [bureaux, setBureaux] = useState([{
      id_bureau : null,
    }]);

    const [showAlert, setshowAlert] = useState(false);
    const [showAlertError, setshowAlertError] = useState(false);


    const ITEM_HEIGHT = 48;
    const [maxWidth, setMaxWidth] = useState('md');
    const [fullWidth, setFullWidth] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
          id_gestionnaire : user.id_gestionnaire,
          id_departement : null,
          id_bureau : null,
          code_barre : codeBarre,
        },
        onSubmit: async (values) => {
          const res = await fetch(`http://127.0.0.1:8000/api/affect-bien`, {
          method: 'POST',
          headers:{"Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`},
          body: JSON.stringify(values)
          });
          getBiens();
          const response = await res.json();
          if (response.status === 200){setshowAlert(true);}
          else {setshowAlertError(true);}
        }
      });
    
    const getDepartements = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/get-departements');
      setDepartements(res.data.departements);
      };

      const getBureaux = async (id) => {
      const res = await axios.get(`http://127.0.0.1:8000/api/get-bureaux/${id}`);
      setBureaux(res.data.bureaux);
      };
      
      useEffect(() => {
      getDepartements();
      },[]);
  
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    const MyComponent = styled('div')({
      marginTop : '10px',
    });

    return(
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogTitle>Affecter votre bien</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Veuillez choisir le bureau auquel vous voulez affecté le bien
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
              L'affectation du bien a reconnu un problème ! 
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
              Votre bien est affecté ! 
            </Alert>
          </Collapse>
          <MyComponent>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                  <FormControl fullWidth>
                    <InputLabel id="departement-input-label">Département</InputLabel>
                    <Select
                      labelId="departement-input-label"
                      id="departement-input"
                      {...getFieldProps('id_departement')}
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
                      <MenuItem onClick={()=>getBureaux(item.id_departement)} key={item.id_departement} value={item.id_departement}>{item.nom_departement}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="bureaux-input-label">Bureaux</InputLabel>
                    <Select
                      labelId="bureaux-input-label"
                      id="bureaux-input"
                      {...getFieldProps('id_bureau')}
                      onChange={formik.handleChange}
                      label="Bureaux"
                      PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                          },
                      }}
                    >
                    {bureaux.map((item) => (
                      <MenuItem key={item.id_bureau} value={item.id_bureau}>{item.id_bureau}</MenuItem>
                      ))}
                    </Select>
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
                    Affecter bien
                  </LoadingButton>
                </Grid>
              </Stack>
            </Form>
          </FormikProvider>
          </MyComponent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Quitter</Button>
        </DialogActions>
    </Dialog>
     );
 }