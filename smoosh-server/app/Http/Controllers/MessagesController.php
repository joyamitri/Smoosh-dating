<?php

namespace App\Http\Controllers;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use function Illuminate\Validation\Rules\message;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    function sendMessage(Request $request){

        $message = new Message; 

        $message->sender_id = Auth::id();
        $message->reciever_id = $request->reciever_id;
        $message->content = $request->content;

        if($message->save()){
            return Response::json([
                "status" => "success",
                "data" => $message
            ]);
        }
        return Response::json(["status" => "error"]);
    }

    function getMessages($reciever_id){
        
        $messages1 = Message::where('sender_id',  Auth::id())
            ->where('reciever_id', $reciever_id)
            ->get();
        
        $messages2 = Message::where('sender_id', $reciever_id)
            ->where('reciever_id',  Auth::id())
            ->get();
        
        $messages = $messages1->merge($messages2);

        return Response::json($messages->all());
    }
}
