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
    title: 'Demandes des biens',
    path: '/gestionnaire/demandes',
    icon: getIcon('fluent:task-list-square-add-24-regular')
  },
  {
    title: 'Biens à envoyer au rebut',
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
  }
];

export default sidebarConfig;
