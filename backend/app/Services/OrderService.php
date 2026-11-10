<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Enums\OrderType;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderService
{
    public function listPaginated(int $perPage = 15)
    {
        return Order::with('items')
            ->latest()
            ->paginate($perPage);
    }

    public function findById(int $id): Order
    {
        return Order::with('items')->findOrFail($id);
    }

    public function createOrder(array $data): Order
    {
        return DB::transaction(function () use ($data) {
            $order = new Order([
                'restaurant_id' => $data['restaurant_id'],
                'type' => $data['type'],
                'table_number' => $data['table_number'] ?? null,
                'customer_name' => $data['customer_name'],
                'customer_phone' => $data['customer_phone'] ?? null,
                'address' => $data['address'] ?? null,
                'number' => $data['number'] ?? null,
                'neighborhood' => $data['neighborhood'] ?? null,
                'complement' => $data['complement'] ?? null,
                'payment_method_id' => $data['payment_method_id'],
                'change' => $data['change'] ?? null,
                'observation' => $data['observation'] ?? null,
            ]);

            $order->status = OrderStatus::Pending;
            $order->total = 0;
            $order->save();

            $orderTotal = 0;

            foreach ($data['items'] as $itemData) {
                $product = Product::with(['addons', 'options'])
                    ->findOrFail($itemData['product_id']);

                $quantity = $itemData['quantity'];

                $addonIds = $itemData['addons'] ?? [];
                $optionIds = $itemData['options'] ?? [];

                $selectedAddons = $product->addons
                    ->whereIn('id', $addonIds)
                    ->values();

                if ($selectedAddons->count() !== count($addonIds)) {
                    throw ValidationException::withMessages([
                        'items' => 'Um ou mais addons selecionados não pertencem ao produto.',
                    ]);
                }

                $selectedOptions = $product->options
                    ->whereIn('id', $optionIds)
                    ->values();

                if ($selectedOptions->count() !== count($optionIds)) {
                    throw ValidationException::withMessages([
                        'items' => 'Uma ou mais opções selecionadas não pertencem ao produto.',
                    ]);
                }

                $addonsPrice = $selectedAddons->sum(
                    fn ($addon) => (float) $addon->price
                );

                $optionsPrice = $selectedOptions->sum(
                    fn ($option) => (float) ($option->price ?? 0)
                );

                $productPrice = (float) $product->price;

                $price = $productPrice + $addonsPrice + $optionsPrice;

                $subtotal = $price * $quantity;

                $order->items()->create([
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'image' => $product->image,
                    'price' => round($price, 2),
                    'quantity' => $quantity,
                    'subtotal' => round($subtotal, 2),
                    'addons' => $selectedAddons->map(fn ($addon) => [
                        'id' => $addon->id,
                        'name' => $addon->name,
                        'price' => (float) $addon->price,
                    ])->values()->all(),
                    'options' => $selectedOptions->map(fn ($option) => [
                        'id' => $option->id,
                        'name' => $option->name,
                        'price' => (float) ($option->price ?? 0),
                    ])->values()->all(),
                    'observation' => $itemData['observation'] ?? null,
                ]);

                $orderTotal += $subtotal;
            }

            $order->total = round($orderTotal, 2);
            $order->save();

            return $order;
        });
    }

    public function updateOrder(Order $order, array $data): Order
    {
        $order->fill($data);

        if($order->type !== OrderType::Table){
            $order->table_number = null;
        }

        $order->save();

        return $order->load('items');
    }

    public function deleteOrder(Order $order): void
    {
        $order->delete();
    }

    public function changeStatus(Order $order, OrderStatus $next): Order
    {
        if(! $order->status->canTransitionTo($next)) {
            throw ValidationException::withMessages([
                'status' => "Não é possível alterar o pedido de '{$order->status->value}' para '{$next->value}'.",
            ]);
        }

        $order->status = $next;
        $order->save();

        return $order->load('items');
    }
}