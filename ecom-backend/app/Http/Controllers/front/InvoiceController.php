<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\front\InvoiceService;
use App\Services\ApiResponseService;

use Exception;

class InvoiceController extends Controller
{

    protected $invoiceService;

    public function __construct(InvoiceService $invoiceService)
    {

        $this->invoiceService = $invoiceService;
    }



    public function downloadInvoice($orderId)
    {
        try {
            $order = Order::with('order_items')->where('id', $orderId)->firstOrFail();
            $pdf = $this->invoiceService->generate($order);

            return $pdf->download("invoice_order_{$order->id}.pdf");
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
