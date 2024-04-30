<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\CorridorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('auth/login', [AuthController::class, 'login']);

Route::middleware('authtoken')->group(function() {
    Route::get('auth/logout', [AuthController::class, 'logout']);

    Route::get('bus', [BusController::class, 'index']);
    Route::post('bus', [BusController::class, 'create']);
    Route::put('bus/{id}', [BusController::class, 'update']);
    Route::delete('bus/{id}', [BusController::class, 'destroy']);

    Route::get('driver', [DriverController::class, 'index']);
    Route::post('driver', [DriverController::class, 'create']);
    Route::put('driver/{id}', [DriverController::class, 'update']);
    Route::delete('driver/{id}', [DriverController::class, 'destroy']);

    Route::get('corridor', [CorridorController::class, 'index']);
    Route::post('corridor', [CorridorController::class, 'create']);
    Route::delete('corridor/{id}', [CorridorController::class, 'destroy']);
});