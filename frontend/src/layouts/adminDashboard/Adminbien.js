import axios from 'axios';
import { useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { Link as RouterLink , useNavigate} from 'react-router-dom';
import Popover from '@mui/material/Popover';
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
  { id: 'statut', label: 'Statut', alignRight: false }

];

// ----------------------------------------------------------------------


export default function Adminbien({user}) {

  // Popover Start
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  // Popover End

  const navigate = useNavigate();
  const [Biens, setBiens] = useState([]);
  const [categories, setCategories] = useState([{
    id_categorie : 1,
    nom_categorie : ''
  }]);

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

  const getBiens = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/bien');
    setBiens(res.data.biens);
   };

   const getCategories = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/get-categories');
    setCategories(res.data.categories);
   };
   
   useEffect(() => {
    getBiens();
    getCategories();
   },[]);
 

  return (
    <Page title="Listes Des Biens">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Biens
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
                      ? Biens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : Biens
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.code_barre}
                          tabIndex={-1}
                          aria-owns={openPop ? 'mouse-over-popover' : undefined}
                          aria-haspopup="true"
                          onMouseEnter={handlePopoverOpen}
                          onMouseLeave={handlePopoverClose}
                        >
                          <TableCell align="left" onClick={()=>{navigate(`/admin/suiviBien/${row.code_barre}`, { replace: true });}}>{row.code_barre}</TableCell>
                          <TableCell align="left" onClick={()=>{navigate(`/admin/suiviBien/${row.code_barre}`, { replace: true });}}>{row.nom}</TableCell>
                          <TableCell align="left" onClick={()=>{navigate(`/admin/suiviBien/${row.code_barre}`, { replace: true });}}>{categories.map((item) => row.id_categorie===item.id_categorie && item.nom_categorie)}</TableCell>
                          <TableCell align="left" onClick={()=>{navigate(`/admin/suiviBien/${row.code_barre}`, { replace: true });}}>{row.garantie}</TableCell>
                          <TableCell align="left" onClick={()=>{navigate(`/admin/suiviBien/${row.code_barre}`, { replace: true });}}>{row.duree_de_vie}</TableCell>
                          <TableCell align="left" onClick={()=>{navigate(`/admin/suiviBien/${row.code_barre}`, { replace: true });}}>
                          <Label
                              variant="ghost"
                              color={(row.statut === 'non affecté' && 'info') || 
                              (row.statut === 'affecté' && 'success') || 
                              (row.statut === 'rébut' && 'error')}
                            >
                              {row.statut}
                            </Label>
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

          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: 'none',
            }}
            open={openPop}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p:2 , fontSize : '15px', color : '#161C24', fontWeight: 'bold'}}>
            Veuillez clicker pour suivre le bien
            </Typography>
          </Popover>
        </Card>
      </Container>
    </Page>
  );
}
