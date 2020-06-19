import {createStackNavigator} from "react-navigation-stack";

import MainScreen from "./MainScreen";

export default MenuNavigator = createStackNavigator({
  MainScreen: {
        screen: MainScreen,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    
}, {initialRouteName: "MainScreen"});
