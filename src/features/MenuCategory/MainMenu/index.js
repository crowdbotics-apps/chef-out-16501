import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground
} from "react-native";
import {Text, Button, List, Card, CardHeader} from "react-native-ui-kitten";
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {styles} from './styles'
import headerImage from "../assets/menu_top.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import {DrawerActions} from "react-navigation-drawer";
import * as reduxActions from '../redux/actions';
import BagIcon from '../../../components/MyBag'
import messaging from '@react-native-firebase/messaging';


const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

class App extends Component {

    state = {
        heading1: "Foodie",
        heading2: "Fresh Food",
        text: 'There is no better advertisement  campaign that’s is\nlow and also successful at' +
                ' the same time.\nGreat business ideas.',
        dataSource: []
    };

    UNSAFE_componentWillMount() {
        const {actions: {
                loadCategory
            }} = this.props;
        loadCategory();
        if(this.props.categories){
          this.setState({dataSource:this.props.categories});
        }
        this.notificationMessage()
    }

    notificationMessage(){
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        //console.log('A new FCM message arrived!', JSON.stringify(remoteMessage.data));
        this.props.navigation.navigate('Feedback',{bill: JSON.parse(remoteMessage.data.bill)});
      });
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        this.props.navigation.navigate('Feedback',{bill: JSON.parse(remoteMessage.data.bill)});
      });
  
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            this.props.navigation.navigate('Feedback',{bill: JSON.parse(remoteMessage.data.bill)});
          }
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {categories} = nextProps;
        //console.log("MAINMENU UNSAFE_componentWillReceiveProps:: ", categories)
        this.setState({dataSource:categories});
    }

    // componentDidMount() {
    //     var that = this;
    //     let items = []
    //     items.push({categoryName: "Pizza", image: require('../assets/image_2.png')})
    //     items.push({categoryName: "Pasta", image: require('../assets/image_1.png')})
    //     items.push({categoryName: "Salad", image: require('../assets/image_3.png')})
    //     items.push({categoryName: "Burger", image: require('../assets/image_4.png')})
    //     items.push({categoryName: "Dessert", image: require('../assets/image_5.png')})
    //     items.push({categoryName: "Beverage", image: require('../assets/image_6.png')})
    //     that.setState({dataSource: items});
    // }

    renderImage = () => {
        const screenSize = Dimensions.get('window');
        const imageSize = {
            width: screenSize.width,
            height: screenSize.height
        };
        return (<Image
            style={[styles.image, imageSize]}
            source={require('../assets/auth_bg.png')}/>);
    };

    header() {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                    this
                        .props
                        .navigation
                        .dispatch(DrawerActions.toggleDrawer());
                }}>
                    <Image source={require('../assets/menu_icon.png')}/>
                </TouchableOpacity>

                <Text style={styles.heading}>Menu</Text>

                <BagIcon {...this.props}/>

            </View>
        )
    }

    gridItems() {
        return (<List style={styles.grid} data={this.state.dataSource} renderItem={({item}) => (
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => {
                  this.props.actions.navigateToItem({item});
                  this.props.navigation.navigate('MenuItem');
            }}
                style={styles.gridRow}>
                <ImageBackground source={{uri:item.image}} style={styles.imageBg}>
                    <ImageBackground
                        style={{
                        width: 132,
                        height: 35,
                        justifyContent: 'center'
                    }}
                        source={require('../assets/grid_text_bg.png')}>
                        <Text style={styles.categoryName}>{item.name}</Text>
                    </ImageBackground>
                </ImageBackground>
            </TouchableOpacity>
        )} //Setting the number of column
    numColumns={2} keyExtractor={(item, index) => index.toString()}/>)
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.itemsContainer}>

                {this.renderImage()}
                <ImageBackground
                    resizeMode={"cover"}
                    style={{
                    top: 0,
                    width: windowWidth *1.3,
                    height: (windowHeight * .57),
                    justifyContent: 'center',
                    position: 'absolute'
                }}
                    source={headerImage}></ImageBackground>

                {this.header()}
                {this.gridItems()}

            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({categories: state.MenuCategory.categories});

const mapDispatchToProps = dispatch => ({
    actions: {
        loadCategory: () => {
            dispatch(reduxActions.loadCategory());
        },
        
        navigateToItem: ({item}) => {
          dispatch(reduxActions.navigateToMenuItems({item}));
      }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
