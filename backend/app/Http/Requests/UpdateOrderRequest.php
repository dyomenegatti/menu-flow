<?php

namespace App\Http\Requests;

use App\Enums\OrderType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type'              => ['sometimes', Rule::enum(OrderType::class)],
            'table_number'      => ['sometimes', 'required_if:type,table', 'nullable', 'integer', 'min:1'],
            'customer_name'     => ['sometimes', 'string', 'max:150'],
            'customer_phone'    => ['sometimes', 'string', 'max:20'],
            'address'           => ['sometimes', 'nullable', 'string', 'max:255'],
            'number'            => ['sometimes', 'nullable', 'string', 'max:20'],
            'neighborhood'      => ['sometimes', 'nullable', 'string', 'max:100'],
            'complement'        => ['sometimes', 'nullable', 'string', 'max:255'],
            'payment_method_id' => ['sometimes', 'integer', 'exists:payment_methods,id'],
            'change'            => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'observation'       => ['sometimes', 'nullable', 'string', 'max:500'],
        ];
    }
}