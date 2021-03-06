import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground
} from "react-native";
import {Text, Button} from "react-native-ui-kitten";
import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from './styles'
import headerImage from "../../../../assets/images/welcome/screen1.png"
import dot1 from "../../../../assets/images/welcome/dot1.png"
import {ScrollView} from "react-native-gesture-handler";

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

export default class App extends Component {

    state = {
        heading1: "Foodie",
        heading2: "Fast Delivery",
        text: 'There is no better advertisement  campaign that’s is\nlow and also successful at' +
                ' the same time.\nGreat business ideas.'
    };

    componentDidMount() {}

    render() {
        return (
            <ScrollView contentContainerStyle={styles.itemsContainer}>
                <ImageBackground
                    resizeMode={"contain"}
                    style={{
                    marginTop: -57,
                    width: windowWidth *1.3,
                    height: (windowHeight * .57),
                    justifyContent: 'center'
                }}
                    source={headerImage}></ImageBackground>
                <View style={styles.bottomItemsContainer}>
                    <Text style={styles.heading}>{this
                            .state
                            .heading1
                            .toUpperCase()}</Text>
                    <Text style={styles.heading2}>{this
                            .state
                            .heading2
                            .toUpperCase()}</Text>
                    <Text style={styles.text}>{this.state.text}</Text>

                    <Image source={dot1} style={styles.menu_icon}/>
                    <TouchableOpacity
                        onPress={() => {
                        this
                            .props
                            .navigation
                            .replace("Screen2")
                    }}
                        activeOpacity={.7}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Continue</Text>

                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}