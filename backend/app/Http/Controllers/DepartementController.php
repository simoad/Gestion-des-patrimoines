<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departement;

class DepartementController extends Controller
{
    function index(){
        $departements = Departement::all();
        return response()->json([
            'status'=> 200,
            'departements'=>$departements,
        ]);
    }
}
