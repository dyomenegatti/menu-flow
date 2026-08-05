<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['street', 'number', 'neighborhood', 'city', 'state', 'zip_code'])]
class Address extends Model
{
    public function restaurant(): HasOne
    {
        return $this->hasOne(Restaurant::class);
    }
}
