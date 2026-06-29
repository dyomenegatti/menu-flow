<?php

namespace App\Services;

use App\Models\Addon;
use Illuminate\Database\Eloquent\Collection;

class AddonService
{
    public function listAll(): Collection
    {
        return Addon::orderBy('name')->get(['id', 'name', 'price', 'active']);
    }

    public function findById(int $id): Addon
    {
        return Addon::findOrFail($id, ['id', 'name', 'price', 'active']);
    }

    public function create(array $data): Addon
    {
        $addon = Addon::create($data);

        if (isset($data['product_ids'])) {
            $addon->products()->sync($data['product_ids']);
        }

        return $addon->fresh();
    }

    public function update(int $id, array $data): Addon
    {
        $addon = Addon::findOrFail($id);
        $addon->update($data);

        if (array_key_exists('product_ids', $data)) {
            $addon->products()->sync($data['product_ids'] ?? []);
        }

        return $addon->fresh();
    }

    public function destroy(int $id): void
    {
        Addon::findOrFail($id)->delete();
    }
}
