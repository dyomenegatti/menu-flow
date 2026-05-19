<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'categories_id' => ['required', 'integer', 'exists:categories,id'],
            'name'          => ['required', 'string', 'max:100'],
            'price'         => ['required', 'numeric', 'min:0'],
            'image'         => ['nullable', 'string', 'max:500'],
            'description'   => ['required', 'string'],
            'is_active'     => ['sometimes', 'boolean'],
        ];
    }
}
