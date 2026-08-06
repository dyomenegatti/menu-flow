<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentMethodRequest;
use App\Http\Resources\PaymentMethodResource;
use App\Services\PaymentMethodService;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    public function __construct(
        private PaymentMethodService $paymentMethodService
    ) {}

    public function index(Request $request)
    {
        $restaurantId = $request->integer('restaurant_id');

        $onlyActive = $request->boolean('active');

        $paymentMethods = $this->paymentMethodService
            ->listByRestaurant($restaurantId, $onlyActive);

        return PaymentMethodResource::collection($paymentMethods);
    }

    public function store(PaymentMethodRequest $request)
    {
        $paymentMethod = $this->paymentMethodService
            ->create($request->validated());

        return new PaymentMethodResource($paymentMethod);
    }

    public function show(int $id)
    {
        $paymentMethod = $this->paymentMethodService->find($id);

        return new PaymentMethodResource($paymentMethod);
    }

    public function update(
        PaymentMethodRequest $request,
        int $id
    ) {
        $paymentMethod = $this->paymentMethodService
            ->update($id, $request->validated());

        return new PaymentMethodResource($paymentMethod);
    }

    public function destroy(int $id)
    {
        $this->paymentMethodService->delete($id);

        return response()->noContent();
    }
}