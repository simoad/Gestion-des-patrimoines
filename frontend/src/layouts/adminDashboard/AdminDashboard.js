import { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from '../dashboard/DashboardNavbar';
import AdminDashboardSidebar from './AdminDashboardSidebar';

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

export default function AdminDashboard() {

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

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} user={user}/>
      <AdminDashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} user={user}/>
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}