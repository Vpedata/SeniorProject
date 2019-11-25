<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Message;
use App\Events\NewMessage;
use Cache;

class ContactsController extends Controller
{
    public function get() {
        // get all users except the authenticated one
        $contacts = User::where('user_ID', '!=', auth()->id())->get();

        $unreadIds = Message::select(\DB::raw('`sender` as sender_id, count(`sender`) as messages_count'))
            ->where('receiver', auth()->id())
            ->where('read', false)
            ->groupBy('sender')
            ->get();

        $contacts = $contacts->map(function($contact) use ($unreadIds) {
            $contactUnread = $unreadIds->where('sender_id', $contact->user_ID)->first();

            $contact->unread = $contactUnread ? $contactUnread->messages_count : 0;

            return $contact;
        });

        return response()->json($contacts);
    }

    public function getMessagesFor($id) {
        // mark all messages with the selected contact as read
        Message::where('sender', $id)->where('receiver', auth()->id())->update(['read' => true]);
        $messages = Message::where(function($q) use ($id) {
            $q->where('sender', auth()->id());
            $q->where('receiver', $id);
        })->orWhere(function($q) use ($id) {
            $q->where('sender', $id);
            $q->where('receiver', auth()->id());
        })->get(); // (a = 1 AND b = 2) OR (c = 1 OR d = 2)

        return response()->json($messages);
    }

    public function send(Request $request) {
        $message = Message::create([
            'sender' => auth()->id(),
            'receiver' => $request->contact_id,
            'content' => $request->text,
            'isFromUser' => $request->isFromUser
        ]);

        broadcast(new NewMessage($message));

        return response()->json($message);
    }

    public function onlineContacts() {
        $onlineContacts = User::where('user_ID', '!=', auth()->id())->get();

        $onlineContacts = $onlineContacts->map(function($contact) {

            $contact->online = Cache::has('active-user' . $contact->user_ID) ? true : false;

            return $contact;
        });

        return response()->json($onlineContacts);
    }
}
