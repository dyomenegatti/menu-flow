<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddCartItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productId = (int) $this->input('product_id');

        return [
            'product_id'  => ['required', 'integer', 'exists:products,id'],
            'quantity'    => ['required', 'integer', 'min:1'],
            'addons'      => ['nullable', 'array'],
            'addons.*'    => [
                'integer',
                Rule::exists('addons', 'id')->where(function ($query) use ($productId) {
                    $query
                        ->where('active', true)
                        ->whereExists(function ($subQuery) use ($productId) {
                            $subQuery
                                ->selectRaw('1')
                                ->from('product_addons')
                                ->whereColumn('product_addons.addon_id', 'addons.id')
                                ->where('product_addons.product_id', $productId);
                        });
                }),
            ],
            'options'     => ['nullable', 'array'],
            'options.*'   => [
                'integer',
                Rule::exists('options', 'id')->where('active', true),
            ],
            'observation' => ['nullable', 'string', 'max:500'],
        ];
    }
}
