<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuteurPass
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || $request->user()->role !== 'auteur') {
            return redirect('/');
        }

        return $next($request);
    }
}
