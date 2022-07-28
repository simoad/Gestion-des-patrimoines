import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbarEmployeeService from '../../employeeDashboard/DashboardNavbarEmployeeService';
import ReclamationDashboardSidebar from './ReclamationDashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;


const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function ReclamationDashboard() {
  const [open, setOpen] = useState(false);

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
  

  return (
    <RootStyle>
      <DashboardNavbarEmployeeService user={user} onOpenSidebar={() => setOpen(true)} />
      <ReclamationDashboardSidebar user={user}  isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}