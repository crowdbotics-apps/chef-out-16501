import {all, takeLatest, put, call} from 'redux-saga/effects';
import * as NavigationService from '../../../navigator/NavigationService';

import {
  CATEGORY_REQUEST,
  CATEGORY_UPDATE,
  CATEGORY_ITEM_REQUEST,
  CATEGORY_ITEM_UPDATE,
  CATEGORY_ITEM_NAVIGATE_REQUEST,
  CATEGORY_ITEM_NAVIGATE,
  REVIEW_ITEM_REQUEST,
  REVIEW_ITEM_COMPLETE,
  REVIEW_ITEM_ERROR
} from './constants';
import {request,setupHttpConfig} from '../../../utils/http';
import { NavigateToMenuItems } from './actions';

function getRequest() {
  res = request.get('/api/v1/category/');
  //There is no reset password endpoint in backend, it's just a fake url
  return res;
}

function* getCategory(action) {
  setupHttpConfig();
  try {
    const {status, data} = yield call(getRequest);
    if (status === 200) {
      yield put({
        type: CATEGORY_UPDATE,
        data: data,
      });

    } 
  } catch (error) {

    console.log(error);
    // todo add errors with similar structure in backend
  }
}

function getItemRequest({id}) {
  res = request.get('/api/v1/allItems/?category='+id);
  //There is no reset password endpoint in backend, it's just a fake url
  return res;
}

function* getCategoryItem(action) {
  setupHttpConfig();
  console.log("getCategoryItem:: ",action)
  try {
    const {status, data} = yield call(getItemRequest,{id:action.id});
    if (status === 200) {
      yield put({
        type: CATEGORY_ITEM_UPDATE,
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

function sendReviewPost({data}) {
  return request.post('/api/v1/post-review/', {
    data
  });
}

function * sendReview(action) {

  try {
      console.log("sendReview:: ",action)
      const {status, data} = yield call(sendReviewPost, {
          data:action.data
      });
      console.log("sendReview::",data);
      if (status === 200) {
          yield put({type: REVIEW_ITEM_COMPLETE,reviewResponse:data});
      } else {
          yield put({type: REVIEW_ITEM_ERROR, error: "Error in submitting review"});
      }
  } catch (error) {
      //console.log(error);
      // todo add errors with similar structure in backend
      yield put({type: REVIEW_ITEM_ERROR, error: "Error in submitting review"});
  }

}


export default all([
  takeLatest(CATEGORY_REQUEST, getCategory),
  takeLatest(CATEGORY_ITEM_REQUEST, getCategoryItem),
  takeLatest(CATEGORY_ITEM_NAVIGATE_REQUEST, navigateToMenuItems),
  takeLatest(REVIEW_ITEM_REQUEST, sendReview),
]);
