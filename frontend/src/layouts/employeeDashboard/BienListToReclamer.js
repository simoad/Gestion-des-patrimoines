import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import ReclamationDes from './ReclamationDes';
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
  { id: 'code_barre', label: 'Code Barre', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'categorie', label: 'Categorie', alignRight: false },
  { id: 'garanttie', label: 'Garantie', alignRight: false },
  { id: 'duree_de_vie', label: 'Duree de vie', alignRight: false },
  { id: 'reclamation', label: 'reclamation', alignRight: false }
];

// ----------------------------------------------------------------------


export default function BienListToReclamer() {

  const [Biens, setBiens] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Biens.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
 
  const getBiens = async () => {
   
    const res = await axios.get(`http://127.0.0.1:8000/api/get-employee/${user.id_employe}`);
    setBiens(res.data.employe.bureau.affectations);
   };
   
   useEffect(() => {
    getBiens();
   },[user]);
 
  return (
    <Page title="Listes Des Biens">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
             reclamation des équipement
          </Typography>
         
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{  minWidth: 800 }}>
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
                      ? Biens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : Biens
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.code_barre}
                          tabIndex={-1}
                        >
                          <TableCell align="left">{row.bien.code_barre}</TableCell>
                          <TableCell align="left">{row.bien.nom}</TableCell>
                          <TableCell align="left">{row.bien.id_categorie}</TableCell>
                          <TableCell align="left">{row.bien.garantie}</TableCell>
                          <TableCell align="left">{row.bien.duree_de_vie}</TableCell>
                         
                          <TableCell align="left">
                           
                            <ReclamationDes getBiens={getBiens} codeBarre={row.bien.code_barre} user={user} />
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
                      count={Biens.length}
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
