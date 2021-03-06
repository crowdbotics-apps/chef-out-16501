import {createStackNavigator} from "react-navigation-stack";

import Main from "./Main";

export default CountryNavigator = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    }
}, {initialRouteName: "Main"});
