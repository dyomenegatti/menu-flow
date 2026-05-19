<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    public function listByCategory(int $categoryId): Collection
    {
        return Product::where('categories_id', $categoryId)
            ->where('is_active', true)
            ->get(['id', 'name', 'description', 'price', 'image']);
    }

    public function findWithDetails(int $id): array
    {
        $product = Product::with(['addons:id,name,price', 'options:id,product_id,name,type,default'])
            ->findOrFail($id);

        return [
            'id'          => $product->id,
            'name'        => $product->name,
            'description' => $product->description,
            'price'       => $product->price,
            'image'       => $product->image,
            'addons'      => $product->addons->map(fn ($a) => [
                'id'    => $a->id,
                'name'  => $a->name,
                'price' => $a->price,
            ]),
            'options'     => $product->options->map(fn ($o) => [
                'id'      => $o->id,
                'name'    => $o->name,
                'type'    => $o->type,
                'default' => $o->default,
            ]),
        ];
    }

    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(int $id, array $data): Product
    {
        $product = Product::findOrFail($id);
        $product->update($data);

        return $product->fresh();
    }

    public function destroy(int $id): void
    {
        Product::findOrFail($id)->delete();
    }
}
