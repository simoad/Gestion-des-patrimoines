import axios from 'axios';
import { useState, useEffect } from 'react';
import * as moment from 'moment';
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
import Buttondelete from './Buttondelete';

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

const TABLE_HEAD_EMPLOYEE = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'Prenom', label: 'Prenom', alignRight: false },
  { id: 'Depatement', label: 'Departement', alignRight: false },
  { id: 'Bureau', label: 'Bureau', alignRight: false },
  { id: 'Action', label: 'Action', alignRight: false }
];
const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'Prenom', label: 'Prenom', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'Action', label: 'Action', alignRight: false }
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



export default function FonctionnelList() {

  const [Employees, setEmployees] = useState([]);
  const [Gestionnaires, setGestionnaires] = useState([]);
  const [Services, setServices] = useState([]);
  


  const getGestionnaires = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/get-allgestionnaire');
    setGestionnaires(res.data.all_gestionnaire_info);
   };

   const getEmployees = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/get-allemployee');
    setEmployees(res.data.all_employe_info);
  
  };

    const getServices = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/get-allservice');
      setServices(res.data.all_service_reclamation_info);
  
   };

   


   
   
   useEffect(() => {
    getGestionnaires();
    getEmployees();
    getServices();
   
   },[]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
   const roleemploye="deleteemploye";
   const roleservice="deleteservicerecl";
   const rolegestionnaire="deletegestionnaire";





 



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRowsemployees =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Employees.length) : 0;

    const emptyRowsgestionnaires =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Gestionnaires.length) : 0;

    const emptyRowsservice =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Services.length) : 0;

    

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
    <Page title="Fonctionnaires">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Fonctionnaires
          </Typography>
        </Stack>

        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Employees" {...a11yProps(0)} />
          <Tab label="Gestionnaires" {...a11yProps(1)} />
          <Tab label="Service de reclamation" {...a11yProps(2)} />
         
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD_EMPLOYEE.map((headCell) => (
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
                      ? Employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : Employees
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id_employe}
                          tabIndex={-1}
                        >
                          <TableCell align="left">{row.nom}</TableCell>
                          <TableCell align="left">{row.prenom}</TableCell>
                       
                         
                          <TableCell align="left">{row.nom_departement}</TableCell>
                          <TableCell align="left">{row.id_bureau}</TableCell>
                         
                          <TableCell align="left"><Buttondelete idfonctionnel={row.id_employe} nomfonctionnel={row.nom} prenomfonctionnel={row.prenom} getEmployees={getEmployees} getGestionnaires={getGestionnaires} getServices={getServices} role={roleemploye} /></TableCell>
                        </TableRow>
                      )
                    )}
                  
                    {emptyRowsemployees > 0 && (
                      <TableRow style={{ height: 53 * emptyRowsemployees }}>
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
            count={Employees.length}
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
                      ? Gestionnaires.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : Gestionnaires
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id_gestionnaire}
                          tabIndex={-1}
                        >
                         <TableCell align="left">{row.nom}</TableCell>
                          <TableCell align="left">{row.prenom}</TableCell>
                       
                         
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left"><Buttondelete idfonctionnel={row.id_gestionnaire} nomfonctionnel={row.nom} prenomfonctionnel={row.prenom} getEmployees={getEmployees} getGestionnaires={getGestionnaires} getServices={getServices} role={rolegestionnaire} /></TableCell>
                         
                         
                        </TableRow>
                      )
                    )}
                  
                    {emptyRowsgestionnaires > 0 && (
                      <TableRow style={{ height: 53 * emptyRowsgestionnaires }}>
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
            count={Gestionnaires.length}
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
                      ? Services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : Services
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id_service_recl}
                          tabIndex={-1}
                        >
                          <TableCell align="left">{row.nom}</TableCell>
                          <TableCell align="left">{row.prenom}</TableCell>
                       
                         
                          <TableCell align="left">{row.email}</TableCell>
                          <Buttondelete idfonctionnel={row.id_service_recl} nomfonctionnel={row.nom} prenomfonctionnel={row.prenom} getEmployees={getEmployees} getGestionnaires={getGestionnaires} getServices={getServices} role={roleservice} />
                         
                         
                        </TableRow>
                      )
                    )}
                  
                    {emptyRowsservice > 0 && (
                      <TableRow style={{ height: 53 * emptyRowsservice }}>
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
            count={Services.length}
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
