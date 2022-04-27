import * as Yup from 'yup';
import { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik, Form, FormikProvider, Field } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { Stack, 
  TextField, 
  Typography, 
  Container, 
  Select ,
  Collapse, Alert, IconButton,
  MenuItem,
  InputLabel,
  FormControl, OutlinedInput
} from '@mui/material'; 
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
// component
import Page from '../components/Page';
import EditBienForm from './EditBienForm';

// ----------------------------------------------------------------------

export default function EditBien() {
  const [categories, setCategories] = useState([{
    id_categorie : 1,
    nom_categorie : ''
  }]);
  const[bienEdit , setbienEdit] = useState({
      code_barre : null,
      id_categorie : null,
      nom : null,
      garantie : null,
      duree_de_vie : null,
      statut : 0,
  });
  const [showAlert, setshowAlert] = useState(false);
  const {id} = useParams();

  const BienSchema = Yup.object().shape({
    code_barre : Yup.string().min(2, 'Trop court!').required('Code Barre est requis'),
    id_categorie : Yup.number().required('Categorie est requis'),
    nom_bien : Yup.string().min(2, 'Trop court!').required('Nom est requis'),
    garantie : Yup.number().required('Garantie est requis'),
    duree_de_vie : Yup.number().required('Duree de vie est requis')
  });


  const formik = useFormik({
    initialValues: {
      code_barre : bienEdit.code_barre || null,
      id_categorie : bienEdit.id_categorie || null,
      nom_bien : bienEdit.nom || null,
      garantie : bienEdit.garantie || null,
      duree_de_vie : bienEdit.duree_de_vie || null,
      statut : bienEdit.statut || 0,
    },
    validationSchema: BienSchema,
    onSubmit: async (values) => {
      await fetch(`http://127.0.0.1:8000/api/update-bien/${values.code_barre}`, {
      method: 'PUT',
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

   const editBien = async (idBien) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/edit-bien/${idBien}`);
    setbienEdit(res.data.bien[0]);
  };
   
   useEffect(() => {
    getCategories();
    editBien(id);
    console.log(bienEdit);
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

  return (
    <Page title="Ajouter votre biens">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Modifier votre biens
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
          Votre bien est modifié ! 
        </Alert>
      </Collapse>
        <EditBienForm />
      </ContentStyle>
      </Container>
    </Page>
  );
}
