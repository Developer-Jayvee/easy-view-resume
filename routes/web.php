<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UploadFileController;
use Illuminate\Support\Facades\Route;


Route::get('/',[HomeController::class,'index' ]);

Route::post('upload',[UploadFileController::class,'upload']);
Route::get('document',[DocumentController::class,'index']);
Route::get('document/{documentId}/show',[DocumentController::class, 'show']);
Route::prefix('conversation')->group(function () {
    Route::post('user-prompt',[ChatbotController::class,'userPrompt']);
    Route::post('agent-prompt',[ChatbotController::class, 'agentPrompt']);
});