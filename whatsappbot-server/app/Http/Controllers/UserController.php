<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    function login(){
        return response() -> json([
            "status"=> "success"
        ], 404);
    }
}
