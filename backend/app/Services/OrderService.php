<?php

namespace App\Services;

use App\Models\Addon;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function createOrder(array $data): Order
    {
        return DB::transaction(function () use ($data) {
            $orderTotal = 0;

            $order = Order::create([
                'customer_name'  => $data['customer_name'],
                'payment_method' => $data['payment_method'],
                'observation'    => $data['observation'] ?? null,
                'status'         => 'pending',
                'total'          => 0,
            ]);

            foreach ($data['items'] as $itemData) {
                $product     = Product::findOrFail($itemData['product_id']);
                $addonIds    = $itemData['addons'] ?? [];
                $addonsPrice = Addon::whereIn('id', $addonIds)->sum('price');
                $unitPrice   = (float) $product->price;
                $total       = ($unitPrice + $addonsPrice) * $itemData['quantity'];

                $order->items()->create([
                    'product_id'   => $product->id,
                    'quantity'     => $itemData['quantity'],
                    'addons'       => $addonIds,
                    'options'      => $itemData['options'] ?? [],
                    'unit_price'   => $unitPrice,
                    'addons_price' => $addonsPrice,
                    'total'        => round($total, 2),
                ]);

                $orderTotal += $total;
            }

            $order->update(['total' => round($orderTotal, 2)]);

            return $order;
        });
    }
}
