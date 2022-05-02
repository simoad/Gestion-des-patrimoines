// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Reclamations',
    path: '/reclamation/NonRepondu',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'ReclamationsRepondu',
    path: '/reclamation/Repondu',
    icon: getIcon('eva:shopping-bag-fill')
  }
];

export default sidebarConfig;
