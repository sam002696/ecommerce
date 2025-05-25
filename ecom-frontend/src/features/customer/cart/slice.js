import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../../helpers/Cart";

const calculateInitialTotals = (items) => {
  let totalAmount = 0;
  let totalQuantity = 0;

  items.forEach((item) => {
    totalAmount += item.price * item.quantity;
    totalQuantity += item.quantity;
  });

  return { totalAmount, totalQuantity };
};

const items = Cart.getCartData();
const { totalAmount, totalQuantity } = calculateInitialTotals(items);

const initialState = {
  items,
  totalAmount,
  totalQuantity,
};

const findCartIndex = (items, id, size) =>
  items.findIndex((item) => item.id === id && item.size === size);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { id, title, price, size, image_url } = payload;
      const index = findCartIndex(state.items, id, size);

      if (index > -1) {
        state.items[index].quantity += 1;
      } else {
        state.items.push({
          id,
          title,
          price,
          size,
          image_url,
          quantity: 1,
        });
      }

      cartSlice.caseReducers.calculateTotals(state);
      // Save cart data to local storage
      Cart.saveCartData(state.items);
    },

    removeFromCart: (state, { payload }) => {
      const { id, size } = payload;
      state.items = state.items.filter(
        (item) => item.id !== id || item.size !== size
      );

      cartSlice.caseReducers.calculateTotals(state);

      Cart.saveCartData(state.items);
    },

    updateQuantity: (state, { payload }) => {
      const { id, size, quantity } = payload;
      const index = findCartIndex(state.items, id, size);

      if (index > -1) {
        state.items[index].quantity = quantity;
      }

      cartSlice.caseReducers.calculateTotals(state);

      Cart.saveCartData(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;

      Cart.saveCartData(state.items);
    },

    calculateTotals: (state) => {
      let amount = 0;
      let quantity = 0;

      state.items.forEach((item) => {
        amount += item.price * item.quantity;
        quantity += item.quantity;
      });

      state.totalAmount = amount;
      state.totalQuantity = quantity;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
