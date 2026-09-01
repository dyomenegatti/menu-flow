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
            'name'                       => ['required', 'string', 'max:100'],
            'delivery_fee'               => ['required', 'numeric', 'min:0'],
        'image'                          => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],

            'address'                    => ['required', 'array'],
            'address.street'             => ['required', 'string', 'max:255'],
            'address.number'             => ['required', 'string', 'max:20'],
            'address.neighborhood'       => ['required', 'string', 'max:100'],
            'address.city'               => ['required', 'string', 'max:100'],
            'address.state'              => ['required', 'string', 'size:2'],
            'address.zip_code'           => ['required', 'string', 'max:10'],

            'phones'                     => ['required', 'array', 'min:1'],
            'phones.*.phone'             => ['required', 'string', 'max:20'],
            'phones.*.type'              => ['nullable', 'string', 'max:30'],

            'opening_hours'              => ['required', 'array'],
            'opening_hours.*.week_day'   => ['required', 'integer', 'between:0,6'],
            'opening_hours.*.opens_at'   => ['nullable', 'date_format:H:i'],
            'opening_hours.*.closes_at'  => ['nullable', 'date_format:H:i'],
            'opening_hours.*.is_closed'  => ['required', 'boolean'],
        ];
    }
}
