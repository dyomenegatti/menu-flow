<?php

namespace App\Http\Controllers;

use App\Http\Requests\ListPaymentMethodRequest;
use App\Http\Requests\StorePaymentMethodRequest;
use App\Http\Requests\UpdatePaymentMethodRequest;
use App\Http\Resources\PaymentMethodResource;
use App\Services\PaymentMethodService;

class PaymentMethodController extends Controller
{
    public function __construct(
        private PaymentMethodService $paymentMethodService
    ) {}

    public function index(ListPaymentMethodRequest $request)
    {
        $restaurantId = $request->integer('restaurant_id');

        $active = $request->has('active')
            ? $request->boolean('active')
            : null;

        $paymentMethods = $this->paymentMethodService
            ->listByRestaurant($restaurantId, $active);

        return PaymentMethodResource::collection($paymentMethods);
    }

    public function store(StorePaymentMethodRequest $request)
    {
        $paymentMethod = $this->paymentMethodService
            ->create($request->validated());

        return response()->json(
            new PaymentMethodResource($paymentMethod),
            201
        );
    }

    public function show(int $id)
    {
        $paymentMethod = $this->paymentMethodService->find($id);

        return new PaymentMethodResource($paymentMethod);
    }

    public function update(
        UpdatePaymentMethodRequest $request,
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