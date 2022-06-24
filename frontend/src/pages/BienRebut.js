import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link as RouterLink , useNavigate} from 'react-router-dom';
import * as moment from 'moment';

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
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import ButtonToRebut from './ButtonToRebut';

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
  { id: 'nom_service', label: 'Nom d\'employé de service de reclamation', alignRight: false },
  { id: 'code_barre', label: 'Code Barre', alignRight: false },
  { id: 'nom_bien', label: 'Nom Bien', alignRight: false },
  { id: 'date_envoi', label: 'Date de réponse du service de reclamation', alignRight: false },
  { id: '', label: 'Envoyez au rebut', alignRight: false }
];

// ----------------------------------------------------------------------


export default function BienRebut({user}) {
    const navigate = useNavigate();
  const [BiensRebut, setBiensRebut] = useState([]);
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - BiensRebut.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getBiensRebut = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/bien-au-rebut`);
    setBiensRebut(res.data.biens);
   };

   const getService = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/get-services-reclamation`);
    setServices(res.data.services);
   };

   const envoyerAuRebut = async (idBien) => {
    const res = await axios.post(`http://127.0.0.1:8000/api/envoyer-au-rebut/${idBien}`);
    getBiensRebut();
   };
   
   useEffect(() => {
    getBiensRebut();
    getService();
   },[]); 

 

  return (
    <Page title="Listes Des Biens A Envoyer Au Rebut">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Biens à envoyer au rebut
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
                      ? BiensRebut.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : BiensRebut
                    ).map((row) => 
                         (row.reclamation.bien.statut !== -1 && 
                         <TableRow
                          hover
                          key={row.code_barre}
                          tabIndex={-1}
                        >
                        <TableCell align="left">{services.map((item) => row.id_service_recl===item.id_service_recl && `${item.nom} ${item.prenom}`)}</TableCell>
                        <TableCell align="left">{row.reclamation.bien.code_barre}</TableCell>
                          <TableCell align="left">{row.reclamation.bien.nom}</TableCell>
                          <TableCell align="left">{moment(row.date_reponse).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align="left">
                          {/* <Button variant="contained" onClick={envoyerAuRebut(row.reclamation.bien.code_barre)} color='error'>Envoyez au rebut</Button> */}
                          <ButtonToRebut user={user} getBiensRebut={getBiensRebut} codeBarre={row.reclamation.bien.code_barre} nomProduit={row.reclamation.bien.nom}/>
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
            count={BiensRebut.length}
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