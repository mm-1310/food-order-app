import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalQty: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalQty =
      state.totalQty + action.item.price * action.item.qty;
    const cartExistItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existCartItem = state.items[cartExistItemIndex];

    let updatedItems;

    if (existCartItem) {
      const updatedItem = {
        ...existCartItem,
        qty: existCartItem.qty + action.item.qty,
      };
      updatedItems = [...state.items];
      updatedItems[cartExistItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalQty: updatedTotalQty,
    };
  }

  if (action.type === "REMOVE") {
    // make sure item exist in cart and find index
    // of that item
    const cartExistItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    // get the item itself for the given index
    const existCartItem = state.items[cartExistItemIndex];
    // grab the totalQty
    const updatedTotalQty = state.totalQty - existCartItem.price;
    let updatedItems;

    // if its the last item then remove entire item from array or cart
    // else we just decrease the qty
    if (existCartItem.qty === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existCartItem, qty: existCartItem.qty - 1 };
      updatedItems = [...state.items];
      updatedItems[cartExistItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalQty: updatedTotalQty,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalQty: cartState.totalQty,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
