<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAddonRequest;
use App\Http\Requests\UpdateAddonRequest;
use App\Services\AddonService;
use Illuminate\Http\JsonResponse;

class AddonController extends Controller
{
    public function __construct(private readonly AddonService $addonService) {}

    public function index(): JsonResponse
    {
        return response()->json($this->addonService->listAll());
    }

    public function show(int $id): JsonResponse
    {
        return response()->json($this->addonService->findById($id));
    }

    public function store(StoreAddonRequest $request): JsonResponse
    {
        $addon = $this->addonService->create($request->validated());

        return response()->json($addon, 201);
    }

    public function update(UpdateAddonRequest $request, int $id): JsonResponse
    {
        return response()->json($this->addonService->update($id, $request->validated()));
    }

    public function destroy(int $id): JsonResponse
    {
        $this->addonService->destroy($id);

        return response()->json(null, 204);
    }
}
