<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bien;

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

        return response()->json([
            'status'=> 200,
            'biens'=>'le Bien est ajouté',
        ]);
    }

    function edit($id){
        $bien = Bien::where('code_barre',$id)->get();
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
        'duree_de_vie' => $request->duree_de_vie,
        'statut'       => $request->statut
        ]);

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
}
