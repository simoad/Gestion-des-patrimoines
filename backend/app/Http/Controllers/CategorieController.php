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
}
