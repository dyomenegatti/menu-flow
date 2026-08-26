<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function __construct(
        private readonly OrderService $orderService
    ) {}

    public function index()
    {
        $orders = Order::with('items')
            ->latest()
            ->paginate(15);

        return OrderResource::collection($orders);
    }

    public function store(StoreOrderRequest $request): OrderResource
    {
        $order = $this->orderService->createOrder(
            $request->validated()
        );

        $order->load('items');

        return new OrderResource($order);
    }

    public function show(int $id): OrderResource
    {
        $order = Order::with('items')->findOrFail($id);

        return new OrderResource($order);
    }

    public function update(
        StoreOrderRequest $request,
        int $id
    ): OrderResource {
        $order = Order::findOrFail($id);

        $order->update($request->validated());

        $order->load('items');

        return new OrderResource($order);
    }

    public function destroy(int $id): JsonResponse
    {
        $order = Order::findOrFail($id);

        $order->delete();

        return response()->json([
            'message' => 'Order deleted successfully.',
        ]);
    }
}