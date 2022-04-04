<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Affectation;
use App\Models\Bien;


class AffectationController extends Controller
{
    function affect(Request $request){
        $affectation = new Affectation;
        $affectation->code_barre = $request->input('code_barre');
        $affectation->id_bureau  = $request->input('id_bureau');
        $affectation->save();

        $bien = Bien::where('code_barre',$request->input('code_barre'));
        $bien->update([
            'statut'       => 1
            ]);
        
        return response()->json([
            'status'=> 200,
            'biens'=>'le Bien est affecté au bureau avec changement de son statut',
        ]);
    }
}
