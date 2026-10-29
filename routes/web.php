<?php

use App\Http\Controllers\DocumentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UploadFileController;
use Illuminate\Support\Facades\Route;


Route::get('/',[HomeController::class,'index' ]);

Route::post('upload',[UploadFileController::class,'upload']);
Route::get('document',[DocumentController::class,'index']);
Route::get('document/{documentId}/show',[DocumentController::class, 'show']);