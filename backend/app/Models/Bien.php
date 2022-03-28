<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bien extends Model
{
    use HasFactory;

    protected $table = 'bien';

    protected $fillable = [
        'code_barre',
        'id_categorie',
        'nom',
        'garantie',
        'duree_de_vie',
        'statut'
    ];
}
