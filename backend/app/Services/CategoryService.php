<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    public function listAll(): Collection
    {
        return Category::withCount('products as total_items')->get(['id', 'name', 'slug']);
    }

    public function findById(int $id): Category
    {
        return Category::withCount('products as total_items')
            ->findOrFail($id);
    }

    public function create(array $data): Category
    {
        return Category::create($data);
    }

    public function update(int $id, array $data): Category
    {
        $category = Category::findOrFail($id);
        $category->update($data);

        return $category->fresh();
    }

    public function destroy(int $id): void
    {
        Category::findOrFail($id)->delete();
    }
}
