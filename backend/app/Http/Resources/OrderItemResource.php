<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'product_id' => $this->product_id,

            'name' => $this->name,
            'image' => $this->image,

            'price' => $this->price,
            'quantity' => $this->quantity,
            'subtotal' => $this->subtotal,

            'addons' => $this->addons,
            'options' => $this->options,

            'observation' => $this->observation,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
