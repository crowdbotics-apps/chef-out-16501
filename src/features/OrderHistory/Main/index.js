import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground
} from "react-native";
import {Text} from "react-native-ui-kitten";

import {styles} from './styles'
import headerImage from "../assets/top_bg.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import StarRating from 'react-native-star-rating';

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

                <Text style={styles.heading}>Orders</Text>

                <TouchableOpacity
                    style={{
                    width: 60,
                    height: 60
                }}
                    activeOpacity={0.8}>

                    <Image
                        style={{
                        width: 60,
                        height: 60
                    }}
                        source={require('../assets/cart_icon.png')}/>
                </TouchableOpacity>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.itemsContainer}>

                <ImageBackground
                    style={styles.topBgImage}
                    source={headerImage}>

                    {this.header()}

                    <Image
                        style={{
                        width: windowWidth,
                        height: 21,
                        position: 'absolute',
                        bottom: -10
                    }}
                        resizeMode="repeat"
                        source={require('../assets/grill.png')}/>
                </ImageBackground>
                <View style={styles.reviewContainer}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                        flex: 1
                    }}>
                        {this.reviewItems(require('../assets/person.png'), "Greek Restaurant", "COD", "Delivered")}
                        {this.reviewItems(require('../assets/person.png'), "Greek Restaurant", "COD", "Delivered")}
                        {this.reviewItems(require('../assets/person.png'), "Greek Restaurant", "COD", "Delivered")}
                        {this.reviewItems(require('../assets/person.png'), "Greek Restaurant", "COD", "Delivered")}
                        {this.reviewItems(require('../assets/person.png'), "Greek Restaurant", "COD", "Delivered")}
                        {this.reviewItems(require('../assets/person.png'), "Greek Restaurant", "COD", "Delivered")}
                        {this.reviewItems(require('../assets/person.png'), "Greek Restaurant", "COD", "Delivered")}
                        {this.reviewItems(require('../assets/person.png'), "Greek Restaurant", "COD", "Delivered")}

                    </ScrollView>
                </View>
            </View>
        );
    }

    reviewItems(dp, name, payment_method, status) {
        return (
            <View style={styles.reviewItemContainer}>
                <View style={styles.reviewItemContent}>
                    <Image style={styles.reviewPersonImage} source={dp}/>
                    <View style={styles.reviewDescriptionContent}>
                        <Text style={styles.reviewPersonName}>{name}</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={4.5}
                            fullStarColor={'#FFD027'}
                            emptyStarColor={'#FFD027'}
                            halfStarEnabled={true}
                            starSize={18}
                            disabled={true}/>
                        <Text style={styles.reviewPaymentMethod}>Payment Method: {payment_method}</Text>
                        <Text style={styles.reviewOrderStatus}>Status: {status}</Text>
                    </View>
                    <View style={styles.reviewDateTimeContent}>
                        <Text style={styles.reviewTimeText}>23 Mar 2019</Text>
                        <Text style={styles.reviewTimeText}>12:45 pm</Text>
                    </View>
                </View>
            </View>
        )
    }

}
