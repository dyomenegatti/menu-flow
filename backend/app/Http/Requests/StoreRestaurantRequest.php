<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRestaurantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'          => ['required', 'string', 'max:100'],
            'address'       => ['required', 'string', 'max:255'],
            'number'        => ['required', 'string', 'max:20'],
            'phone'         => ['required', 'string', 'max:20'],
            'opening_hours' => ['required', 'string', 'max:100'],
            'delivery_fee'  => ['required', 'numeric', 'min:0'],
        ];
    }
}
