
import { Link as RouterLink } from 'react-router-dom';

// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableSortLabel,
  TableHead, TableFooter,
  TablePagination, Grid
} from '@mui/material';
//
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// components
import Page from '../../components/Page';
import  Registerbureau  from './Registerbureau';

// import BienMoreMenu from './BienMoreMenu';


// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }));
  
  const SectionStyle = styled('div')(({ theme }) => ({
    width: '65%',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0'
  }));
  
  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    overflow: 'hidden',
    maxHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  }));



// ----------------------------------------------------------------------


export default function Ajoutbureau() {



  return (
    <Page title="Ajout bureau">
      <Container>
       

      <RootStyle title="Register">
      

    

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
            Ajouter un nouveau bureau.
            </Typography>
            
          </Box>

         

          <Registerbureau />

         
    
        </ContentStyle>
      </Container>
    </RootStyle>
      </Container>
    </Page>
  );
}
