import { Navigate, useRoutes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography
} from '@mui/material';
// layouts
import DashboardLayout from './layouts/dashboard';
import EmployeeDashboard from './layouts/employeeDashboard/EmployeeDashboard';
import ReclamationDashboard from './layouts/ServiceReclamation/ReclamationNonRepondu/ReclamationDashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import BienListToReclamer from './layouts/employeeDashboard/BienListToReclamer';
import TableOfReclamations from './layouts/ServiceReclamation/ReclamationNonRepondu/TableOfReclamations';
import TableOfReclamationsRepondu from './layouts/ServiceReclamation/ReclamationRepondu/TableOfReclamationsRepondu';
import AddBien from './pages/AddBien';
import EditBien from './pages/EditBien';
import BienList from './pages/BienList';
import SuiviBien from './pages/SuiviBien';
import Categories from './pages/Categories';
import BienRebut from './pages/BienRebut';
import GestionnaireNotifications from './pages/GestionnaireNotifications';
import GestionnaireHistory from './pages/GestionnaireHistory';




// ----------------------------------------------------------------------

export default function Router() {
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
  return useRoutes([

    // Gestionnaire 
    (localStorage.getItem('auth_role') === 'gestionnaire') ?
    {
      path: '/gestionnaire',
      element: <DashboardLayout user={user}/>,
      children: [
        { path: '/gestionnaire', element: <Navigate to="/gestionnaire/biens" /> },
        { path: 'biens', element: <BienList user={user}/> },
        { path: 'categories', element: <Categories user={user}/> },
        { path: 'addBien', element: <AddBien user={user}/> },
        { path: 'editBien/:id', element: <EditBien user={user}/> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'suiviBien/:id', element: <SuiviBien /> },
        { path: 'bienRebut', element: <BienRebut user={user}/> },
        { path: 'notifications', element: <GestionnaireNotifications /> },
        { path: 'historique', element: <GestionnaireHistory /> }
      ]
    }
    : <Navigate to="/login" />,

    // Employee 
    (localStorage.getItem('auth_role') === 'employee') ?
    {
      path: '/employee',
      element: <EmployeeDashboard />,
      children: [
        { path: 'biens/:id', element: <BienListToReclamer /> },
      ]
    } : <Navigate to="/login" />,

    // service_de_reclamation
    (localStorage.getItem('auth_role') === 'service_de_reclamation') ?
    {
      path: '/reclamation',
      element: <ReclamationDashboard />,
      children: [
        { path: 'NonRepondu', element: <TableOfReclamations /> },
        { path: 'Repondu', element: <TableOfReclamationsRepondu /> },
      ]
    } : <Navigate to="/login" />,

    // Public Route
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/login" /> }
      ]
    },
    { path: '*', element: <Navigate to="/login" replace /> }
  ]);
}




    