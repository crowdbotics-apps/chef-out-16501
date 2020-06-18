import { combineReducers } from "redux";

/**
 * You can import more reducers here
 */


//@BlueprintReduxImportInsertion
import EmailAuthReducer from '../features/EmailAuth/redux/reducers';
import CountryReducer from '../features/Country/redux/reducers';
import MenuCategoryReducer from '../features/MenuCategory/redux/reducers';
import SpecificOrderReducer from '../features/SpecificOrder/redux/reducers';
import CheckOutReducer from '../features/CheckOut/redux/reducers';

export const combinedReducers = combineReducers({
  blank: (state, action) => {
    if (state == null) state = [];
    return state;
  },


  //@BlueprintReduxCombineInsertion
  EmailAuth: EmailAuthReducer,
  Country: CountryReducer,
  MenuCategory: MenuCategoryReducer,
  SpecificOrder: SpecificOrderReducer,
  CheckOut:CheckOutReducer

});