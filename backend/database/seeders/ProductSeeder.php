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
            ['category' => $lanches, 'name' => 'X-Burguer', 'price' => 22.00, 'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Hambúrguer, queijo, alface e tomate'],
            ['category' => $lanches, 'name' => 'X-Bacon', 'price' => 26.00, 'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Hambúrguer, bacon crocante e queijo'],
            ['category' => $lanches, 'name' => 'X-Frango', 'price' => 21.00, 'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Frango grelhado, queijo e alface'],
            ['category' => $lanches, 'name' => 'X-Salada', 'price' => 20.00, 'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Hambúrguer com mix de saladas'],
            ['category' => $lanches, 'name' => 'X-Tudo', 'price' => 32.00, 'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Hambúrguer, bacon, ovo, queijo e salada'],
            ['category' => $lanches, 'name' => 'Hot Dog Simples', 'price' => 14.00, 'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Salsicha, molho e mostarda'],
            ['category' => $lanches, 'name' => 'Hot Dog Especial', 'price' => 19.00, 'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Salsicha, milho, ervilha e batata palha'],
            ['category' => $lanches, 'name' => 'Misto Quente', 'price' => 12.00, 'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Pão de forma, presunto e queijo'],
            ['category' => $lanches, 'name' => 'Bauru', 'price' => 18.00, 'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Rosbife, queijo derretido e tomate'],
            ['category' => $lanches, 'name' => 'Porção de Batata Frita', 'price' => 18.00, 'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Batata crocante com sal e temperos'],
            // Bebidas
            ['category' => $bebidas, 'name' => 'Coca-Cola Lata', 'price' => 6.00, 'image' => 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Refrigerante gelado 350ml'],
            ['category' => $bebidas, 'name' => 'Guaraná Lata', 'price' => 5.50, 'image' => 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Refrigerante gelado 350ml'],
            ['category' => $bebidas, 'name' => 'Suco de Laranja', 'price' => 9.00, 'image' => 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Suco natural coado 400ml'],
            ['category' => $bebidas, 'name' => 'Suco de Maracujá', 'price' => 9.00, 'image' => 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Suco natural 400ml'],
            ['category' => $bebidas, 'name' => 'Suco de Morango', 'price' => 10.00, 'image' => 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Suco natural 400ml'],
            ['category' => $bebidas, 'name' => 'Água Mineral', 'price' => 3.50, 'image' => 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Água sem gás 500ml'],
            ['category' => $bebidas, 'name' => 'Água com Gás', 'price' => 4.00, 'image' => 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Água com gás 500ml'],
            ['category' => $bebidas, 'name' => 'Milk-Shake Chocolate', 'price' => 16.00, 'image' => 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Milk-shake cremoso 400ml'],
            ['category' => $bebidas, 'name' => 'Milk-Shake Morango', 'price' => 16.00, 'image' => 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Milk-shake cremoso 400ml'],
            ['category' => $bebidas, 'name' => 'Café Coado', 'price' => 5.00, 'image' => 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'description' => 'Café coado 200ml'],
        ];

        foreach ($products as $data) {
            Product::create([
                'categories_id' => $data['category']->id,
                'name'          => $data['name'],
                'price'         => $data['price'],
                'image'         => $data['image'],
                'description'   => $data['description'],
                'is_active'     => 1,
            ]);
        }
    }
}
