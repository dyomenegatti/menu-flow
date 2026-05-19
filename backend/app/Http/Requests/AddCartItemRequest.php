<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddCartItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id'  => ['required', 'integer', 'exists:products,id'],
            'quantity'    => ['required', 'integer', 'min:1'],
            'addons'      => ['nullable', 'array'],
            'addons.*'    => ['integer', 'exists:addons,id'],
            'options'     => ['nullable', 'array'],
            'observation' => ['nullable', 'string', 'max:500'],
        ];
    }
}
