<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\LocationController;
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

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('user-profile', [AuthController::class, 'userProfile']);    
});

Route::group(['middleware'=> 'api', 'prefix' => 'auth'], function(){
    Route::post('update_user', [UsersController::class, 'updateUser']);
    Route::get('users/all', [UsersController::class, 'getInterested']);
    Route::get('favorites/all', [UsersController::class, 'getFavorites']);
    Route::get('contacts/all', [UsersController::class, 'getContacts']);
    Route::post('block', [UsersController::class, 'switchBlock']);
    Route::post('like', [UsersController::class, 'switchLike']);

    Route::post('send', [MessagesController::class, 'sendMessage']);
    Route::get('all/{receive_id?}', [MessagesController::class, 'getMessages']);

    Route::post('update', [LocationController::class, 'updateLocation']);

    // Route::controller(MessagesController::class)->group(function () {
    //     Route::post("/messages/send", 'sendMessage');
    //     Route::get("/messages/all/{reciever_id?}", 'getMessages');
    // });

    // Route::controller(LocationController::class)->group(function () {
    //     Route::post("/location/update", 'updateLocation');
    // });
});

