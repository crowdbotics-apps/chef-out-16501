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

import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {styles} from './styles'
import headerImage from "../assets/menu_top.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import {DrawerActions} from "react-navigation-drawer";

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

export default class App extends Component {
    constructor(props) {
        super(props);
    }

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
                        .navigate("MenuCategory");
                }}>
                    <Image
                        style={{
                        width: 60,
                        height: 60
                    }}
                        source={require('../assets/back_icon.png')}/>
                </TouchableOpacity>

                <Text style={styles.heading}>Contact Us</Text>

                <TouchableOpacity
                    style={{
                    width: 60,
                    height: 60
                }}
                    activeOpacity={0.8}></TouchableOpacity>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.itemsContainer}>

                {this.renderImage()}
                <ImageBackground
                    resizeMode={"contain"}
                    style={{
                    marginTop: 0,
                    width: windowWidth *1.3,
                    height: (windowHeight * .5),
                    justifyContent: 'center',
                    position: 'absolute'
                }}
                    source={headerImage}></ImageBackground>

                {this.header()}
                <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%',flex:1}}>
                <View
                    style={styles.MapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.mapView}
                        initialRegion={{
                          //customize where you want the maps to start
                          latitude: 37.78825,
                          longitude: -122.4324,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421
                        }}/>
                </View>

                <View style={styles.locationtextContainer}>
                      <Text category="h4" style={styles.locationtextHeader}>{"Contact us if you\nneed help with your\norder"}</Text>
                      <Text style={styles.locationtextDetails}>{"Australia\n10-12 Spencer St.\nFive Dock NSW 2046\n\ncheezepizza@gmail.com\n129 19289 928"}</Text>
                </View>
                </ScrollView>
            </View>
        );
    }

}
