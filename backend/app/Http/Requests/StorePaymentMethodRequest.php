<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentMethodRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'restaurant_id' => [ 'required', 'integer', 'exists:restaurants,id', ],
            'title'         => [ 'required', 'string', 'max:255', ],
            'subtitle'      => [ 'nullable', 'string', 'max:255', ],
            'icon'          => [ 'nullable', 'string', 'max:255', ],
            'code'          => [ 'required', 'string', 'max:255', ],
            'active'        => [ 'required', 'boolean', ],
        ];
    }
}