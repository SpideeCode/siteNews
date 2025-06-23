<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class WebmasterPass
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || $request->user()->role !== 'webmaster') {
            return redirect('/');
        }

        return $next($request);
    }
}
