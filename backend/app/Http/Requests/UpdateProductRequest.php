<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'categories_id' => ['sometimes', 'integer', 'exists:categories,id'],
            'name'          => ['sometimes', 'string', 'max:100'],
            'price'         => ['sometimes', 'numeric', 'min:0'],
            'image'         => ['sometimes', 'string', 'max:500'],
            'description'   => ['sometimes', 'string'],
            'is_active'     => ['sometimes', 'boolean'],
        ];
    }
}
