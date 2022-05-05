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
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import BienMoreMenu from './BienMoreMenu';
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
  { id: 'type_notif', label: 'Type Notification', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'date', label: 'Date Notification', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------


export default function GestionnaireNotifications() {

  const [Seuilnotifications, setSeuilNotifications] = useState([{
    id: null,
    title: 'Seuil de catégorie',
    description: '',
    createdAt: null,
    readAt: false
    }]);
  const [notifications, setNotifications] = useState([]);
  const totalUnRead = notifications.filter((item) => item.isUnRead === null).length;
  const navigate = useNavigate();
  const [Biens, setBiens] = useState([]);
  const [categories, setCategories] = useState([{
    id_categorie : 1,
    nom_categorie : ''
  }]);

  const marqueLu = async (id) => {
    const res = await axios.post(`http://127.0.0.1:8000/api/marqueAsRead/${id}`);
    getSeuilNotifications();
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

   const getSeuilNotifications = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/get-seuil-notifications');
      const notifications = [];
      res.data.seuilNotification.map((item)=>( 
        notifications.push({
          id: item.id,
          title: 'Seuil de catégorie',
          description: item.data.slice(1,item.data.length-1),
          avatar: null,
          type: 'chat_message',
          createdAt: item.created_at,
          isUnRead: item.read_at
        })));
      // const data = JSON.parse(res.data.seuilNotification.data);
      // Object.keys(data).forEach(key => {
      //   const notif = data[key];
      //   const categ = categories.map((item) => notif===item.id_categorie ? item.nom_categorie : null );
      //   const notification = {
      //     id: notif,
      //     title: 'Seuil de catégorie',
      //     description: `La categorie ${categ} a atteint son seuil`,
      //     createdAt: res.data.seuilNotification.created_at,
      //     readAt: res.data.seuilNotification.read_at
      //   }
      //   notifications.push(notification);
      // });
      setSeuilNotifications(notifications);
      console.log(notifications);
  };

   useEffect(() => {
    getSeuilNotifications();
   },[categories]);

   useEffect(()=>{
    setNotifications(Seuilnotifications);
    console.log('notif',notifications);
   },[Seuilnotifications]);

   const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - notifications.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 

  return (
    <Page title="Notifications">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Notifications
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ color: '#00AB55', fontSize : '16px', fontWeight: 'bold' }}>
              Vous avez {totalUnRead} messages non lues
            </Typography>
          </Box>
        </Box>
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
                      ? notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : notifications
                    ).map((row) => 
                         (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                        >
                          <TableCell align="left" >{row.title}</TableCell>
                          <TableCell align="left" >{row.description}</TableCell>
                          <TableCell align="left" >{row.createdAt}</TableCell>
                          <TableCell align="left">
                          {row.isUnRead ? 
                            <TableSortLabel
                             hideSortIcon 
                             sx={{ p:2 , fontSize : '15px', color : 'text.primary', fontWeight: 'bold'}}
                             >
                                lue le {row.isUnRead}
                            </TableSortLabel>
                            :
                          <TableSortLabel
                             hideSortIcon 
                             sx={{ p:2 , fontSize : '15px', color : '#00AB55', fontWeight: 'bold'}}
                             onClick={()=>marqueLu(row.id)}
                             >
                                Marqué comme lue <Iconify icon="eva:done-all-fill" width={20} height={20} />
                            </TableSortLabel>
                             }
                            
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
            count={notifications.length}
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
