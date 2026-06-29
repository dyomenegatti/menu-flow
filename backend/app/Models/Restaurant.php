<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'address', 'number', 'phone', 'opening_hours', 'delivery_fee'])]
class Restaurant extends Model
{
}
