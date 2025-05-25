class CartHelper {
  saveCartData(items) {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  getCartData() {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  }
}
export const Cart = new CartHelper();
