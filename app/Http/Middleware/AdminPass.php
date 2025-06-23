<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminPass
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return redirect('/');
        }

        return $next($request);
    }
}
