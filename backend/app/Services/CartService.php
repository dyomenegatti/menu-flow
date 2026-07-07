<?php

namespace App\Services;

use App\Models\Addon;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Option;
use Illuminate\Support\Str;

class CartService
{
    public function initializeCart(?string $token): Cart
    {
        if ($token) {
            return Cart::firstOrCreate(['token' => $token]);
        }

        return Cart::create([
            'token' => (string) Str::uuid(),
        ]);
    }

    public function resolveCart(string $token): Cart
    {
        return Cart::where('token', $token)->firstOrFail();
    }

    public function calcItemTotal(CartItem $item): float
    {
        $addonIds     = $item->addons ?? [];
        $optionIds    = $item->options ?? [];
        $addonsPrice  = Addon::whereIn('id', $addonIds)->sum('price');
        $optionsPrice = Option::whereIn('id', $optionIds)->sum('price');

        return ($item->product->price + $addonsPrice + $optionsPrice) * $item->quantity;
    }

    public function getCartData(Cart $cart): array
    {
        $items = $cart->items()->with('product')->get();

        $formattedItems = $items->map(function (CartItem $item) {
            $addonIds = $item->addons ?? [];
            $optionIds = $item->options ?? [];
            $addons   = Addon::whereIn('id', $addonIds)->get(['name', 'price']);
            $options  = Option::whereIn('id', $optionIds)->get(['name', 'price']);
            $total    = $this->calcItemTotal($item);

            return [
                'id'          => $item->id,
                'product_id'  => $item->product_id,
                'name'        => $item->product->name,
                'image'       => $item->product->image,
                'product_price' => $item->product->price,
                'quantity'    => $item->quantity,
                'addons'      => $addons->map(fn ($a) => ['name' => $a->name, 'price' => $a->price]),
                'options'     => $options->map(fn ($o) => ['name' => $o->name, 'price' => $o->price]),
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

    public function updateItem(Cart $cart, int $itemId, array $data): float
    {
        $item = $cart->items()->findOrFail($itemId);

        $item->update([
            'quantity' => $data['quantity'],
            'addons' => array_key_exists('addons', $data) ? ($data['addons'] ?? []) : $item->addons,
            'options' => array_key_exists('options', $data) ? ($data['options'] ?? []) : $item->options,
            'observation' => array_key_exists('observation', $data) ? $data['observation'] : $item->observation,
        ]);

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
