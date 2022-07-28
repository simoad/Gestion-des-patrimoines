import axios from 'axios';
import { useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
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
  ButtonGroup,
  TableHead, TableFooter,
  TablePagination, Grid
} from '@mui/material';

// 
import * as moment from 'moment';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
// components
import Page from '../../../components/Page';
import ButtonAlertAccept from './ButtonAlertAccept';
import ButtonToRebut from './ButtonToRebut';
import Scrollbar from '../../../components/Scrollbar';
// ----------------------------------------------------------------------

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const TABLE_HEAD = [
  { id: 'code_barre', label: 'code barre', alignRight: false },
  { id: 'employee', label: 'employee', alignRight: false },
  { id: 'produit', label: 'produit', alignRight: false },
  { id: 'description', label: 'description', alignRight: false },
  { id: 'date_reclamation', label: 'date_reclamation', alignRight: false },
  { id: 'reparation', label: 'reparation', alignRight: false },
  { id: 'rebut', label: 'Rebut', alignRight: false }
];

// ----------------------------------------------------------------------


export default function TableOfReclamations() {

  const [reclamations, setReclamations] = useState([]);
  const [reclamateurs, setReclamateurs] = useState([]);
  const [biens, setBiens] = useState([]);

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [date, setDate] = useState();

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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reclamations.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 
  

   const getReclamations = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/getReclamationsNonRepondu');
    setReclamations(res.data.reclamations);
   };
  
  

   const getReclamateurs = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/get_reclamateurs');
     setReclamateurs(res.data.reclamateurs);
   };
   
   

   const getBiens = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/get_Biens');
     setBiens(res.data.biens);
   };

   useEffect(() => {
    getReclamations();
    getReclamateurs();
    getBiens();
   },[]);
 

  return (
    <Page title="Listes Des Biens">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          les Reclamations
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}>
                          <TableSortLabel hideSortIcon>
                            {headCell.label}
                          </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                      ? reclamations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : reclamations
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id_reclamation}
                          tabIndex={-1}
                        >
                          <TableCell align="left">{row.code_barre}</TableCell>
                          <TableCell align="left">{reclamateurs.map((item1) => row.id_employe===item1.id_employe && item1.nom)}</TableCell>
                          <TableCell align="left">{biens.map((item2) => row.code_barre===item2.code_barre && item2.nom)}</TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">{moment(row.date_reclamation).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align="left">
                          <ButtonAlertAccept user={user}  codeBarre={row.code_barre} idEmployee={row.id_employe}  idReclamation={row.id_reclamation}  getReclamations={getReclamations} nomProduit={biens.map((item2) => row.code_barre===item2.code_barre && item2.nom)}/>
                              
                          </TableCell>
                          <TableCell align="left">
                          <ButtonToRebut user={user} codeBarre={row.code_barre}  idEmployee={row.id_employe} idReclamation={row.id_reclamation} getReclamations={getReclamations} nomProduit={biens.map((item2) => row.code_barre===item2.code_barre && item2.nom)}/>
                          </TableCell>
         </TableRow>
                      )
                    )}
                  
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
          sx={{marginRight : "40px"}}
          component='div'
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={3}
                      count={reclamations.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
        </Card>
      </Container>
    </Page>
  );
}
