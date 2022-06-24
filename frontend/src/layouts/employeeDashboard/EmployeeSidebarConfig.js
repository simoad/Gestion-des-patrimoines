import { useState, useEffect } from 'react';
import axios from 'axios';

// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export function User() {
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

   return user.id_employe;
}

const sidebarConfig = [
  {
    title: 'Biens',
    path: '/employee/biens',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'Demande des biens',
    path: '/employee/demande',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'reclamations',
    path: '/employee/Reclamations',
    icon: getIcon('eva:shopping-bag-fill')
  }
];

export default sidebarConfig;
