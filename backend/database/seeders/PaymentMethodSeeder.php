<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Restaurant;
use App\Models\PaymentMethod;

class PaymentMethodSeeder extends Seeder
{
    public function run(): void
    {
        $restaurant = Restaurant::first();

        $paymentMethods = [
            [
                'title' => 'PIX',
                'subtitle' => 'Pagamento instantâneo',
                'icon' => 'mdi-qrcode',
                'code' => 'pix',
                'active' => true
            ],
            [
                'title' => 'Cartão',
                'subtitle' => 'Crédito ou Débito',
                'icon' => 'mdi-credit-card-outline',
                'code' => 'card',
                'active' => true
            ],
            [
                'title' => 'Dinheiro',
                'subtitle' => 'Pagamento na entrega',
                'icon' => 'mdi-cash',
                'code' => 'cash',
                'active' => true
            ],
        ];

        foreach ($paymentMethods as $paymentMethod) {
            PaymentMethod::create([
                'restaurant_id' => $restaurant->id,
                ...$paymentMethod,
            ]);
        }
    }
}