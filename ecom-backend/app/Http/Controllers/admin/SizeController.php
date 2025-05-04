<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\SizeService;
use App\Services\ApiResponseService;

class SizeController extends Controller
{
    protected $sizeService;

    public function __construct(SizeService $sizeService)
    {
        $this->sizeService = $sizeService;
    }

    /**
     * Fetch all sizes without pagination
     */
    public function index()
    {
        $sizes = $this->sizeService->getAllSizes();

        return ApiResponseService::successResponse(
            $sizes,
            'Sizes retrieved successfully'
        );
    }
}
