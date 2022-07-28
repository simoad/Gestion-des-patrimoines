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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
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
  { id: 'type_status', label: 'type status', alignRight: false }
];

//----------------------------------

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  



// ----------------------------------------------------------------------


export default function TableOfRecReponduTest() {

    //----------------------------
    const [reclamations, setReclamations] = useState([]);
    const [biensEnRebut, setbiensEnRebut] = useState([]);
    const [biensEnReparation, setbiensEnReparation] = useState([]);

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
    

    const [user, setUser] = useState({
      nom:'',
      prenom:'',
      email:''
    });
    const getUser = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/user');
      setUser(res.data);
    }
  
     useEffect(() => { 
      getUser();
     },[]);

     const getbiensEnRebut = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/get_all_biens_En_Rebut/${user.id_service_recl}`);
      setbiensEnRebut(res.data.Biens_Rebut);
     };
  
     const getbiensEnReparation = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/get_all_biens_En_Reparation/${user.id_service_recl}`);
      setbiensEnReparation(res.data.Biens_Reparation);
     };

     const getReclamations = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/getReclamationsRepondu/${user.id_service_recl}`);
      setReclamations(res.data.reclamations);
     };
  
     useEffect(() => {
      getReclamations();
      getbiensEnReparation();
      getbiensEnRebut();
     },[reclamations]);

    //-------------------------------

  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reclamations.length) : 0;
  const emptyRowsBiensRebut =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - biensEnRebut.length) : 0;
  const emptyRowsBiensReparation =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - biensEnReparation.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

   
   
   

  

   
 
  
   
  return (
    <Page title="Listes Des Biens">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Historique
          </Typography>
        </Stack>

      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tous" {...a11yProps(0)} />
          <Tab label="Biens Réparer" {...a11yProps(1)} />
          <Tab label="Biens En Rebut" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
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
                          <TableCell align="left">{row.employe}</TableCell>
                          <TableCell align="left">{row.produit} </TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">{moment(row.date_reclamation).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align="left">
                          <Label
                              variant="ghost"
                              color={(row.ServiceResponce === 'En Rebut') ? 'error' : 'success'}
                            >
                            {row.ServiceResponce }
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
        </TabPanel>
        <TabPanel value={value} index={1}>
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
                      ? biensEnReparation.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : biensEnReparation
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id_reclamation}
                          tabIndex={-1}
                        >
                          <TableCell align="left">{row.code_barre}</TableCell>
                          <TableCell align="left">{row.employe}</TableCell>
                          <TableCell align="left">{row.produit} </TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">{moment(row.date_reclamation).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align="left">
                          <Label
                              variant="ghost"
                              color={(row.ServiceResponce === 'En Rebut') ? 'error' : 'success'}
                            >
                            {row.ServiceResponce }
                            </Label>
                           
                          </TableCell>
         </TableRow>
                      )
                    )}
                  
                    {emptyRowsBiensReparation > 0 && (
                      <TableRow style={{ height: 53 * emptyRowsBiensReparation }}>
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
                      count={biensEnReparation.length}
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
        </TabPanel>
        <TabPanel value={value} index={2}>
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
                      ? biensEnRebut.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : biensEnRebut
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id_reclamation}
                          tabIndex={-1}
                        >
                          <TableCell align="left">{row.code_barre}</TableCell>
                          <TableCell align="left">{row.employe}</TableCell>
                          <TableCell align="left">{row.produit} </TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">{moment(row.date_reclamation).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align="left">
                          <Label
                              variant="ghost"
                              color={(row.ServiceResponce === 'En Rebut') ? 'error' : 'success'}
                            >
                            {row.ServiceResponce }
                            </Label>
                           
                          </TableCell>
         </TableRow>
                      )
                    )}
                  
                    {emptyRowsBiensRebut > 0 && (
                      <TableRow style={{ height: 53 * emptyRowsBiensRebut }}>
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
                      count={biensEnRebut.length}
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
        </TabPanel>
        </Box>
      </Container>
    </Page>
  );
}
