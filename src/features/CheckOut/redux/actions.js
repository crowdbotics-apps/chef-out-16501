import * as actions from "./constants";

export const addContact = (contact) => ({
  type: actions.CONTACT_ADD,
  contact
});

export const placeOrders = (data) => ({
  type: actions.FINAL_ORDER_PLACE_REQUEST,
  data
});


