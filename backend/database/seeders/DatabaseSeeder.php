<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            AddonSeeder::class,
            RestaurantSeeder::class,
            OptionSeeder::class
        ]);
    }
}
