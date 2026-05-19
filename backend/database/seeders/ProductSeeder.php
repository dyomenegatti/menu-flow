<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $lanches = Category::where('slug', 'lanches')->first();
        $bebidas = Category::where('slug', 'bebidas')->first();

        $products = [
            // Lanches
            ['category' => $lanches, 'name' => 'X-Burguer', 'price' => 22.00, 'description' => 'Hambúrguer, queijo, alface e tomate'],
            ['category' => $lanches, 'name' => 'X-Bacon', 'price' => 26.00, 'description' => 'Hambúrguer, bacon crocante e queijo'],
            ['category' => $lanches, 'name' => 'X-Frango', 'price' => 21.00, 'description' => 'Frango grelhado, queijo e alface'],
            ['category' => $lanches, 'name' => 'X-Salada', 'price' => 20.00, 'description' => 'Hambúrguer com mix de saladas'],
            ['category' => $lanches, 'name' => 'X-Tudo', 'price' => 32.00, 'description' => 'Hambúrguer, bacon, ovo, queijo e salada'],
            ['category' => $lanches, 'name' => 'Hot Dog Simples', 'price' => 14.00, 'description' => 'Salsicha, molho e mostarda'],
            ['category' => $lanches, 'name' => 'Hot Dog Especial', 'price' => 19.00, 'description' => 'Salsicha, milho, ervilha e batata palha'],
            ['category' => $lanches, 'name' => 'Misto Quente', 'price' => 12.00, 'description' => 'Pão de forma, presunto e queijo'],
            ['category' => $lanches, 'name' => 'Bauru', 'price' => 18.00, 'description' => 'Rosbife, queijo derretido e tomate'],
            ['category' => $lanches, 'name' => 'Porção de Batata Frita', 'price' => 18.00, 'description' => 'Batata crocante com sal e temperos'],
            // Bebidas
            ['category' => $bebidas, 'name' => 'Coca-Cola Lata', 'price' => 6.00, 'description' => 'Refrigerante gelado 350ml'],
            ['category' => $bebidas, 'name' => 'Guaraná Lata', 'price' => 5.50, 'description' => 'Refrigerante gelado 350ml'],
            ['category' => $bebidas, 'name' => 'Suco de Laranja', 'price' => 9.00, 'description' => 'Suco natural coado 400ml'],
            ['category' => $bebidas, 'name' => 'Suco de Maracujá', 'price' => 9.00, 'description' => 'Suco natural 400ml'],
            ['category' => $bebidas, 'name' => 'Suco de Morango', 'price' => 10.00, 'description' => 'Suco natural 400ml'],
            ['category' => $bebidas, 'name' => 'Água Mineral', 'price' => 3.50, 'description' => 'Água sem gás 500ml'],
            ['category' => $bebidas, 'name' => 'Água com Gás', 'price' => 4.00, 'description' => 'Água com gás 500ml'],
            ['category' => $bebidas, 'name' => 'Milk-Shake Chocolate', 'price' => 16.00, 'description' => 'Milk-shake cremoso 400ml'],
            ['category' => $bebidas, 'name' => 'Milk-Shake Morango', 'price' => 16.00, 'description' => 'Milk-shake cremoso 400ml'],
            ['category' => $bebidas, 'name' => 'Café Coado', 'price' => 5.00, 'description' => 'Café coado 200ml'],
        ];

        foreach ($products as $data) {
            Product::create([
                'categories_id' => $data['category']->id,
                'name'          => $data['name'],
                'price'         => $data['price'],
                'image'         => 'products/' . \Illuminate\Support\Str::slug($data['name']) . '.jpg',
                'description'   => $data['description'],
                'is_active'     => 1,
            ]);
        }
    }
}
