import * as actions from "./constants";

export const loadCategory = () => ({
  type: actions.CATEGORY_REQUEST
});

export const loadItemCategory = (id) => ({
  type: actions.CATEGORY_ITEM_REQUEST,
  id
});

export const navigateToMenuItems = (item) => ({
  type: actions.CATEGORY_ITEM_NAVIGATE_REQUEST,
  item:item
});

export const setSpecificItems = (item) => ({
  type: actions.SET_SPECIFIC_ITEM,
  specific_item:item
});

export const updateCart = (cart) => ({
  type: actions.UPDATE_CART,
  cart
});

export const clearCart = () => ({
  type: actions.CLEAR_CART
});

export const reviewItem = (data) => ({
  type: actions.REVIEW_ITEM_REQUEST,
  data
});

