import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {StyleSheet, Dimensions} from 'react-native'

import SplashScreen from "../features/SplashScreen";
import SideMenu from './sideMenu';
//@BlueprintImportInsertion
import BlankScreen45202768Navigator from '../features/BlankScreen45202768/navigator';
import BlankScreen44202767Navigator from '../features/BlankScreen44202767/navigator';
import SettingsBlueprintNavigator from '../features/SettingsBlueprint/navigator';
import Maps27821Navigator from '../features/Maps27821/navigator';
import AddItem22759Navigator from '../features/AddItem22759/navigator';
import Maps22758Navigator from '../features/Maps22758/navigator';
import MapsNavigator from '../features/Maps/navigator';
import EmailAuthNavigator from '../features/EmailAuth/navigator';
import AddItemBlueprintNavigator from '../features/AddItemBlueprint/navigator';
import WelcomeNavigator from "../features/WelcomeScreen/navigator";
import MenuCategoryNavigator from "../features/MenuCategory/navigator";
import SpecificOrderNavigator from "../features/SpecificOrder/navigator";
import ContactUsNavigator from "../features/ContactUs/navigator";
import OrderHistoryNavigator from "../features/OrderHistory/navigator";
import Feedback from "../features/Feedback/Main";
import OrderCompleteNavigator from "../features/OrderComplete/navigator";
import MyBagNavigator from "../features/MyBag/navigator";
import CheckOutNavigator from "../features/CheckOut/navigator";
import CountryNavigator from "../features/Country/navigator";

var windowWidth = Dimensions
    .get('window')
    .width

/**
 * new navigators can be imported here
 */

const AppNavigator = {
    SplashScreen: {
        screen: SplashScreen
    },
    WelcomeScreen: {
        screen: WelcomeNavigator
    },
    //@BlueprintNavigationInsertion
BlankScreen45202768: { screen: BlankScreen45202768Navigator },
BlankScreen44202767: { screen: BlankScreen44202767Navigator },
SettingsBlueprint: { screen: SettingsBlueprintNavigator },
    Maps27821: {
        screen: Maps27821Navigator
    },
    AddItem22759: {
        screen: AddItem22759Navigator
    },
    Maps22758: {
        screen: Maps22758Navigator
    },
    Maps: {
        screen: MapsNavigator
    },
    EmailAuth: {
        screen: EmailAuthNavigator
    },
    AddItemBlueprint: {
        screen: AddItemBlueprintNavigator
    },
    MenuCategory: {
        screen: MenuCategoryNavigator
    },
    SpecificOrder: {
        screen: SpecificOrderNavigator
    },
    ContactUs: {
        screen: ContactUsNavigator
    },
    OrderHistory: {
        screen: OrderHistoryNavigator
    },
    Feedback: {
        screen: Feedback
    },

    OrderComplete: {
        screen: OrderCompleteNavigator
    },
    MyBag: {
        screen: MyBagNavigator
    },
    CheckOut: {
        screen: CheckOutNavigator
    },

    Country: {
        screen: CountryNavigator
    },

    /** new navigators can be added here */
};

const DrawerAppNavigator = createDrawerNavigator({
    ...AppNavigator
}, {
    contentComponent: SideMenu,
    initialRouteName: 'SplashScreen',
    drawerWidth: windowWidth * 0.8
},);

const AppContainer = createAppContainer(DrawerAppNavigator);

export default AppContainer;
