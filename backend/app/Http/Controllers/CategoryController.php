<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function __construct(private readonly CategoryService $categoryService) {}

    public function index(): JsonResponse
    {
        return response()->json($this->categoryService->listAll());
    }

    public function show(int $id): JsonResponse
    {
        return response()->json($this->categoryService->findById($id));
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = $this->categoryService->create($request->validated());

        return response()->json($category, 201);
    }

    public function update(UpdateCategoryRequest $request, int $id): JsonResponse
    {
        return response()->json($this->categoryService->update($id, $request->validated()));
    }

    public function destroy(int $id): JsonResponse
    {
        $this->categoryService->destroy($id);

        return response()->json(null, 204);
    }
}
