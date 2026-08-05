<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Option;
use App\Models\Product;
use Illuminate\Database\Seeder;

class OptionSeeder extends Seeder
{
    public function run(): void
    {
        $options = [
            [
                'name' => 'Maionese da casa',
                'price' => 5.00,
                'active' => true,
            ],
            [
                'name' => 'Molho barbecue',
                'price' => 4.00,
                'active' => true,
            ],
            [
                'name' => 'Molho especial',
                'price' => 3.00,
                'active' => true,
            ],
        ];

        $optionIds = collect($options)
            ->map(fn ($data) => Option::create($data)->id)
            ->toArray();

        // Vincula todas as opções a todos os produtos da categoria "lanches"
        $lanchesCategory = Category::where('slug', 'lanches')->first();

        if ($lanchesCategory) {
            Product::where('categories_id', $lanchesCategory->id)
                ->get()
                ->each(fn (Product $product) =>
                    $product->options()->syncWithoutDetaching($optionIds)
                );
        }
    }
}