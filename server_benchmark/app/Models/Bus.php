<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;

    protected $table = 'bus';
    protected $guarded = [];

    public function corridor()
    {
        return $this->hasMany(Corridor::class);
    }
}