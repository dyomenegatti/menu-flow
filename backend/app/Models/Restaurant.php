<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'address_id', 'delivery_fee', 'image', 'delivery_time_min', 'delivery_time_max', 'pickup_time_min', 'pickup_time_max'])]
class Restaurant extends Model
{
    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

    public function phones(): HasMany
    {
        return $this->hasMany(RestaurantPhone::class);
    }

    public function openingHours(): HasMany
    {
        return $this->hasMany(RestaurantOpeningHour::class)->orderBy('week_day');
    }

    public function paymentMethods(): HasMany
    {
        return $this->hasMany(PaymentMethod::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
