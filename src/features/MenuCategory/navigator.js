import {createStackNavigator} from "react-navigation-stack";

import MainMenu from "./MainMenu";
import MenuItem from "./MenuItem";

export default MenuNavigator = createStackNavigator({
    MainMenu: {
        screen: MainMenu,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    },
    MenuItem: {
        screen: MenuItem,
        navigationOptions: {
            header: null // Will hide header for HomePage
        }
    }
}, {initialRouteName: "MainMenu"});
