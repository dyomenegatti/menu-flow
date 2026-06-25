<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRestaurantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'          => ['sometimes', 'string', 'max:100'],
            'address'       => ['sometimes', 'string', 'max:255'],
            'number'        => ['sometimes', 'string', 'max:20'],
            'phone'         => ['sometimes', 'string', 'max:20'],
            'opening_hours' => ['sometimes', 'string', 'max:100'],
            'delivery_fee'  => ['sometimes', 'numeric', 'min:0'],
        ];
    }
}
