import {createStackNavigator} from "react-navigation-stack";

import Main from "./Main";
import Payment from "./Payment";
import FinalStep from "./FinalStep";

export default ContactUsNavigator = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    Payment: {
        screen: Payment,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    FinalStep: {
        screen: FinalStep,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    }
}, {initialRouteName: "Main"});
