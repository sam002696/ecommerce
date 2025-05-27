<?php

namespace App\Exceptions;

use App\Services\ApiResponseService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Http\Request;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        // Handles "403 Forbidden" due to authorization failure
        $this->renderable(function (AuthorizationException $e, $request) {
            if ($request->expectsJson()) {
                return ApiResponseService::errorResponse('Forbidden.', 403);
            }
        });

        // Handles "403 Forbidden" due to explicit denial
        $this->renderable(function (AccessDeniedHttpException $e, $request) {
            if ($request->expectsJson()) {
                return ApiResponseService::errorResponse('Access Denied.', 403);
            }
        });
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return ApiResponseService::errorResponse('Unauthenticated.', 401);
        }

        return redirect()->guest(route('login'));
    }

    /**
     * Force JSON responses for API requests or those expecting JSON.
     */
    public function shouldReturnJson($request, Throwable $e): bool
    {
        return $request->is('api/*') || $request->expectsJson();
    }
}
