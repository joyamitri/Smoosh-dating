<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    function updateLocation(Request $request){

        $user = User::find(Auth::id());

        $user->long = $request->longitude ? $request->longitude : $user->longitude;
        $user->lat = $request->latitude ? $request->latitude : $user->latitude;

        if($user->save()){
            return Response::json([
                "status" => "success",
                "data" => $user
            ]);
        }
        return Response::json(["status" => "error"]);
    }
}
