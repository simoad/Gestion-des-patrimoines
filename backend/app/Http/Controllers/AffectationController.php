<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Affectation;
use App\Models\Historique;
use App\Models\Gestionnaire;
use App\Models\Bien;
use App\Models\Departement;
use App\Events\seuilNotificationEvent;

class AffectationController extends Controller
{
    function affect(Request $request){
        $affectation = new Affectation;
        $affectation->code_barre = $request->input('code_barre');
        $affectation->id_bureau  = $request->input('id_bureau');
        $affectation->id_gestionnaire = $request->input('id_gestionnaire');
        $affectation->save();

        //Historique
        $historique = new Historique;
        $gestionnaire = Gestionnaire::where('id_gestionnaire',$request->input('id_gestionnaire'))->first();
        $departement = Departement::where('id_departement',$request->input('id_departement'))->first();
        $nomDepartement = $departement->nom_departement;
        $historique->action = "Affectation du bien ".$request->input('code_barre')." par le gestionnaire ".$gestionnaire->nom." ".$gestionnaire->prenom." au bureau ".$request->input('id_bureau')." département ".$nomDepartement;
        $historique->type_action = "affectation";
        $historique->save();

        $bien = Bien::where('code_barre',$request->input('code_barre'));
        $bien->update([
            'statut'       => 1
            ]);
        return response()->json([
            'status'=> 200,
            'biens'=>'le Bien est affecté au bureau avec changement de son statut',
        ]);
        broadcast(new App\Events\seuilNotificationEvent());

    }
}
