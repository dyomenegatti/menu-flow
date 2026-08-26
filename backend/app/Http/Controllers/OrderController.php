<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OrderController extends Controller
{
    public function __construct(
        private readonly OrderService $orderService
    ) {}

    public function index(): AnonymousResourceCollection
    {
        return OrderResource::collection(
            $this->orderService->listPaginated()
        );
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
        return new OrderResource(
            $this->orderService->findById($id)
        );
    }

    public function update(
        UpdateOrderRequest $request,
        int $id
    ): OrderResource {
        $order = $this->orderService->findById($id);

        $order = $this->orderService->updateOrder(
            $order,
            $request->validated()
        );

        return new OrderResource($order);
    }

    public function destroy(int $id): JsonResponse
    {
        $order = $this->orderService->findById($id);

        $this->orderService->deleteOrder($order);

        return response()->json([
            'message' => 'Order deleted successfully.',
        ]);
    }
}