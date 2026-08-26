<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'restaurant_id'      => ['required', 'integer', 'exists:restaurants,id'],
            'type'               => ['required', 'string', 'in:delivery,pickup'],
            'customer_name'      => ['required', 'string', 'max:150'],
            'customer_phone'     => ['required', 'string', 'max:20'],
            'address'            => ['nullable', 'string',  'max:255',],
            'number'             => ['nullable', 'string', 'max:20',],
            'neighborhood'       => ['nullable', 'string', 'max:100',],
            'complement'         => ['nullable', 'string', 'max:255',],
            'payment_method_id'  => ['required', 'integer', 'exists:payment_methods,id'],
            'change'             => ['nullable', 'numeric', 'min:0',],
            'observation'        => ['nullable', 'string', 'max:500'],
            'items'              => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity'   => ['required', 'integer', 'min:1'],
            'items.*.addons'     => ['nullable', 'array'],
            'items.*.addons.*'   => ['integer', 'exists:addons,id'],
            'items.*.options'    => ['nullable', 'array'],
            'items.*.options.*'  => ['integer', 'exists:options,id'],
        ];
    }
}
