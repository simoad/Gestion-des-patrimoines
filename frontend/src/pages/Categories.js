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
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
import ModificationSeuilCell from './ModificationSeuilCell';
import AjoutCategorieDialog from './AjoutCategorieDialog';

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
  { id: 'Id_catégories', label: 'Id catégories', alignRight: false },
  { id: 'nom_catégorie', label: 'Nom catégorie', alignRight: false },
  { id: 'seuil', label: 'Seuil', alignRight: false },
  { id: 'modification_seuil', label: 'Modification du seuil', alignRight: false },
];

// ----------------------------------------------------------------------


export default function BienList() {

  const [categories, setCategories] = useState([{
    id_categorie : 1,
    nom_categorie : '',
    seuil:1
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


   const getCategories = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/get-categories');
    setCategories(res.data.categories);
   };
   
   useEffect(() => {
    getCategories();
   },[]);
 

  return (
    <Page title="Catégorie des biens">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Catégorie des biens
          </Typography>
          <Button
            sx={{
                '&:hover': {
                color: '#fff',
                },
              }}
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={handleClickOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Ajouter Catégorie
          </Button>
          <AjoutCategorieDialog getCategories={getCategories} open={open} setOpen={setOpen}/>
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
                      ? categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : categories
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id_categorie}
                          tabIndex={-1}
                        >
                          <TableCell align="left">{row.id_categorie}</TableCell>
                          <TableCell align="left">{row.nom_categorie}</TableCell>
                          <TableCell align="left">{row.seuil}</TableCell>
                          <TableCell align="left">
                          <ModificationSeuilCell getCategories={getCategories} idCat={row.id_categorie} seuilCategorie={row.seuil}/>
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
                      count={categories.length}
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
