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
import ListBienReclamer from './layouts/employeeDashboard/ListBienReclamer'
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
import TableOfRecRepondu from './layouts/ServiceReclamation/ReclamationRepondu/TableOfRecRepondu';
import AddBien from './pages/AddBien';
import EditBien from './pages/EditBien';
import BienList from './pages/BienList';
import SuiviBien from './pages/SuiviBien';
import Categories from './pages/Categories';
import BienRebut from './pages/BienRebut';
import GestionnaireNotifications from './pages/GestionnaireNotifications';
import GestionnaireHistory from './pages/GestionnaireHistory';
import AddDemande from './layouts/employeeDashboard/AddDemande';
import DemandeList from './layouts/employeeDashboard/DemandeList';
import Demandes from './pages/Demandes';




import AdminDashboard from './layouts/adminDashboard/AdminDashboard';
import EmployeesList from './layouts/adminDashboard/EmployeesList';
import FonctionnelList from './layouts/adminDashboard/FonctionnelList';
import Ajoutfonctionnel from './layouts/adminDashboard/Ajoutfonctionnel';
import Adminhistorique from './layouts/adminDashboard/Adminhistorique';
import Adminnotification from './layouts/adminDashboard/Adminnotification';
import Adminbien from './layouts/adminDashboard/Adminbien';
import Adminsuivibien from './layouts/adminDashboard/Adminsuivibien';
import Adminstructure from './layouts/adminDashboard/Adminstructure';
import Ajoutbureau from './layouts/adminDashboard/Ajoutbureau';


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
  }

   useEffect(() => { 
    getUser();
   },[]);
  return useRoutes([

    // Gestionnaire 
    (localStorage.getItem('auth_role') === 'gestionnaire') ?
    {
      path: '/gestionnaire',
      element: <DashboardLayout />,
      children: [
        { path: '/gestionnaire', element: <Navigate to="/gestionnaire/biens" /> },
        { path: 'biens', element: <BienList /> },
        { path: 'categories', element: <Categories /> },
        { path: 'addBien', element: <AddBien /> },
        { path: 'editBien/:id', element: <EditBien user={user}/> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'suiviBien/:id', element: <SuiviBien /> },
        { path: 'bienRebut', element: <BienRebut /> },
        { path: 'notifications', element: <GestionnaireNotifications /> },
        { path: 'historique', element: <GestionnaireHistory /> },
        { path: 'demandes', element: <Demandes /> }
      ]
    }
    : <Navigate to="/login" />,

    // admin 
    (localStorage.getItem('auth_role') === 'admin') ?
    {
      path: '/admin',
      element: <AdminDashboard />,
      children: [
        { path: 'bien', element: <Adminbien /> },
        { path: 'fonctionnels', element: <FonctionnelList/> },
        { path: 'ajout', element: <Ajoutfonctionnel /> },
        { path: 'historique', element: <Adminhistorique /> },
        { path: 'notification', element: <Adminnotification /> },
        { path: 'suiviBien/:id', element: <Adminsuivibien /> },
        { path: 'structure', element: <Adminstructure /> },
        { path: 'ajoutbureau', element: <Ajoutbureau /> },
        { path: 'register', element: <Register /> },
      ]

    } : <Navigate to="/login" />,
    

   // Employee 
   (localStorage.getItem('auth_role') === 'employee') ?
   {
     path: '/employee',
     element: <EmployeeDashboard/>,
     children: [
       { path: '/employee', element: <Navigate to="/employee/biens" /> },
       { path: 'biens', element: <BienListToReclamer /> },
       { path: 'Reclamations', element: <ListBienReclamer /> },
       { path: 'demande', element: <DemandeList /> },
       { path: 'addDemande', element: <AddDemande /> },
     ]
   } : <Navigate to="/login" />,

    // service_de_reclamation
    (localStorage.getItem('auth_role') === 'service_de_reclamation') ?
    {
      path: '/reclamation',
      element: <ReclamationDashboard />,
      children: [
        { path: 'NonRepondu', element: <TableOfReclamations /> },
        { path: 'Repondu', element: <TableOfRecRepondu /> },
      ]
    } : <Navigate to="/login" />,

    // Public Route
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/login" /> }
      ]
    },
    { path: '*', element: <Navigate to="/login" replace /> }
  ]);
}




    