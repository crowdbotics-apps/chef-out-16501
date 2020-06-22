import {all, takeLatest, put, call} from 'redux-saga/effects';
import * as NavigationService from '../../../navigator/NavigationService';
import {AccessToken, LoginManager} from "react-native-fbsdk";
const getFbUrl = token => `https://graph.facebook.com/me?access_token=${token}&fields=name,first_name,last_name,email`;

import {
    EMAIL_AUTH_LOGIN_REQUEST,
    EMAIL_AUTH_LOGIN_ERROR,
    EMAIL_AUTH_SIGNUP_REQUEST,
    EMAIL_AUTH_PASSWORD_RECOVER_REQUEST,
    EMAIL_AUTH_LOGIN_SUCCESS,
    EMAIL_AUTH_SIGNUP_ERROR,
    EMAIL_AUTH_SIGNUP_SUCCESS,
    EMAIL_AUTH_PASSWORD_RECOVER_SUCCESS,
    EMAIL_AUTH_PASSWORD_RECOVER_ERROR,
    FB_AUTH_LOGIN_REQUEST,
    FB_AUTH_API_REQUEST,
    FB_AUTH_API_ERROR,
    FCM_TOKEN_REQUEST
} from './constants';
import {setupHttpConfigWithToken,request} from '../../../utils/http';

function sendLogin({email, password}) {
    return request.post('/api/v1/login/', {
        username: email,
        password
    });
}

function sendSocialLogin({email, access_token,provider,name}) {
  return request.post('/api/v1/social-login/', {
      email,
      access_token,
      provider,
      name
  });
}

function sendFCMToken({registration_id, type,token}) {
  var bodyFormData = new FormData();
  bodyFormData.append ('registration_id', registration_id);
  bodyFormData.append ('type', type);
  request.defaults.headers.common['Authorization'] = "Token " + token;
  return request.post('/api/v1/devices/', bodyFormData);
}

function sendSignUp({email, password}) {
    return request.post('/api/v1/signup/', {email, password});
}

function sendPasswordRecovery(email) {
    //There is no reset password endpoint in backend, it's just a fake url
    return request.post('/api/v1/password-reset/', {email});
}

function * handleLogin(action) {
    console.log("handleLogin:: ", action);
    const {
        user: {
            email,
            password
        }
    } = action;
    try {
        const {status, data} = yield call(sendLogin, {email, password});
        if (status === 200) {
            yield put({type: EMAIL_AUTH_LOGIN_SUCCESS, accessToken: data.token,user:data});
            console.log("Login..")
            // you can change the navigate for navigateAndResetStack to go to a protected
            // route
            NavigationService.navigate('Country');
        } else {
            yield put({type: EMAIL_AUTH_LOGIN_ERROR, error: 'Unknown Error'});
        }
    } catch (error) {
        console.log(error);
        // todo add errors with similar structure in backend
        yield put({type: EMAIL_AUTH_LOGIN_ERROR, error: "Can't sign in with provided credentials"});
    }
}

function * handleFCM(action) {
  console.log("handleFCM:: ", action);
  const {
      call: {
        registration_id,
        type,
        token
      }
  } = action;
  try {
      const {status, data} = yield call(sendFCMToken, {
        registration_id,
        type,
        token
      });
      console.log("handleFCM::", data)
  } catch (error) {
      console.log("handleFCM::", error.response.data)
  }
}

function * handleSignUp(action) {
    console.log("handleSignUp::", action)
    const {
        user: {
            email,
            password
        }
    } = action;
    try {
        const {status, data} = yield call(sendSignUp, {email, password});

        console.log(status, data);
        if (status === 201) {
            yield put({type: EMAIL_AUTH_SIGNUP_SUCCESS, user: data});
        } else {
            yield put({type: EMAIL_AUTH_SIGNUP_ERROR, error: 'Unknown Error'});
        }
    } catch (error) {
        console.log(error);
        // todo add errors with similar structure in backend
        yield put({type: EMAIL_AUTH_SIGNUP_ERROR, error: "Can't sign up with provided credentials"});
    }
}

function * handlePasswordRecovery(action) {
    const {email} = action;

    try {
        const {status} = yield call(sendPasswordRecovery, email);

        if (status === 200) {
            yield put({type: EMAIL_AUTH_PASSWORD_RECOVER_SUCCESS, email});

            // you can change the navigate for navigateAndResetStack to go to a protected
            // route
            NavigationService.navigate('ConfirmationRequired');
        } else {
            yield put({type: EMAIL_AUTH_PASSWORD_RECOVER_ERROR, error: 'Unknown Error'});
        }
    } catch (error) {
        yield put({type: EMAIL_AUTH_PASSWORD_RECOVER_ERROR, error: "Can't recover password with provided email"});
    }
}

function * getToken() {

    var data = yield AccessToken.getCurrentAccessToken();
    if (data && data.accessToken) {
        yield LoginManager.logOut()
    }
    const result = yield LoginManager.logInWithPermissions(["public_profile", "email"]);
    if (result.isCancelled) {
        console.log("Cancelled FB LOGIN");
        return {token: null, type: "cancel"};
    }
    data = yield AccessToken.getCurrentAccessToken();
    if (data.accessToken) {
        // Fetching user-details
        user = {
            token: data
                .accessToken
                .toString(),
            type: "success"
        };
        console.log(user);
        return user;
    } else {
        console.log("error in fetching access token");
        return {token: null, type: error};
    }
}

function * facebookRequest(action) {
    console.log("facebookRequest:: ", action);

    const res = yield getToken();
    console.log(res, "response")
    const {token, type} = res;
    const loginSuccessful = type && token && type !== "cancel" && token.length > 0;
    if (!loginSuccessful || type !== "success") {
        console.log("facebookRequest:: successFb", "false")
        return;
    }
    const fbUrl = getFbUrl(token);
    const response = yield fetch(fbUrl);

    const user = yield response.json();
    if (!user || !user.email) {
        return alert("Email not found");
    }
    console.log("LoginFB", user);

    yield put({
        type: FB_AUTH_API_REQUEST,
        user: {
            email: user.email,
            name: user.name,
            name: user.name,
            access_token:token
        }
    });
}

function * facebookAPIRequest(action) {
    console.log("facebookAPIRequest:: ", action);
    const {
        user: {
            email,
            name,
            access_token
        }
    } = action;
    try {
        const {status, data} = yield call(sendSocialLogin, {email, name,provider:'facebook',access_token});
        console.log("facebookAPIRequest:: data",data)
        console.log("facebookAPIRequest:: status",status)
        if (status === 200) {
          yield put({type: EMAIL_AUTH_LOGIN_SUCCESS, accessToken: data.token,user:data});
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
    takeLatest(EMAIL_AUTH_LOGIN_REQUEST, handleLogin),
    takeLatest(EMAIL_AUTH_SIGNUP_REQUEST, handleSignUp),
    takeLatest(EMAIL_AUTH_PASSWORD_RECOVER_REQUEST, handlePasswordRecovery),
    takeLatest(FB_AUTH_LOGIN_REQUEST, facebookRequest),
    takeLatest(FCM_TOKEN_REQUEST, handleFCM)
]);
