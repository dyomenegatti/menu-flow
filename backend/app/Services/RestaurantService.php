<?php

namespace App\Services;

use App\Models\Restaurant;

class RestaurantService
{
    public function get(): Restaurant
    {
        return Restaurant::firstOrFail();
    }

    public function create(array $data): Restaurant
    {
        return Restaurant::create($data);
    }

    public function update(array $data): Restaurant
    {
        $restaurant = Restaurant::firstOrFail();
        $restaurant->update($data);

        return $restaurant->fresh();
    }

    public function destroy(): void
    {
        Restaurant::firstOrFail()->delete();
    }
}
