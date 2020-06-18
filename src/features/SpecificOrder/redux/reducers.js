import * as actions from "./constants";

const initialState = {
  item_varient: null
};

export default CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ITEM_VARIENT_UPDATE:
            return {
                ...state,
                item_varient: action.data
            };
        default:
            return state;
    }
};