<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;


class CategorieController extends Controller
{
    function index(){
        $categories = Categorie::all();
        return response()->json([
            'status'=> 200,
            'categories'=>$categories,
        ]);
    }

    function updateSeuil($id, Request $request){
        $categorie = Categorie::where('id_categorie',$id);

        $categorie->update([
            'seuil' => $request->seuil,
            ]);

        return response()->json([
            'status'=> 200,
            'message'=>'le seuil du categorie est mis à jour',
        ]);
    }
}
