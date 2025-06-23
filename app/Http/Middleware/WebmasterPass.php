<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class WebmasterPass
{
    public function handle(Request $request, Closure $next)
    {
        $role = $request->user()->role;

        if (in_array($role, ['webmaster', 'admin'])) {
            return $next($request);
        }

        abort(403);
    }
}
