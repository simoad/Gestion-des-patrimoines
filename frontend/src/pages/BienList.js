import { filter } from 'lodash';
import axios from 'axios';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'code_barre', label: 'Code Barre', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'categorie', label: 'Categorie', alignRight: false },
  { id: 'garanttie', label: 'Garantie', alignRight: false },
  { id: 'duree_de_vie', label: 'Duree de vie', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------


export default function BienList() {

  const [Biens, setBiens] = useState([]);

  const getBiens = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/bien');
    setBiens(res.data.biens);
   };
   
   useEffect(() => {
    getBiens();
   },[]);
 

  return (
    <Page title="Listes Des Biens">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Biens
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/addBien"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Ajouter Bien
          </Button>
        </Stack>

        <Card>
          

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  
                />
                <TableBody>
                  {Biens
                    .map((row) => {
                         return (
                        <TableRow
                          hover
                          key={row.code_barre}
                          tabIndex={-1}
                          role="checkbox"
                        >
                        <TableCell align="left"/>
                          <TableCell align="left">{row.code_barre}</TableCell>
                          <TableCell align="left">{row.nom}</TableCell>
                          <TableCell align="left">{row.id_categorie}</TableCell>
                          <TableCell align="left">{row.garantie}</TableCell>
                          <TableCell align="left">
                            {row.duree_de_vie}
                          </TableCell>
                          <TableCell align="left">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  
                </TableBody>
                
              </Table>
            </TableContainer>
          </Scrollbar>

         
        </Card>
      </Container>
    </Page>
  );
}
