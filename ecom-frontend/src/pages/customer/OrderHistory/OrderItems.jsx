import React from "react";
import OrderItem from "./OrderItem";

const OrderItems = ({ items, status, updatedAt }) => (
  <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
    <div className="-my-6 divide-y divide-gray-200 sm:-my-10">
      {items.map((item) => (
        <OrderItem
          key={item.id}
          item={item}
          status={status}
          updatedAt={updatedAt}
        />
      ))}
    </div>
  </div>
);

export default OrderItems;
