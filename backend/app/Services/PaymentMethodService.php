<?php

namespace App\Services;

use App\Models\PaymentMethod;
use Illuminate\Database\Eloquent\Collection;

class PaymentMethodService
{
    public function listByRestaurant(int $restaurantId, bool $onlyActive = false): Collection
    {
        $query = PaymentMethod::where('restaurant_id', $restaurantId);

        if($onlyActive) {
            $query->where('active', true);
        }

        return $query->get();
    }

    public function find(int $id): PaymentMethod
    {
        return PaymentMethod::findOrFail($id);
    }

    public function create(array $data): PaymentMethod
    {
        return PaymentMethod::create($data);
    }

    public function update(int $id, array $data): PaymentMethod
    {
        $paymentMethod = PaymentMethod::findOrFail($id);

        $paymentMethod->update($data);

        return $paymentMethod->fresh();
    }

    public function delete(int $id):void
    {
        PaymentMethod::findOrFail($id)->delete();
    }

    public function toggleActive(int $id): PaymentMethod
    {
        $paymentMethod = PaymentMethod::findOrFail($id);

        $paymentMethod->update([
            'active' => !$paymentMethod->active,
        ]);

        return $paymentMethod->fresh();
    }
}