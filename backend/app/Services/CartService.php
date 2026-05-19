<?php

namespace App\Services;

use App\Models\Addon;
use App\Models\Cart;
use App\Models\CartItem;

class CartService
{
    public function resolveCart(string $token): Cart
    {
        return Cart::firstOrCreate(['token' => $token]);
    }

    public function calcItemTotal(CartItem $item): float
    {
        $addonIds    = $item->addons ?? [];
        $addonsPrice = Addon::whereIn('id', $addonIds)->sum('price');

        return ($item->product->price + $addonsPrice) * $item->quantity;
    }

    public function getCartData(Cart $cart): array
    {
        $items = $cart->items()->with('product')->get();

        $formattedItems = $items->map(function (CartItem $item) {
            $addonIds = $item->addons ?? [];
            $addons   = Addon::whereIn('id', $addonIds)->get(['name', 'price']);
            $total    = $this->calcItemTotal($item);

            return [
                'id'          => $item->id,
                'product_id'  => $item->product_id,
                'name'        => $item->product->name,
                'quantity'    => $item->quantity,
                'addons'      => $addons->map(fn ($a) => ['name' => $a->name, 'price' => $a->price]),
                'observation' => $item->observation,
                'total'       => round($total, 2),
            ];
        });

        return [
            'items' => $formattedItems,
            'total' => round($formattedItems->sum('total'), 2),
        ];
    }

    public function addItem(Cart $cart, array $data): float
    {
        $cart->items()->create([
            'product_id'  => $data['product_id'],
            'quantity'    => $data['quantity'],
            'addons'      => $data['addons'] ?? [],
            'options'     => $data['options'] ?? [],
            'observation' => $data['observation'] ?? null,
        ]);

        return $this->calcCartTotal($cart);
    }

    public function updateItem(Cart $cart, int $itemId, int $quantity): float
    {
        $cart->items()->findOrFail($itemId)->update(['quantity' => $quantity]);

        return $this->calcCartTotal($cart);
    }

    public function removeItem(Cart $cart, int $itemId): void
    {
        $cart->items()->findOrFail($itemId)->delete();
    }

    private function calcCartTotal(Cart $cart): float
    {
        return round(
            $cart->items()->with('product')->get()
                ->sum(fn (CartItem $i) => $this->calcItemTotal($i)),
            2
        );
    }
}
