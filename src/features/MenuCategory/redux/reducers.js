import * as actions from "./constants";

const initialState = {
    categories: null,
    item_categories: null,
    selectedCategory: null,
    cart: [],
    specific_item: null,
    reviewResponse: null,
    reviewError: null
};

export default CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CATEGORY_UPDATE:
            return {
                ...state,
                categories: action.data
            };
        case actions.CATEGORY_ITEM_UPDATE:
            return {
                ...state,
                item_categories: action.data
            };
        case actions.CATEGORY_ITEM_NAVIGATE:
            return {
                ...state,
                selectedCategory: action.data
            };

        case actions.SET_SPECIFIC_ITEM:
            return {
                ...state,
                specific_item: action.specific_item
            };
        case actions.REVIEW_ITEM_COMPLETE:
            return {
                ...state,
                reviewResponse: action.reviewResponse
            };
        case actions.REVIEW_ITEM_ERROR:
            return {
                ...state,
                reviewError: action.error
            };
        case actions.UPDATE_CART:
            console.log(action.cart);
            return {
                ...state,
                cart: action
                    .cart
                    .slice()
            };
        case actions.CLEAR_CART:
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
};