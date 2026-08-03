<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Restaurant;

class RestaurantSeeder extends Seeder
{
    public function run(): void
    {
        $restaurant = Restaurant::create([
            'name' => 'Restaurante X',
            'delivery_fee' => 5.00,
        ]);


        $restaurant->address()->create([
            'street' => 'Rua das Flores',
            'number' => '123',
            'neighborhood' => 'Centro',
            'city' => 'São Paulo',
            'state' => 'SP',
            'zip_code' => '01001-000',
        ]);


        $restaurant->phones()->createMany([
            [
                'phone' => '11999999999',
                'type' => 'WhatsApp',
            ],
            [
                'phone' => '1133333333',
                'type' => 'Fixo',
            ],
        ]);


        $restaurant->openingHours()->createMany([
            [
                'week_day' => 1,
                'opens_at' => '11:00',
                'closes_at' => '22:00',
                'is_closed' => false,
            ],
            [
                'week_day' => 0,
                'opens_at' => null,
                'closes_at' => null,
                'is_closed' => true,
            ],
        ]);
    }
}