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

export default function EditBien({user}) {
  const [showAlert, setshowAlert] = useState(false);

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
        <EditBienForm user={user}/>
      </ContentStyle>
      </Container>
    </Page>
  );
}
