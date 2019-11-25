<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/messenger', function() {
    return view('welcome');
});



Route::get('/messenger/contacts', 'ContactsController@get');
Route::get('/messenger/conversation/{id}', 'ContactsController@getMessagesFor');
Route::post('/messenger/conversation/send', 'ContactsController@send');
Route::get('/messenger/contacts/onlineContacts', 'ContactsController@onlineContacts');

Route::get('/messenger/messages', 'MessagesController@get');

Route::get('/messenger/home', 'HomeController@index')->name('home');

Route::get('/messenger/{uid}', 'Auth\LoginController@postLogin');
