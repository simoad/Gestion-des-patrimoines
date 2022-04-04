<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Bureau;

class Departement extends Model
{
    use HasFactory;

    protected $table = 'departement';

    public function bureaux()
    {
        return $this->HasMany(Bureau::class);
    }
}
