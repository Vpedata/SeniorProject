<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $guarded = [];

    protected $table = 'Message';

    protected $primaryKey = 'message_ID';

    public function fromContact() {
        return $this->hasOne(User::class, 'user_ID', 'sender');
    }
}
