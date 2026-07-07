<?php

namespace Database\Seeders;

use App\Models\Addon;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class AddonSeeder extends Seeder
{
    public function run(): void
    {
        $addons = [
            ['name' => 'Queijo Extra',      'price' => 3.00, 'active' => true],
            ['name' => 'Bacon Crocante',    'price' => 5.00, 'active' => true],
            ['name' => 'Ovo',               'price' => 2.50, 'active' => true],
            ['name' => 'Tomate',            'price' => 1.50, 'active' => true],
            ['name' => 'Alface',            'price' => 1.00, 'active' => true],
            ['name' => 'Cebola Caramelada', 'price' => 2.00, 'active' => true],
            ['name' => 'Molho Especial',    'price' => 2.00, 'active' => true],
            ['name' => 'Picles',            'price' => 1.00, 'active' => true],
        ];

        $addonIds = collect($addons)
            ->map(fn ($data) => Addon::create($data)->id)
            ->toArray();

        // Vincula todos os adicionais a todos os produtos da categoria "lanches"
        $lanchesCategory = Category::where('slug', 'lanches')->first();

        if ($lanchesCategory) {
            Product::where('categories_id', $lanchesCategory->id)
                ->get()
                ->each(fn (Product $product) => $product->addons()->syncWithoutDetaching($addonIds));
        }
    }
}
