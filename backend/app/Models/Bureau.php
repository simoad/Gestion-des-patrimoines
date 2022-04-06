<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Affectation;
use Departement;

class Bureau extends Model
{
    use HasFactory;

    protected $table = 'bureau';

    public function affectations()
    {
        return $this->HasMany(Affectation::class);
    }

    public function departements()
    {
        return $this->BelongsTo(Departement::class);
    }
}
