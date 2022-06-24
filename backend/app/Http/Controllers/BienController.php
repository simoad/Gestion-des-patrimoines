<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bien;
use App\Models\Historique;
use App\Models\Gestionnaire;
use App\Models\Action;
use App\Models\Reponse_reclamation;

class BienController extends Controller
{
    function index(){
        $biens = Bien::all();
        
        foreach ($biens as $bien) {
            if($bien->statut===0){
                $bien->statut = 'non affecté';
            } else if ($bien->statut===1) {
                $bien->statut = 'affecté';
            } else if ($bien->statut===-1) {
                $bien->statut = 'rébut';
            }
        }
        
        return response()->json([
            'status'=> 200,
            'biens'=>$biens,
        ]);
    }

    function store(Request $request){
        $bien = new Bien;
        $bien->code_barre   = $request->input('code_barre');
        $bien->id_categorie = $request->input('id_categorie');
        $bien->nom          = $request->input('nom_bien');
        $bien->garantie     = $request->input('garantie');
        $bien->duree_de_vie = $request->input('duree_de_vie');
        $bien->statut       = $request->input('statut');
        $bien->save();

        //historique
        $historique = new Historique;
        $gestionnaire = Gestionnaire::where('id_gestionnaire',$request->input('id_gestionnaire'))->first();
        $historique->action = "ajout du bien ".$request->input('code_barre')." par le gestionnaire ".$gestionnaire->nom." ".$gestionnaire->prenom;
        $historique->type_action = "ajout";
        $historique->save();

        return response()->json([
            'status'=> 200,
            'biens'=>'le Bien est ajouté',
        ]);
    }

    function suiviBien($id){
        $bien = Bien::where('code_barre',$id)->with('affectations')->first();
        if($bien->statut === -1){
            $rebut = Action::where('code_barre',$id)->where('type_action','rebut')->first();
            $date_rebut = $rebut->date_action;
            return response()->json([
                'status'=> 200,
                'bien'=>$bien,
                'date_rebut'=>$date_rebut
            ]);
        } else {
            return response()->json([
                'status'=> 200,
                'bien'=>$bien,
            ]);
        }
    }

    function edit($id){
        $bien = Bien::where('code_barre',$id)->first();
        return response()->json([
            'status'=> 200,
            'bien'=>$bien,
        ]);
    }

    function update(Request $request){
        $bien = Bien::where('code_barre',$request->code_barre);

        $bien->update([
        'id_categorie' => $request->id_categorie,
        'nom'          => $request->nom_bien,
        'garantie'     => $request->garantie,
        'duree_de_vie' => $request->duree_de_vie
        ]);

        //historique
        $historique = new Historique;
        $gestionnaire = Gestionnaire::where('id_gestionnaire',$request->input('id_gestionnaire'))->first();
        $historique->action = "mise à jour du bien ".$request->input('code_barre')." par le gestionnaire ".$gestionnaire->nom." ".$gestionnaire->prenom;
        $historique->type_action = "modification";
        $historique->save();

        return response()->json([
            'status'=> 200,
            'biens'=>'le Bien est mis a jour',
        ]);

    }

    function delete($id){
        $result= Bien::where('code_barre',$id)->delete();
        if($result){
            return response()->json([
                'status'=> 200,
                'result'=>'le Bien est supprimé',
            ]);
        } else {
            return response()->json([
                'result'=>'le Bien n est pas supprimé',
            ]);
        }
    }

    function getBienAEnvoyerRebut(){
        $biens = Reponse_reclamation::where('ServiceResponce', 'En Rebut')->with('reclamation')->get();

        return response()->json([
            'status'=> 200,
            'biens'=>$biens,
        ]);
    }

    function EnvoyezAuRebut(Request $request){
        $bien = Bien::where('code_barre',$request->code_barre);

        //historique
        $historique = new Historique;
        $gestionnaire = Gestionnaire::where('id_gestionnaire',$request->input('id_gestionnaire'))->first();
        $historique->action = "Envoie au rebut du bien ".$request->input('code_barre')." par le gestionnaire ".$gestionnaire->nom." ".$gestionnaire->prenom;
        $historique->type_action = "rebut";
        $historique->save();

        //Action
        $action = new Action;
        $action->code_barre = $request->input('code_barre');
        $action->id_gestionnaire = $request->input('id_gestionnaire');
        $action->type_action = "rebut";
        $action->save();

        $bien->update([
        'statut'          => -1,
        ]);

        return response()->json([
            'status'=> 200,
            'message'=>'Bien envoyez au rebut',
        ]);
    }
}
