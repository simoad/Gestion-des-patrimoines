<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Historique;
use App\Models\Gestionnaire;
use App\Models\Bien;
use App\Models\Employee;
use App\Models\Service_reclamation;
use App\Models\Departement;


class HistoriqueController extends Controller
{
    function AddBien($idGest, $codeBarre){
        $historique = new Historique;
        $gestionnaire = Gestionnaire::where('id_gestionnaire',$idGest)->first();
        $historique->action = "ajout du bien ".$codeBarre." par le gestionnaire ".$gestionnaire->nom." ".$gestionnaire->prenom;
        $historique->type_action = "ajout";
        $historique->save();

        return response()->json([
            'status'=> 200,
            'message'=>'action ajoutée à historique',
        ]);
    }

    function UpdateBien($idGest, $codeBarre){
        $historique = new Historique;
        $gestionnaire = Gestionnaire::where('id_gestionnaire',$idGest)->first();
        $historique->action = "mise à jour du bien ".$codeBarre." par le gestionnaire ".$gestionnaire->nom." ".$gestionnaire->prenom;
        $historique->type_action = "modification";
        $historique->save();

        return response()->json([
            'status'=> 200,
            'message'=>'action ajoutée à historique',
        ]);
    }

    function RebutBien($idGest, $codeBarre){
        $historique = new Historique;
        $gestionnaire = Gestionnaire::where('id_gestionnaire',$idGest)->first();
        $historique->action = "Envoie au rebut du bien ".$codeBarre." par le gestionnaire ".$gestionnaire->nom." ".$gestionnaire->prenom;
        $historique->type_action = "rebut";
        $historique->save();

        return response()->json([
            'status'=> 200,
            'message'=>'action ajoutée à historique',
        ]);
    }

    function AffectationBien($idGest, $codeBarre, $idBureau, $idDepart){
        $historique = new Historique;
        $gestionnaire = Gestionnaire::where('id_gestionnaire',$idGest)->first();
        $departement = Departement::where('id_departement',$idDepart)->first();
        $nomDepartement = $departement->nom_departement;
        $historique->action = "Affectation du bien ".$codeBarre." par le gestionnaire ".$gestionnaire->nom." ".$gestionnaire->prenom." au bureau ".$idBureau." département ".$nomDepartement;
        $historique->type_action = "affectation";
        $historique->save();

        return response()->json([
            'status'=> 200,
            'message'=>'action ajoutée à historique',
        ]);
    }

    function Reclamation($idEmpl, $codeBarre){
        $historique = new Historique;
        $employe = Employee::where('id_employe',$idEmpl)->first();
        $historique->action = "Reclamation du bien ".$codeBarre." par l'employé ".$employe->nom." ".$employe->prenom;
        $historique->type_action = "reclamation";
        $historique->save();

        return response()->json([
            'status'=> 200,
            'message'=>'action ajoutée à historique',
        ]);
    }

    function ReponseReclamation($idservice, $codeBarre){
        $historique = new Historique;
        $Service_reclamation = Service_reclamation::where('id_service_recl',$idservice)->first();
        $historique->action = "Réponse au Reclamation du bien ".$codeBarre." par l'employé ".$Service_reclamation->nom." ".$Service_reclamation->prenom." du service de réclamation.";
        $historique->type_action = "reponse reclamation";
        $historique->save();

        return response()->json([
            'status'=> 200,
            'message'=>'action ajoutée à historique',
        ]);
    }

    function getAdminHistory(){
        $historique = Historique::all();
        
        return response()->json([
            'status'=> 200,
            'historique'=>$historique,
        ]);
    }

    function getGestionnaireHistory(){
        $historique = Historique::where('type_action','rebut')
        ->orWhere('type_action','ajout')
        ->orWhere('type_action','modification')
        ->orWhere('type_action','affectation')
       
        ->orderBy('date_action', 'desc')->get();
        
        return response()->json([
            'status'=> 200,
            'historique'=>$historique,
        ]);
    }

    function getGestionnaireHistoryForAdmin(){
        $historique = Historique::where('type_action','rebut')
        ->orWhere('type_action','ajout')
        ->orWhere('type_action','modification')
        ->orWhere('type_action','affectation')
        ->orWhere('type_action','reclamation')
        ->orderBy('date_action', 'desc')->get();
        
        return response()->json([
            'status'=> 200,
            'historique'=>$historique,
        ]);
    }

    function getGestionnaireHistoryAjout(){
        $historique = Historique::where('type_action','ajout')->get();
        
        return response()->json([
            'status'=> 200,
            'historique'=>$historique,
        ]);
    }

    function getGestionnaireHistoryReclamation(){
        $historique = Historique::where('type_action','reclamation')->get();
        
        return response()->json([
            'status'=> 200,
            'historique'=>$historique,
        ]);
    }

    function getGestionnaireHistoryRebut(){
        $historique = Historique::where('type_action','rebut')->get();
        
        return response()->json([
            'status'=> 200,
            'historique'=>$historique,
        ]);
    }

    function getGestionnaireHistoryModification(){
        $historique = Historique::where('type_action','modification')->get();
        
        return response()->json([
            'status'=> 200,
            'historique'=>$historique,
        ]);
    }

    function getGestionnaireHistoryAffectation(){
        $historique = Historique::where('type_action','affectation')->get();
        
        return response()->json([
            'status'=> 200,
            'historique'=>$historique,
        ]);
    }
}
