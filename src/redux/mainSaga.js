import { all, takeEvery, take } from "redux-saga/effects";


//@BlueprintReduxSagaImportInsertion
import EmailAuthSaga from '../features/EmailAuth/redux/sagas';
import CountrySaga from '../features/Country/redux/sagas';
import MenuCategorySaga from '../features/MenuCategory/redux/sagas';
import SpecificOrderSaga from '../features/SpecificOrder/redux/sagas';
import CheckOutSaga from '../features/CheckOut/redux/sagas';

function* helloSaga() {
  console.log("Hello from saga!");
}

export function* mainSaga() {
  yield all([
    takeEvery("TEST/ALO", helloSaga),
    // other sagas go here


    //@BlueprintReduxSagaMainInsertion
    EmailAuthSaga,
    CountrySaga,
    MenuCategorySaga,
    SpecificOrderSaga,
    CheckOutSaga
    
  ]);
}