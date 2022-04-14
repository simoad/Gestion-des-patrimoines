<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bureau extends Model
{
    use HasFactory;

    protected $table = 'bureau';

    public function affectations()
    {
        return $this->HasMany(Affectation::class, 'id_bureau', 'id_bureau')->with('bien');
    }

    public function departement()
    {
        return $this->BelongsTo(Departement::class, 'id_departement', 'id_departement');
    }

    public function employees()
    {
        return $this->hasMany(Employee::class, 'id_bureau', 'id_bureau');
    }
}
