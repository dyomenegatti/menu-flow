<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['restaurant_id', 'week_day', 'opens_at', 'closes_at', 'is_closed'])]
class RestaurantOpeningHour extends Model
{
    protected $casts = [
        'is_closed' => 'boolean',
        'week_day'  => 'integer',
    ];

    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }
}
