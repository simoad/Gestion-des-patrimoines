<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Affectation extends Model
{
    use HasFactory;

    protected $table = 'affectation';
    const CREATED_AT = 'date_affectation';

    public function bien()
    {
        return $this->belongsTo(Bien::class, 'code_barre', 'code_barre');
    }

    public function bureau()
    {
        return $this->belongsTo(Bureau::class, 'id_bureau', 'id_bureau')->with('departement');
    }
}
