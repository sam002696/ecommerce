import React from "react";
import CustomerLayout from "../../../layouts/CustomerLayout/CustomerLayout";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function ShoppingCart() {
  const { items, totalAmount } = useSelector((s) => s.customerCart);

  const shipping = items.length ? 50 : 0;
  const tax = Math.round((totalAmount + shipping) * 0.1 * 100) / 100;

  return (
    <CustomerLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

          <div className="mt-12 grid lg:grid-cols-12 lg:gap-x-12">
            {/* Items List */}
            <ul className="lg:col-span-7 divide-y divide-gray-200 border-t border-b border-gray-200">
              {items.map((item) => (
                <CartItem key={`${item.id}-${item.size}`} item={item} />
              ))}
            </ul>

            {/* Summary */}
            <div className="mt-16 lg:col-span-5 lg:mt-0">
              <CartSummary
                subtotal={totalAmount}
                shipping={shipping}
                tax={tax}
              />
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
