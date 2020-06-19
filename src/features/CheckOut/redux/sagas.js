import {all, takeLatest, put, call} from 'redux-saga/effects';
import * as NavigationService from '../../../navigator/NavigationService';
import {AccessToken, LoginManager} from "react-native-fbsdk";
const getFbUrl = token => `https://graph.facebook.com/me?access_token=${token}&fields=name,first_name,last_name,email`;

import {CONTACT_REQUEST, FINAL_ORDER_PLACE_REQUEST, FINAL_ORDER_PLACE_ERROR, FINAL_ORDER_PLACE_SUCCESS} from './constants';
import {request} from '../../../utils/http';

function sendOrder({data}) {
    return request.post('/api/v1/add-order/', {
      data
    });
}

function * finalOrder(action) {

    try {
        const {status, data} = yield call(sendOrder, {
            data:action.data
        });
        console.log("finalOrder::",data);
        if (status === 200) {
            yield put({type: FINAL_ORDER_PLACE_SUCCESS,orderResponse:data,successOrder:true});
        } else {
            yield put({type: FINAL_ORDER_PLACE_ERROR, error: 'Unknown Error'});
        }
    } catch (error) {
        //console.log(error);
        // todo add errors with similar structure in backend
        yield put({type: FINAL_ORDER_PLACE_ERROR, error: "Can't sign in with provided credentials"});
    }

}

function * addContactList(action) {
    console.log("addContactList:: ", action);
    const {
        user: {
            email,
            name,
            access_token
        }
    } = action;
    try {
        const {status, data} = yield call(sendSocialLogin, {
            email,
            name,
            provider: 'facebook',
            access_token
        });
        console.log("facebookAPIRequest:: data", data)
        console.log("facebookAPIRequest:: status", status)
        if (status === 200) {
            yield put({type: EMAIL_AUTH_LOGIN_SUCCESS, accessToken: data.token});
        } else {
            yield put({type: EMAIL_AUTH_LOGIN_ERROR, error: 'Unknown Error'});
        }
    } catch (error) {
        //console.log(error);
        // todo add errors with similar structure in backend
        yield put({type: EMAIL_AUTH_LOGIN_ERROR, error: "Can't sign in with provided credentials"});
    }
}

export default all([
    takeLatest(CONTACT_REQUEST, addContactList),
    takeLatest(FINAL_ORDER_PLACE_REQUEST, finalOrder)
]);
