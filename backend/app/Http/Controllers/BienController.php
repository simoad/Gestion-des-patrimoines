<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bien;

class BienController extends Controller
{
    function index(){
        $biens = Bien::all();
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

        return response()->json([
            'status'=> 200,
            'biens'=>'le Bien est ajouté',
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
}
