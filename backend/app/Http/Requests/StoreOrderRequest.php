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
            'customer_name'      => ['required', 'string', 'max:150'],
            'payment_method'     => ['required', 'string', 'max:30'],
            'observation'        => ['nullable', 'string', 'max:500'],
            'items'              => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity'   => ['required', 'integer', 'min:1'],
            'items.*.addons'     => ['nullable', 'array'],
            'items.*.addons.*'   => ['integer', 'exists:addons,id'],
            'items.*.options'    => ['nullable', 'array'],
        ];
    }
}
