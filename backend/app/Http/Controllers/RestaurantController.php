<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRestaurantRequest;
use App\Http\Requests\UpdateRestaurantRequest;
use App\Services\RestaurantService;
use Illuminate\Http\JsonResponse;

class RestaurantController extends Controller
{
    public function __construct(private readonly RestaurantService $restaurantService) {}

    public function show(): JsonResponse
    {
        return response()->json($this->restaurantService->get());
    }

    public function store(StoreRestaurantRequest $request): JsonResponse
    {
        $restaurant = $this->restaurantService->create($request->validated());

        return response()->json($restaurant, 201);
    }

    public function update(UpdateRestaurantRequest $request): JsonResponse
    {
        return response()->json($this->restaurantService->update($request->validated()));
    }

    public function destroy(): JsonResponse
    {
        $this->restaurantService->destroy();

        return response()->json(null, 204);
    }
}
