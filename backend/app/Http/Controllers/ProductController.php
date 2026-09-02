<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(private readonly ProductService $productService) {}

    public function indexByCategory(int $categoryId, Request $request): JsonResponse
    {
        $search = $request->input('search');

        return response()->json($this->productService->listByCategory($categoryId, $search));
    }

    public function show(int $id): JsonResponse
    {
        return response()->json($this->productService->findWithDetails($id));
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = $this->productService->create($request->validated());

        return response()->json($product, 201);
    }

    public function update(UpdateProductRequest $request, int $id): JsonResponse
    {
        return response()->json($this->productService->update($id, $request->validated()));
    }

    public function destroy(int $id): JsonResponse
    {
        $this->productService->destroy($id);

        return response()->json(null, 204);
    }
}
