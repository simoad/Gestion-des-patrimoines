import * as React from 'react';
import { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as moment from 'moment';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
// material
import {
    Container,Stack,Typography
  } from '@mui/material';
// components
import Page from '../../components/Page';


export default function Adminsuivibien() {
  const {id} = useParams();
  const [Bien, setBien] = useState({
    code_barre : null,
    id_categorie : null,
    nom : null,
    garantie : null,
    duree_de_vie : null,
    statut : null,
    affectations : []
  });
  const [BienAffectation, setBienAffectation] = useState([]);
  const [DateRebut, setDateRebut] = useState();
  const getBien = async (idBien) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/suivi-bien/${idBien}`);
    setBien(res.data.bien);
    setDateRebut(res.data.date_rebut);
   };

   useEffect(() => {
    getBien(id);
    console.log(Bien);
   },[]);

   useEffect(() => {
    setBienAffectation(Bien.affectations);
    console.log(BienAffectation);
   },[Bien]);
  return (
    <Page title="Listes Des Biens">
    <Container>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Suivi du Bien {Bien.code_barre} : {Bien.nom}
          </Typography>
        </Stack>
    <Timeline position="alternate">

    {/* Rebut */}
    {DateRebut && <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          {moment(DateRebut).format("LLL")}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="error">
            <DeleteIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Rebut 
          </Typography>
          <Typography>Le bien est envoyé au rebut</Typography>
        </TimelineContent>
      </TimelineItem>
    }

    {/* Affectation */}
    {BienAffectation.reverse().map((row)=>(
      <TimelineItem key={row.id_affectation}>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          {moment(row.date_affectation).format('LLL')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <CheckCircleIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Affectation : {row.bureau.id_bureau}
          </Typography>
          <Typography>Département de {row.bureau.departement.nom_departement} </Typography>
        </TimelineContent>
      </TimelineItem>
      ))}

      {/* Arrivé au stock */}
      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          {moment(Bien.created_at).format('LLL')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector/>
          <TimelineDot color="secondary">
            <AddIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            L'arrivé au stock
          </Typography>
          <Typography>Le Bien est ajouté au stock</Typography>
        </TimelineContent>
      </TimelineItem>

    </Timeline>
    </Container>
    </Page>
  );
}