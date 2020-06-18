import {createStackNavigator} from "react-navigation-stack";

import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";

export default WelcomeNavigator = createStackNavigator({
    Screen1: {
        screen: Screen1,
        navigationOptions: {
          header: null // Will hide header for HomePage
      },      
    },
    Screen2: {
        screen: Screen2,
        navigationOptions: {
          header: null // Will hide header for HomePage
      },      
    },
    Screen3: {
        screen: Screen3,
        navigationOptions: {
          header: null // Will hide header for HomePage
      },      
    }
}, {initialRouteName: "Screen1"});
