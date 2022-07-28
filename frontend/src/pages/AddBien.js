import * as Yup from 'yup';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useFormik, Form, FormikProvider, Field } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { Stack, 
  Typography, 
  Container, 
  Collapse, Alert, IconButton,
} from '@mui/material'; 
import CloseIcon from '@mui/icons-material/Close';
// component
import Page from '../components/Page';
import AddBienForm from './AddBienForm';

// ----------------------------------------------------------------------

export default function AddBien() {
  const [categories, setCategories] = useState([{
    id_categorie : 1,
    nom_categorie : ''
  }]);

  const [user, setUser] = useState({
    nom:'',
    prenom:'',
    email:''
  });
  const getUser = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/user');
    setUser(res.data);
    console.log(user); 
  }

   useEffect(() => { 
    getUser();
   },[]);

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
      headers:{"Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('auth_token')}`},
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
    <Page title="Ajouter votre biens">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ajouter votre biens
          </Typography>
        </Stack>
      <ContentStyle>
      <Collapse in={showAlert}>
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
        <AddBienForm user={user}/>
      </ContentStyle>
      </Container>
    </Page>
  );
}
