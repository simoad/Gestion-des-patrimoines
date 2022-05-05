import { Navigate, useRoutes } from 'react-router-dom';
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
import Categories from './pages/Categories';



// ----------------------------------------------------------------------

export default function Router() {
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
        { path: 'editBien/:id', element: <EditBien /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
  
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




    