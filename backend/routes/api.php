<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BienController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\UserController;






Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Bien Routes
Route::get('bien', 'BienController@index')->name('bien');
Route::post('add-bien', 'BienController@store');

// Categorie Routes
Route::get('get-categories', 'CategorieController@index')->name('get-categories');

//Authentification Routes
Route::post('register','UserController@register');
