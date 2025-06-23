<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LecteurPass
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || $request->user()->role !== 'lecteur') {
            return redirect('/');
        }

        return $next($request);
    }
}
