<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\demandeBien;
use App\Models\Employee;
use App\Models\Historique;


class DemandeBienContoller extends Controller
{
    function store(Request $request, $id){
        $demandeBien = new demandeBien;
        $demandeBien->description = $request->input('description');
        $demandeBien->nom_bien    = $request->input('nom_bien');
        $demandeBien->etat    = 0;
        $demandeBien->id_employe = $id;
        $demandeBien->save();

        //historique
        $historique = new Historique;
        $employee = Employee::where('id_employe',$id)->first();
        $historique->action = "Demande du bien ".$request->input('nom_bien')." par l'employe ".$employee->nom." ".$employee->prenom;
        $historique->type_action = "Demande bien";
        $historique->save();

        return response()->json([
            'status'=> 200,
            'message'=>'la demande du bien est ajouté',
        ]);
    }

    function getById($id){
        $demandeBien = demandeBien::where('id_employe',$id)->orderBy('id_demande_bien', 'desc')->get();
        return response()->json([
            'status'=> 200,
            'demandeBien'=>$demandeBien,
        ]);
    }

    function getDemandes(){
        $demandeBien = demandeBien::orderBy('id_demande_bien', 'desc')->get();
        return response()->json([
            'status'=> 200,
            'demandeBien'=>$demandeBien,
        ]);
    }

    function confirmerConsulterDemande(Request $request){
        $demande = demandeBien::where('id_demande_bien',$request->demande);

        $demande->update([
        'etat'          => 1,
        ]);

        return response()->json([
            'status'=> 200,
            'message'=>'Demande est bien consultée',
        ]);
    }
}
