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
            'name'                       => ['sometimes', 'string', 'max:100'],
            'delivery_fee'               => ['sometimes', 'numeric', 'min:0'],
            'image'                      => ['sometimes', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],

            'address'                    => ['sometimes', 'array'],
            'address.street'             => ['sometimes', 'string', 'max:255'],
            'address.number'             => ['sometimes', 'string', 'max:20'],
            'address.neighborhood'       => ['sometimes', 'string', 'max:100'],
            'address.city'               => ['sometimes', 'string', 'max:100'],
            'address.state'              => ['sometimes', 'string', 'size:2'],
            'address.zip_code'           => ['sometimes', 'string', 'max:10'],

            'phones'                     => ['sometimes', 'array', 'min:1'],
            'phones.*.phone'             => ['required_with:phones', 'string', 'max:20'],
            'phones.*.type'              => ['nullable', 'string', 'max:30'],

            'opening_hours'              => ['sometimes', 'array'],
            'opening_hours.*.week_day'   => ['required_with:opening_hours', 'integer', 'between:0,6'],
            'opening_hours.*.opens_at'   => ['nullable', 'date_format:H:i'],
            'opening_hours.*.closes_at'  => ['nullable', 'date_format:H:i'],
            'opening_hours.*.is_closed'  => ['required_with:opening_hours', 'boolean'],
        ];
    }
}
