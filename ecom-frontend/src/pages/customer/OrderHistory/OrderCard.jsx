import React from "react";
import OrderHeader from "./OrderHeader";
import OrderItems from "./OrderItems";

const OrderCard = ({ order }) => (
  <div>
    <OrderHeader order={order} />
    <OrderItems
      items={order.order_items}
      status={order.status}
      updatedAt={order.updated_at}
    />
  </div>
);

export default OrderCard;
