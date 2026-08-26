<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type'              => ['sometimes', 'string', 'in:delivery,pickup'],
            'customer_name'     => ['sometimes', 'string', 'max:150'],
            'customer_phone'    => ['sometimes', 'string', 'max:20'],
            'address'           => ['sometimes', 'nullable', 'string', 'max:255'],
            'number'            => ['sometimes', 'nullable', 'string', 'max:20'],
            'neighborhood'      => ['sometimes', 'nullable', 'string', 'max:100'],
            'complement'        => ['sometimes', 'nullable', 'string', 'max:255'],
            'payment_method_id' => ['sometimes', 'integer', 'exists:payment_methods,id'],
            'change'            => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'observation'       => ['sometimes', 'nullable', 'string', 'max:500'],
            'status'            => ['sometimes', 'string', 'in:pending,confirmed,preparing,ready,delivered,cancelled'],
        ];
    }
}