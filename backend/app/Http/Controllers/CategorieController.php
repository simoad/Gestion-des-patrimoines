<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;
use App\Models\Bien;
use App\Models\Gestionnaire;
use App\Notifications\SeuilNotification;


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

    function seuilCheck(){
        $seuilReached = [];
        $categories =  $categories = Categorie::all();
        $gestionnaires = Gestionnaire::all();

        foreach ($categories as $categorie) {
            $bienNonAffecte = Bien::where('statut', 0)->where('id_categorie', $categorie->id_categorie)->get();
            if (count($bienNonAffecte) <= $categorie->seuil) {
                array_push($seuilReached, $categorie->id_categorie);
            }
        }

        foreach ($gestionnaires as $gestionnaire) {
            $gestionnaire->notify(new SeuilNotification($seuilReached));
          }

        return response()->json([
            'seuilReached'=>$seuilReached,
        ]);;
    }
}
