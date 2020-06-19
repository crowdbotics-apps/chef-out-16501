import {createStackNavigator} from "react-navigation-stack";

import SignInScreen from "./screens/SignIn";
import RecoverPasswordScreen from "./screens/PasswordRecover";
import ResetPassword from "./screens/ResetPassword";
import SignUpScreen from "./screens/SignUp";
import ProtectedScreen from "./screens/ProtectedScreen";
import ConfirmationRequiredScreen from "./screens/ConfirmationRequired";
import Home from "./screens/";

export default EmailAuthNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    SignIn: {
        screen: SignInScreen,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    RecoverPassword: {
        screen: RecoverPasswordScreen,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    ResetPassword: {
        screen: ResetPassword,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    ProtectedRoute: {
        screen: ProtectedScreen
    },
    ConfirmationRequired: {
        screen: ConfirmationRequiredScreen
    }
}, {initialRouteName: "SignIn"});