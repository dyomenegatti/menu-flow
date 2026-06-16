<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AddonController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::patch('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
Route::get('/categories/{id}/products', [ProductController::class, 'indexByCategory']);

Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::patch('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

Route::get('/addons', [AddonController::class, 'index']);
Route::post('/addons', [AddonController::class, 'store']);
Route::get('/addons/{id}', [AddonController::class, 'show']);
Route::put('/addons/{id}', [AddonController::class, 'update']);
Route::patch('/addons/{id}', [AddonController::class, 'update']);
Route::delete('/addons/{id}', [AddonController::class, 'destroy']);

Route::get('/options', [OptionController::class, 'index']);
Route::post('/options', [OptionController::class, 'store']);
Route::get('/options/{id}', [OptionController::class, 'show']);
Route::put('/options/{id}', [OptionController::class, 'update']);
Route::patch('/options/{id}', [OptionController::class, 'update']);
Route::delete('/options/{id}', [OptionController::class, 'destroy']);

Route::post('/cart', [CartController::class, 'initialize']);
Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart/items', [CartController::class, 'addItem']);
Route::put('/cart/items/{id}', [CartController::class, 'updateItem']);
Route::delete('/cart/items/{id}', [CartController::class, 'removeItem']);

Route::post('/orders', [OrderController::class, 'store']);
