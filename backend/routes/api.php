<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use App\Http\Controllers\BienController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\UserController;






Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Bien Routes
Route::get('bien', 'BienController@index')->name('bien');
Route::post('add-bien', 'BienController@store');
Route::delete('delete-bien/{id}', 'BienController@delete');
Route::get('edit-bien/{id}', 'BienController@edit');
Route::put('update-bien/{id}', 'BienController@update');



// Categorie Routes
Route::get('get-categories', 'CategorieController@index')->name('get-categories');

//Authentification Routes


Route::group(['middleware' => ['api']], function () {
    Route::post('register','UserController@register');
    Route::post('login','UserController@login');
});