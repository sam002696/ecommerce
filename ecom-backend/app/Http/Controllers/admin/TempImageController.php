<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ApiResponseService;
use App\Services\TempImageService;


use Illuminate\Validation\ValidationException;
use Exception;


class TempImageController extends Controller
{
    protected $tempImageService;

    public function __construct(TempImageService $tempImageService)
    {
        $this->tempImageService = $tempImageService;
    }

    public function store(Request $request)
    {
        try {
            $data = $this->tempImageService->handleUpload($request);

            return ApiResponseService::successResponse(
                $data,
                'Image and thumbnail uploaded successfully'
            );
        } catch (ValidationException $e) {
            return ApiResponseService::handleValidationError($e);
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
