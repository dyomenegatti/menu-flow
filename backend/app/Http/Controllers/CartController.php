<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddCartItemRequest;
use App\Http\Requests\UpdateCartItemRequest;
use App\Services\CartService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function __construct(private readonly CartService $cartService) {}

    public function initialize(Request $request): JsonResponse
    {
        $cart = $this->cartService->initializeCart($request->header('X-Cart-Token'));

        return response()->json([
            'id' => $cart->id,
            'token' => $cart->token,
        ], $cart->wasRecentlyCreated ? 201 : 200);
    }

    private function resolveCartToken(Request $request): string
    {
        $token = $request->header('X-Cart-Token');

        if (! $token) {
            abort(422, 'X-Cart-Token header is required.');
        }

        return $token;
    }

    private function findCart(Request $request)
    {
        try {
            return $this->cartService->resolveCart($this->resolveCartToken($request));
        } catch (ModelNotFoundException) {
            abort(404, 'Carrinho não encontrado. Inicialize um novo carrinho.');
        }
    }

    public function index(Request $request): JsonResponse
    {
        $cart = $this->findCart($request);

        return response()->json($this->cartService->getCartData($cart));
    }

    public function addItem(AddCartItemRequest $request): JsonResponse
    {
        $cart = $this->findCart($request);
        $cartTotal = $this->cartService->addItem($cart, $request->validated());

        return response()->json([
            'message'  => 'Item adicionado ao carrinho',
            'cart_total' => $cartTotal,
        ], 201);
    }

    public function updateItem(UpdateCartItemRequest $request, int $id): JsonResponse
    {
        $cart = $this->findCart($request);
        $cartTotal = $this->cartService->updateItem($cart, $id, $request->validated());

        return response()->json([
            'message'  => 'Item atualizado',
            'cart_total' => $cartTotal,
        ]);
    }

    public function removeItem(Request $request, int $id): JsonResponse
    {
        $cart = $this->findCart($request);
        $this->cartService->removeItem($cart, $id);

        return response()->json(['message' => 'Item removido do carrinho']);
    }
}
