<?php

use Illuminate\Support\Facades\Broadcast;

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });
Broadcast::channel('message-channel.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('notif-channel.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});