import React, {Component} from "react";

import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from "react-native";
import {Text, Layout} from "react-native-ui-kitten";

import {connect} from 'react-redux';
import styles from "./styles";

class App extends Component {

    state = {
      count:this.props.cart.length
    }

    componentWillReceiveProps(nextProps){
      console.log('My BAG componentWillReceiveProps:: ',nextProps.cart.length)
      this.setState({count:nextProps.cart.length})
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                this
                    .props
                    .navigation
                    .navigate('MyBag')
            }}>
                <Image source={this.props.whiteIcon ? require('../../assets/icons/cart_icon_white.png') : require('../../assets/icons/cart_icon.png')}/>
                {
                  this.state.count > 0 &&
                  <ImageBackground style={{alignItems:'center',justifyContent:'center',top:-2,right:-2,position:'absolute',width:20,height:20}} source={require("../../assets/icons/badge.png")}>
                  <Text>{this.state.count}</Text>
                </ImageBackground>
                }
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => ({cart:state.MenuCategory.cart});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
