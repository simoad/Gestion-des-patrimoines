<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\reclamation;
use Illuminate\Http\Request;
use App\Models\Service_reclamation;
use App\Notifications\ReclamationNotification;

class ReclamerController extends Controller
{

  
    function  ReclamerBien(Request $req ){
        $reclamation = new reclamation();
        $reclamation->id_employe = $req->input('id_employe');
        $reclamation->code_barre = $req->input('code_barre');
        $reclamation->description = $req->input('description');
        $reclamation->status_reponce= $req->input('status');
        $reclamation->save();

        $service_reclamation = Service_reclamation::all();

        $reclamation_notification = [
          'id_employe' => $req->input('id_employe'),
          'code_barre' => $req->input('code_barre')
        ];

          $service_reclamation[0]->notify(new ReclamationNotification($reclamation_notification));

        return response()->json([
          'status'=> 200,
          'reclamation'=>$reclamation,
      ]);
  }

    function getServices(){

      $service_reclamation = Service_reclamation::all();

      return response()->json([
        'status'=> 200,
        'services'=>$service_reclamation,
    ]);
    }


  
}
