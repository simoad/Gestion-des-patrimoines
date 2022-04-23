<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $table = 'categorie';
    public $timestamps = false;

    protected $fillable = [
        'id_categorie',
        'nom_categorie',
        'seuil'
    ];
}
