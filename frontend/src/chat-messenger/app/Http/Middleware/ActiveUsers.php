<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Cache;
use Auth;

class ActiveUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Auth::check()) {
//            $expireTime = Carbon::now()->addMinutes(1);
            $expireTime = Carbon::now()->addSeconds(10);
            Cache::put('active-user' . auth()->id(), true, $expireTime);
        }
        return $next($request);
    }
}
