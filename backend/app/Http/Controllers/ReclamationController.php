<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Reclamation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Reponse_reclamation;

class ReclamationController extends Controller
{
    function get_all_reclamations_Non_Repondu(){
        $reclamations = Reclamation::where('status_reponce' , -1)->get();

        

        return response()->json([
            'status'=> 200,
            'reclamations'=>$reclamations
        ]);
    }
    function get_all_reclamations_Repondu(){
        // $reclamations = Reclamation::where('status_reponce' , 1)->get();
        $result=DB::select("select E.nom as employe,R.id_reclamation , B.nom as produit , R.description , R.date_reclamation , R.code_barre , Res.ServiceResponce  
        from reclamation as R ,  bien as B , employe as E  , reponse_reclamation as Res
        where B.code_barre=R.code_barre
        and E.id_employe= R.id_employe
        and Res.id_reclamation=R.id_reclamation
        and Res.id_service_recl=2 
        and R.status_reponce=1;");

        return response()->json([
            'status'=> 200,
            'reclamations'=>$result
        ]);
    }
    function get_reclamateurs(){
        $reclamateurs = Employee::all();

        return response()->json([
            'status'=> 200,
            'reclamateurs'=>$reclamateurs
        ]);
    }
    
    function  responceReclamation(Request $req ){

            Reclamation::where('id_reclamation',$req->input('idReclamation'))->update(['status_reponce' => 1]);

            
            if(Reponse_reclamation::where('id_reclamation',$req->input('idReclamation'))->where('codeBarre',$req->input('codeBarre'))->get()->isEmpty() ){
                $response = new Reponse_reclamation();
                $response->id_reclamation = $req->input('idReclamation');
                $response->id_service_recl = $req->input('idServiceReclamation');
                $response->ServiceResponce= $req->input('ServiceReponse');
                $response->save();
                return response()->json([
                    'status'=> 200,
                    'response'=>$response
                ]);
                
            }
            else{
                
                Reponse_reclamation::where('codeBarre',$req->input('codeBarre'))->update(['ServiceResponce' =>$req->input('ServiceReponse') ]);
                $response=Reponse_reclamation::where('id_reclamation',$req->input('idReclamation'))->get();
                return response()->json([
                    'status'=> 200,
                    'response'=>$response
                ]);
            }
            
      }
      function get_all_Reclamation_Responses(){
        $Responses = Reponse_reclamation::all();

        return response()->json([
            'status'=> 200,
            'Responses'=>$Responses
        ]);
    }
    


}
