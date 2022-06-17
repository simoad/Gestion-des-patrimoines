// component
import Iconify from '../../components/Iconify';


// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [




  {
    title: 'Fonctionnels',
    path: '/admin/fonctionnels',
    icon: getIcon('eva:people-fill')
  },

  {
    title: 'Historiques',
    path: '/admin/historique',
    icon: getIcon('ant-design:history-outlined')
  },
  {
    title: 'Biens',
    path: '/admin/bien',
    icon: getIcon('eva:shopping-bag-fill')
  },
 
  {
    title: 'Ajouter Fonctionnaires',
    path: '/admin/ajout',
    icon: getIcon('eva:person-add-fill')
  },
  {
    title: 'Structure',
    path: '/admin/structure',
    icon: getIcon('bx:category')
  }


];

export default sidebarConfig;
