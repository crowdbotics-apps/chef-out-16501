import * as actions from "./constants";

const initialState = {
    contact: null,
    orderResponse: null,
    successOrder: null
};

export default CheckOutReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CONTACT_ADD:
            console.log(action.contact);
            return {
                ...state,
                contact: action.contact
            };
        case actions.FINAL_ORDER_PLACE_SUCCESS:
            return {
                ...state,
                orderResponse: action.orderResponse,
                successOrder: action.successOrder
            };

        default:
            return state;
    }
};