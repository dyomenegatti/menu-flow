<?php

namespace App\Services;

use App\Models\Option;
use Illuminate\Database\Eloquent\Collection;

class OptionService
{
    public function listAll(): Collection
    {
        return Option::query()
            ->orderBy('name')
            ->get(['id', 'name', 'price', 'active']);
    }

    public function findById(int $id): Option
    {
        return Option::findOrFail($id, ['id', 'name', 'price', 'active']);
    }

    public function create(array $data): Option
    {
        return Option::create([
            'name' => $data['name'],
            'price' => $data['price'] ?? null,
            'active' => $data['active'] ?? true,
        ]);
    }

    public function update(int $id, array $data): Option
    {
        $option = Option::findOrFail($id);
        $option->update($data);

        return $option->fresh();
    }

    public function destroy(int $id): void
    {
        Option::findOrFail($id)->delete();
    }
}
