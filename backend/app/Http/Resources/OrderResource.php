<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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

            'restaurant_id' => $this->restaurant_id,
            'type' => $this->type,

            'customer_name' => $this->customer_name,
            'customer_phone' => $this->customer_phone,

            'address' => $this->address,
            'number' => $this->number,
            'neighborhood' => $this->neighborhood,
            'complement' => $this->complement,

            'payment_method_id' => $this->payment_method_id,
            'change' => $this->change,

            'observation' => $this->observation,
            'status' => $this->status,
            'total' => $this->total,

            'items' => OrderItemResource::collection($this->whenLoaded('items')),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
