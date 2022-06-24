import axios from 'axios';
import { useState, useEffect } from 'react';
import * as moment from 'moment';
import { grey } from '@mui/material/colors';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableSortLabel,
  TableHead, 
  TablePagination, 
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Label from '../../components/Label';

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
  { id: 'action', label: 'Action', alignRight: false },
  { id: 'date_action', label: 'Date action', alignRight: false },
  { id: 'type_action', label: 'Type action', alignRight: false },
];

// ----------------------------------------------------------------------

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



export default function Adminhistorique() {

  const [historique, setHistorique] = useState([]);
  const [historiqueRebut, setHistoriqueRebut] = useState([]);
  const [historiqueAjout, setHistoriqueAjout] = useState([]);
  const [historiqueAffectation, setHistoriqueAffectation] = useState([]);
  const [historiqueModification, setHistoriqueModification] = useState([]);
  const [historyReclamation, setHistoryReclamation] = useState([]);


  const getGestionnaireHistory = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/gestionnaireHistoryForAdmin');
    setHistorique(res.data.historique);
   };

   const getGestionnaireHistoryRebut = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/gestionnaireHistoryRebut');
    setHistoriqueRebut(res.data.historique);
   };

   const getGestionnaireHistoryAjout = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/gestionnaireHistoryAjout');
    setHistoriqueAjout(res.data.historique);
   };

   const getGestionnaireHistoryAffectation = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/gestionnaireHistoryAffectation');
    setHistoriqueAffectation(res.data.historique);
   };

   const getGestionnaireHistoryModification = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/gestionnaireHistoryModification');
    setHistoriqueModification(res.data.historique);
   };
   const getGestionnaireHistoryReclamation = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/gestionnaireHistoryReclamation');
    setHistoryReclamation(res.data.historique);
   };
   
   useEffect(() => {

    getGestionnaireHistory();
    getGestionnaireHistoryRebut();
    getGestionnaireHistoryAjout();
    getGestionnaireHistoryAffectation();
    getGestionnaireHistoryModification();
    getGestionnaireHistoryReclamation();
   },[]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const greyy = grey[500];

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRowsHistorique =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - historique.length) : 0;

    const emptyRowsHistoriqueAjout =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - historiqueAjout.length) : 0;

    const emptyRowsHistoriqueModification =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - historiqueModification.length) : 0;

    const emptyRowsHistoriqueAffectation =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - historiqueAffectation.length) : 0;

    const emptyRowsHistoriqueRebut =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - historiqueRebut.length) : 0;

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
    <Page title="Gestionnaire historique">
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
          <Tab label="Ajout des biens" {...a11yProps(1)} />
          <Tab label="modification des biens" {...a11yProps(2)} />
          <Tab label="Rebut" {...a11yProps(3)} />
          <Tab label="Affectations" {...a11yProps(4)} />
          <Tab label="Reclamations" {...a11yProps(5)} />
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
                      ? historique.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : historique
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                        >
                          <TableCell align="left" >{row.action}</TableCell>
                          <TableCell align="left" >{moment(row.date_action).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align="left" >
                          <Label
                              variant="ghost"
                              color={(row.type_action === 'ajout' && 'info') || 
                              (row.type_action === 'modification' && 'warning') ||
                              (row.type_action === 'affectation' && 'success') || 
                              (row.type_action === 'reclamation' && 'secondary') || 
                              (row.type_action === 'rebut' && 'error')}
                            >
                              {row.type_action}
                            </Label></TableCell>
                        </TableRow>
                      )
                    )}
                  
                    {emptyRowsHistorique > 0 && (
                      <TableRow style={{ height: 53 * emptyRowsHistorique }}>
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
            count={historique.length}
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
                      ? historiqueAjout.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : historiqueAjout
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                        >
                          <TableCell align="left" >{row.action}</TableCell>
                          <TableCell align="left" >{moment(row.date_action).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align="left" >
                          <Label
                              variant="ghost"
                              color={(row.type_action === 'ajout' && 'info') || 
                              (row.type_action === 'modification' && 'warning') ||
                              (row.type_action === 'affectation' && 'success') || 
                              (row.type_action === 'rebut' && 'error')}
                            >
                              {row.type_action}
                            </Label></TableCell>
                        </TableRow>
                      )
                    )}
                  
                    {emptyRowsHistoriqueAjout > 0 && (
                      <TableRow style={{ height: 53 * emptyRowsHistoriqueAjout }}>
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
            count={historiqueAjout.length}
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
                      ? historiqueModification.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : historiqueModification
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                        >
                          <TableCell align="left" >{row.action}</TableCell>
                          <TableCell align="left" >{moment(row.date_action).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align="left" >
                          <Label
                              variant="ghost"
                              color={(row.type_action === 'ajout' && 'info') || 
                              (row.type_action === 'modification' && 'warning') ||
                              (row.type_action === 'affectation' && 'success') || 
                              (row.type_action === 'rebut' && 'error')}
                            >
                              {row.type_action}
                            </Label></TableCell>
                        </TableRow>
                      )
                    )}
                  
                    {emptyRowsHistoriqueModification > 0 && (
                      <TableRow style={{ height: 53 * emptyRowsHistoriqueModification }}>
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
            count={historiqueModification.length}
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
      <TabPanel value={value} index={3}>
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
                      ? historiqueRebut.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : historiqueRebut
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                        >
                          <TableCell align="left" >{row.action}</TableCell>
                          <TableCell align="left" >{moment(row.date_action).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align="left" >
                          <Label
                              variant="ghost"
                              color={(row.type_action === 'ajout' && 'info') || 
                              (row.type_action === 'modification' && 'warning') ||
                              (row.type_action === 'affectation' && 'success') || 
                              (row.type_action === 'rebut' && 'error')}
                            >
                              {row.type_action}
                            </Label></TableCell>
                        </TableRow>
                      )
                    )}
                  
                    {emptyRowsHistoriqueRebut > 0 && (
                      <TableRow style={{ height: 53 * emptyRowsHistoriqueRebut }}>
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
            count={historiqueRebut.length}
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
      <TabPanel value={value} index={4}>
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
                      ? historiqueAffectation.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : historiqueAffectation
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                        >
                          <TableCell align="left" >{row.action}</TableCell>
                          <TableCell align="left" >{moment(row.date_action).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align="left" >
                          <Label
                              variant="ghost"
                              color={(row.type_action === 'ajout' && 'info') || 
                              (row.type_action === 'modification' && 'warning') ||
                              (row.type_action === 'affectation' && 'success') || 
                              (row.type_action === 'rebut' && 'error')}
                            >
                              {row.type_action}
                            </Label></TableCell>
                        </TableRow>
                      )
                    )}
                  
                    {emptyRowsHistoriqueAffectation > 0 && (
                      <TableRow style={{ height: 53 * emptyRowsHistoriqueAffectation }}>
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
            count={historiqueAffectation.length}
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
      <TabPanel value={value} index={5}>
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
                      ? historyReclamation.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : historyReclamation
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                        >
                          <TableCell align="left" >{row.action}</TableCell>
                          <TableCell align="left" >{moment(row.date_action).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align="left" >
                          <Label
                              variant="ghost"
                              color={(row.type_action === 'ajout' && 'info') || 
                              (row.type_action === 'modification' && 'warning') ||
                              (row.type_action === 'affectation' && 'success') || 
                              (row.type_action === 'reclamation' && 'secondary') || 
                              (row.type_action === 'rebut' && 'error')}
                            >
                              {row.type_action}
                            </Label></TableCell>
                        </TableRow>
                      )
                    )}
                  
                    {emptyRowsHistorique > 0 && (
                      <TableRow style={{ height: 53 * emptyRowsHistorique }}>
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
            count={historique.length}
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
