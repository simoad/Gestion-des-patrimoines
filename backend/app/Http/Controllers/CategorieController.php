<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    function store(Request $request){
        $Categorie = new Categorie;
        $Categorie->nom_categorie   = $request->input('categorie');
        $Categorie->seuil = $request->input('seuil');
        $Categorie->save();

        return response()->json([
            'status'=> 200,
            'Categorie'=>'Categorie est ajouté',
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

        DB::table('notifications')
        ->where('type', 'App\Notifications\SeuilNotification')
        ->where('notifiable_type', 'App\Models\Gestionnaire')->delete();

        foreach ($categories as $categorie) {
            $bienNonAffecte = Bien::where('statut', 0)->where('id_categorie', $categorie->id_categorie)->get();
            if (count($bienNonAffecte) <= $categorie->seuil) {
                array_push($seuilReached, $categorie->id_categorie);
                $SeuilNotif = 'La categorie '.$categorie->nom_categorie.' a atteint son seuil';
                    $gestionnaires[0]->notify(new SeuilNotification($SeuilNotif));

            }
        }

        // $seuilReachedJSON = json_encode($seuilReached);
        // $seuilReached  = (object) $seuilReached;

        // foreach ($gestionnaires as $gestionnaire) {
        //     $gestionnaire->notify(new SeuilNotification($seuilReached));
        //   }

        return response()->json([
            'status'=>200,
            'seuilReached'=>$seuilReached,
        ]);
    }

    function getSeuilNotifications(){
        $seuilNotification = DB::table('notifications')
        ->where('type', 'App\Notifications\SeuilNotification')
        ->where('notifiable_type', 'App\Models\Gestionnaire')
        ->get();

        return response()->json([
            'status'=> 200,
            'seuilNotification'=>$seuilNotification,
        ]);
    }

    function marqueAsRead($id){
        $notification = DB::table('notifications')
        ->where('id', $id)->update(['read_at' => now()]);

        return response()->json([
            'status'=> 200,
            'message'=>'la notification est marqué comme lue',
        ]);
    }
}
