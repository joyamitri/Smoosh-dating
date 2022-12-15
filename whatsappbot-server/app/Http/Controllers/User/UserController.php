<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Response; 
use Validator;

class UserController extends Controller
{
    function login(Request $request){
        $validate = Validator::make($request->all(), [
            'username' => 'required|min:5',
            'password' => 'required|min:8'
        ]);
        if($validate -> fails()){
            return Response::json([
                "status" => "failed",
                "results" => []
            ], 400);
        }
        $user = new User;
        $user -> username = $request -> username ? $request -> username: $user->username;
        $user -> password = $request -> password ? $request -> password: $user->password;

        if($user->save()){
            return Response::json([
                "status" => "success",
                "results" => []
            ],200);
        }else{
            return Response::json([
                "status" => "failure",
                "results" => []
            ],400);
        }

    }
    
    // function login(Request $request){

    //     $user = User::where("email", $request->email)
    //                     ->where("password", bcryprt($request->password))
    //                     ->get();

    //     if($user){
    //         return response()->json([
    //             "id" => $user->id 
    //         ]);
    //     }else{
    //         return response()->json([
    //             "id" => -1 
    //         ]);
    //     }
    // }
}
