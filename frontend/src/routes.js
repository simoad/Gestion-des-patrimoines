import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import EmployeeDashboard from './layouts/employeeDashboard/EmployeeDashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import BienList2 from './layouts/employeeDashboard/BienList2';
import AddBien from './pages/AddBien';
import EditBien from './pages/EditBien';
import BienList from './pages/BienList';
import Categories from './pages/Categories';



// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/gestionnaire',
      element: <DashboardLayout />,
      children: [
        { path: 'biens', element: <BienList /> },
        { path: 'categories', element: <Categories /> },
        { path: 'addBien', element: <AddBien /> },
        { path: 'editBien/:id', element: <EditBien /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/employee',
      element: <EmployeeDashboard />,
      children: [
        { path: 'biens/:id', element: <BienList2 /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
