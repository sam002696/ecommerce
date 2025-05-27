<?php

namespace App\Services\front;

use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceService
{
    public function generate(Order $order)
    {
        return Pdf::loadView('invoices.order', ['order' => $order]);
    }
}
