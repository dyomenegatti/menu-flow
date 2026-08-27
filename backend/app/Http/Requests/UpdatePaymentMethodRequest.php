<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentMethodRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'restaurant_id' => [ 'sometimes', 'integer', 'exists:restaurants,id', ],
            'title'         => [ 'sometimes', 'string', 'max:255', ],
            'subtitle'      => [ 'sometimes', 'nullable', 'string', 'max:255', ],
            'icon'          => [ 'sometimes', 'nullable', 'string', 'max:255', ],
            'code'          => [ 'sometimes', 'string', 'max:255', ],
            'active'        => [ 'sometimes', 'boolean', ],
        ];
    }
}