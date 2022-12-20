<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Block;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Response;
class UsersController extends Controller
{
    public function getJWTIdentifier(){
        return $this->getKey();
    }
    
    public function getJWTCustomClaims(){
        return [];
    }
    
    function updateUser(Request $request){
    
        $user = User::find(Auth::id());
        $user->full_name = $request->full_name ? $request->full_name : $user->full_name;
        $user->about = $request->about ? $request->about : $user->about;
        $user->interest = $request->interest ? $request->interest : $user->interest;
        $user->picture_url = $request->picture_url ? $request->picture_url : $user->picture_url;
        $user->gender = $request->gender ? $request->gender : $user->gender;
        $user->latitude = $request->latitude ? $request->latitude : $user->latitude;
        $user->longitude = $request->longitude ? $request->longitude : $user->longitude;
    
        if($user->save()) {
            return Response::json([
                "status" => "success",
                "data" => $user
            ]);
        }
        return Response::json(["status" => "error"]);
    }

    function getInterested(){

        $user = User::find(Auth::id());
        $blocked = Block::where('users_id', Auth::id())
                    ->where('state',1)
                    ->get();
        $liked = Favorite::where('users_id', Auth::id())
                ->where('state',1)
                ->get();
        
        $excepted_ids = array();
        $excepted_ids[] = Auth::id();
    
        foreach ($blocked as $block) {
            $excepted_ids[] = $block['blocked_id'];
        }
        foreach ($liked as $like) {
            $excepted_ids[] = $like['liked_id'];
        }
        
        $users=User::where('gender', $user->interest)
                ->whereNotIn('id', $excepted_ids)
                ->get();
        
        return Response::json([
            "status" => "success",
            "data" => $users
        ]);
    
        return Response::json(["status" => "Error"]);
    
    }

    function getContacts(){

        $user = User::find(Auth::id());
        $blocked = Block::where('users_id', Auth::id())
                    ->where('state',1)
                    ->get();
        
        $excepted_ids = array();
        $excepted_ids[] = Auth::id();
    
        foreach ($blocked as $block) {
            $excepted_ids[] = $block['blocked_id'];
        }
    
        $users=User::where('gender', $user->interest)
                ->whereNotIn('id', $excepted_ids)
                ->get();
    
        return Response::json([
            "status" => "success",
            "data" => $users
        ]);
    
        return Response::json(["status" => "error"]);
    
    }

    function getFavorites(){

        $users = DB::table('users')
            ->join('favorites', function ($join) {
                $join->on('users.id', '=', 'favorites.liked_id')
                    ->where('favorites.users_id', '=', Auth::id());
            })
            ->select('users.*', 'favorites.state as favorite')
            ->get();
    
        return Response::json([
            "status" => "success",
            "data" => $users
        ]);
    
        return Response::json(["status" => "Error"]);
    }

    function switchBlock(Request $request){

        $blocked = Block::where('users_id', Auth::id())
                    ->where('blocked_id',$request->blocked_id)
                    ->first();
        if($blocked){
            $blocked->state = !$blocked->state;
        }
        else{
            $blocked = new Block;
            $blocked->user_id =  Auth::id();
            $blocked->blocked_id = $request->blocked_id;
            $blocked->state = 1;
        }
        $blocked->save();
        return response()->json(["status" => "success"]);
    
    }
    

    function switchLike(Request $request){

        $liked = Favorite::where('users_id', Auth::id())
                    ->where('liked_id',$request->liked_id)
                    ->first();
        if($liked){
            $liked->state = !$liked->state;
        }
        else{
            $liked = new Favorite;
            $liked->users_id =  Auth::id();
            $liked->liked_id = $request->liked_id;
            $liked->state = 1;
        }
        $liked->save();
        return Response::json(["status" => "success"]);
    
    }
}
