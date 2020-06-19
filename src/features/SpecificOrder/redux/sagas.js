import {all, takeLatest, put, call} from 'redux-saga/effects';
import * as NavigationService from '../../../navigator/NavigationService';

import {
  ITEM_VARIENT_REQUEST,
  ITEM_VARIENT_UPDATE
} from './constants';
import {request,setupHttpConfig} from '../../../utils/http';
import { NavigateToMenuItems } from './actions';

function getRequest() {
  res = request.get('/api/v1/itemvariant/');
  //There is no reset password endpoint in backend, it's just a fake url
  return res;
}

function* getCategory(action) {
  setupHttpConfig();
  try {
    const {status, data} = yield call(getRequest);
    if (status === 200) {
      yield put({
        type: ITEM_VARIENT_UPDATE,
        data: data,
      });

    } 
  } catch (error) {

    console.log(error);
    // todo add errors with similar structure in backend
  }
}

function* navigateToMenuItems(action){
  yield put({
    type: CATEGORY_ITEM_NAVIGATE,
    data: action.item,
  });
}


export default all([
  takeLatest(ITEM_VARIENT_REQUEST, getCategory),
]);
