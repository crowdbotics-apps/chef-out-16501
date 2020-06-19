import {all, takeLatest, put, call} from 'redux-saga/effects';
import * as NavigationService from '../../../navigator/NavigationService';

import {
  COUNTRY_REQUEST,
  COUNTRY_UPDATE
} from './constants';
import {request,setupHttpConfig} from '../../../utils/http';

function getCountriesRequest() {
  res = request.get('/api/v1/country/');
  //There is no reset password endpoint in backend, it's just a fake url
  return res;
}

function* getCountries(action) {
  setupHttpConfig();
  try {
    const {status, data} = yield call(getCountriesRequest);
    if (status === 200) {
      console.log("getCountries:: ",data);
      yield put({
        type: COUNTRY_UPDATE,
        countries: data,
      });

    } 
  } catch (error) {

    console.log(error);
    // todo add errors with similar structure in backend
  }
}


export default all([
  takeLatest(COUNTRY_REQUEST, getCountries),
]);
