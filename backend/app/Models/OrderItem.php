<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['order_id', 'product_id', 'name', 'image', 'price', 'quantity', 'subtotal', 'addons', 'options', 'observation'])]
class OrderItem extends Model
{
    protected function casts(): array
    {
        return [
            'addons'      => 'array',
            'options'     => 'array',
            'price'  => 'decimal:2',
            'subtotal' => 'decimal:2',
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
