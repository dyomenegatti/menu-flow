<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PaymentMethodRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'restaurant_id' => [
                $this->isMethod('post') ? 'required' : 'sometimes',
                'integer',
                'exists:restaurants,id',
            ],

            'title' => [
                $this->isMethod('post') ? 'required' : 'sometimes',
                'string',
                'max:255',
            ],

            'subtitle' => [
                'nullable',
                'string',
                'max:255',
            ],

            'icon' => [
                'nullable',
                'string',
                'max:255',
            ],

            'code' => [
                $this->isMethod('post') ? 'required' : 'sometimes',
                'string',
                'max:255',
            ],

            'active' => [
                $this->isMethod('post') ? 'required' : 'sometimes',
                'boolean',
            ],
        ];
    }
}