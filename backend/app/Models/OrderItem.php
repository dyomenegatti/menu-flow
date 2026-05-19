<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['order_id', 'product_id', 'quantity', 'addons', 'options', 'unit_price', 'addons_price', 'total'])]
class OrderItem extends Model
{
    protected function casts(): array
    {
        return [
            'addons'      => 'array',
            'options'     => 'array',
            'unit_price'  => 'decimal:2',
            'addons_price' => 'decimal:2',
            'total'       => 'decimal:2',
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
