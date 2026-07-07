<?php

namespace App\Http\Requests;

use App\Models\CartItem;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCartItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $normalized = [];

        if ($this->exists('addons') && $this->input('addons') === '') {
            $normalized['addons'] = [];
        }

        if ($this->exists('options') && $this->input('options') === '') {
            $normalized['options'] = [];
        }

        if ($this->exists('observation') && $this->input('observation') === '') {
            $normalized['observation'] = null;
        }

        if (! empty($normalized)) {
            $this->merge($normalized);
        }
    }

    public function rules(): array
    {
        $itemId = (int) $this->route('id');
        $productId = (int) CartItem::query()->whereKey($itemId)->value('product_id');

        return [
            'quantity' => ['required', 'integer', 'min:1'],
            'addons' => ['nullable', 'array'],
            'addons.*' => [
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
            'options' => ['nullable', 'array'],
            'options.*' => [
                'integer',
                Rule::exists('options', 'id')->where('active', true),
            ],
            'observation' => ['nullable', 'string', 'max:500'],
        ];
    }
}
