<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


/*
Route::get('imagenes/{img}', function ($img) {
    $path = public_path() . '/imagenes/' . $img;

    return Auth::user();
    
});
*/