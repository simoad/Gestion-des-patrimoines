// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Biens',
    path: '/gestionnaire/biens',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'Catégories',
    path: '/gestionnaire/categories',
    icon: getIcon('bx:category')
  },
  {
    title: 'Biens à envoyés au rebut',
    path: '/gestionnaire/bienRebut',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'Notifications',
    path: '/gestionnaire/notifications',
    icon: getIcon('clarity:notification-line')
  },
  {
    title: 'Historique',
    path: '/gestionnaire/historique',
    icon: getIcon('ant-design:history-outlined')
  },
  {
    title: '',
    path: '/gestionnaire/ffff',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'dashboard',
    path: '/gestionnaire/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'user',
    path: '/gestionnaire/user',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'product',
    path: '/gestionnaire/products',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'blog',
    path: '/gestionnaire/blog',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill')
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill')
  }
];

export default sidebarConfig;
