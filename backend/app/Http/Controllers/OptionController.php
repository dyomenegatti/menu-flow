<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOptionRequest;
use App\Http\Requests\UpdateOptionRequest;
use App\Services\OptionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    public function __construct(private readonly OptionService $optionService) {}

    public function index(Request $request): JsonResponse
    {
        return response()->json($this->optionService->listAll());
    }

    public function show(int $id): JsonResponse
    {
        return response()->json($this->optionService->findById($id));
    }

    public function store(StoreOptionRequest $request): JsonResponse
    {
        $option = $this->optionService->create($request->validated());

        return response()->json($option, 201);
    }

    public function update(UpdateOptionRequest $request, int $id): JsonResponse
    {
        return response()->json($this->optionService->update($id, $request->validated()));
    }

    public function destroy(int $id): JsonResponse
    {
        $this->optionService->destroy($id);

        return response()->json(null, 204);
    }
}
