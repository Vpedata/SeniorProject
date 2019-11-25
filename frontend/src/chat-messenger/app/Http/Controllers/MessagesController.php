<?php

namespace App\Http\Controllers;

use App\Message;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    //ALL NEW
    public function get() {
        $messages = Message::all();

        return response()->json($messages);
    }
}
