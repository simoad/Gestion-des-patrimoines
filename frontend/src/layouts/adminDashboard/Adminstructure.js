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
import Iconify from '../../components/Iconify';
// components
import Page from '../../components/Page';
import Ajoutdepartement from './Ajoutdepartement';
import Scrollbar from '../../components/Scrollbar';
import Ajoutbureau2 from './Ajoutbureau2';


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
  
  { id: 'bureau', label: 'Bureau', alignRight: false },
  { id: 'departement', label: 'departement', alignRight: false },
 
  

];

// ----------------------------------------------------------------------


export default function Adminstructure({user}) {

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
  const [Structure, setStructure] = useState([]);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Structure.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStructure = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/getstructure');
    setStructure(res.data.structure);
   };

   
   
   useEffect(() => {
    getStructure();
    
   },[]);

  

  return (
    <Page title="Structure">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Structure
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="flex-end">
        <Ajoutdepartement     />
        <Ajoutbureau2     />
          {/* <Button
        sx={{ml:5}}
          variant="contained"
          component={RouterLink}
          to="/admin/ajoutbureau"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Ajouter Bureau
        </Button> */}
        </Stack>

         
        </Stack>
        
        <Card >
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}   >
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
                      ? Structure.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : Structure
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
                          
                          <TableCell align="left" >{row.id_bureau}</TableCell>
                          <TableCell align="left" >{row.nom_departement}</TableCell>
                         
                          
                          
                       
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
            count={Structure.length}
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
