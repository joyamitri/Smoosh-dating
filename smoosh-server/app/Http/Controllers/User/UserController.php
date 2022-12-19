<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Response; 

class UserController extends Controller
{
    // function login(Request $request){
    //     $validate = Validator::make($request->all(), [
    //         'username' => 'required|min:5',
    //         'password' => 'required|min:8'
    //     ]);
    //     if($validate -> fails()){
    //         return Response::json([
    //             "status" => "failed",
    //             "results" => []
    //         ], 400);
    //     }
    //     $user = new User;
    //     $user -> username = $request -> username ? $request -> username: $user->username;
    //     $user -> password = $request -> password ? $request -> password: $user->password;

    //     if($user->save()){
    //         return Response::json([
    //             "status" => "success",
    //             "results" => []
    //         ],200);
    //     }else{
    //         return Response::json([
    //             "status" => "failure",
    //             "results" => []
    //         ],400);
    //     }

    // }
    
    function login(Request $request){

        $user = User::where("username", $request->username)
                        ->where("password", bcryprt($request->password))
                        ->get();

        if($user){
            return Response::json([
                "status" => "success",
                "id" => $user->id 
            ],200);
        }else{
            return Response::json([
                "status" => "failure",
                "id" => -1 
            ], 400);
        }
    }

    function signup(Request $request){
        $user = new User;
        $user->username = $request->username;
        $user->phone_number = $request->phone_number;
        $user->password = bcrypt($request->password);
        $user->user_types_id = $request->user_types_id;
        

        if($user->save()){
            return Response::json([
                "status" => "success" 
            ], 200);
        }else{
            return Response::json([
                "status" => "failure"
            ], 400);
        }
    }
}
