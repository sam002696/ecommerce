import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
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
    },

    removeFromCart: (state, { payload }) => {
      const { id, size } = payload;
      state.items = state.items.filter(
        (item) => item.id !== id || item.size !== size
      );

      cartSlice.caseReducers.calculateTotals(state);
    },

    updateQuantity: (state, { payload }) => {
      const { id, size, quantity } = payload;
      const index = findCartIndex(state.items, id, size);

      if (index > -1) {
        state.items[index].quantity = quantity;
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
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
