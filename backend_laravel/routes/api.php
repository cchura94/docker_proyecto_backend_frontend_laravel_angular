<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UsuarioController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::prefix('/v1/auth')->group(function(){

    Route::post("/login", [AuthController::class, "funLogin"]);
    Route::post("/register", [AuthController::class, "funRegister"]);
    
    Route::middleware('auth:sanctum')->group(function(){
        
        Route::get("/profile", [AuthController::class, "funProfile"]);
        Route::post("/logout", [AuthController::class, "funLogout"]);
    
    });

});



Route::get('categoria-publica', [CategoriaController::class, 'listaCategoriaPublica']);

Route::get('pedido/{id}/reporte-PDF-mostrar', [PedidoController::class, "funGenerarReporteMostrarPedidoPDF"]);
Route::get('pedido/reporte-PDF', [PedidoController::class, "funGenerarReporteListaPedidoPDF"]);

Route::middleware('auth:sanctum')->group(function () {
    
    // CRUD Usuarios
    Route::apiResource("usuario", UsuarioController::class);
    Route::apiResource("categoria", CategoriaController::class);
    Route::apiResource("producto", ProductoController::class);
    Route::apiResource("cliente", ClienteController::class);
    Route::apiResource("pedido", PedidoController::class);

});




Route::get('/no-autorizado', function(){
    return response()->json([
        'message' => 'No autorizado, require token de seguridad',
        'error' => '401'
    ], 401);
})->name('login');