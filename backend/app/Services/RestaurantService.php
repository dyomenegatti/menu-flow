<?php

namespace App\Services;

use App\Models\Address;
use App\Models\Restaurant;
use Illuminate\Support\Facades\DB;

class RestaurantService
{
    public function get(): Restaurant
    {
        return Restaurant::with(['address', 'phones', 'openingHours'])->firstOrFail();
    }

    public function create(array $data): Restaurant
    {
        return DB::transaction(function () use ($data) {
            $address = Address::create($data['address']);

            $restaurant = Restaurant::create([
                'name'         => $data['name'],
                'address_id'   => $address->id,
                'delivery_fee' => $data['delivery_fee'],
            ]);

            if (!empty($data['phones'])) {
                $restaurant->phones()->createMany($data['phones']);
            }

            if (!empty($data['opening_hours'])) {
                $restaurant->openingHours()->createMany($data['opening_hours']);
            }

            return $restaurant->load(['address', 'phones', 'openingHours']);
        });
    }

    public function update(array $data): Restaurant
    {
        return DB::transaction(function () use ($data) {
            $restaurant = Restaurant::with(['address', 'phones', 'openingHours'])->firstOrFail();

            if (isset($data['address'])) {
                $restaurant->address->update($data['address']);
            }

            if (isset($data['phones'])) {
                $restaurant->phones()->delete();
                $restaurant->phones()->createMany($data['phones']);
            }

            if (isset($data['opening_hours'])) {
                $restaurant->openingHours()->delete();
                $restaurant->openingHours()->createMany($data['opening_hours']);
            }

            $fields = array_intersect_key($data, array_flip(['name', 'delivery_fee']));
            if (!empty($fields)) {
                $restaurant->update($fields);
            }

            return $restaurant->fresh(['address', 'phones', 'openingHours']);
        });
    }

    public function destroy(): void
    {
        DB::transaction(function () {
            $restaurant = Restaurant::with('address')->firstOrFail();
            $address = $restaurant->address;
            $restaurant->delete();
            $address?->delete();
        });
    }
}
