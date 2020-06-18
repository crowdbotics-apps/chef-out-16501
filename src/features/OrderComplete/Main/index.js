import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    TextInput
} from "react-native";
import {Text} from "react-native-ui-kitten";

import {styles} from './styles'
import headerImage from "../assets/top_bg.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import {connect} from 'react-redux';
import * as reduxActions from '../../MenuCategory/redux/actions';

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          starCount: 0,
          cart:props.cart
        }
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
                <View>
                    <Text style={styles.heading}>Order Complete</Text>
                </View>
                <TouchableOpacity
                    style={{
                    width: 60,
                    height: 60
                }}
                    activeOpacity={1}></TouchableOpacity>

            </View>
        )
    }

    UNSAFE_componentWillReceiveProps(nextProp){
      console.log("UNSAFE_componentWillReceiveProps:: ", nextProp.cart.length)
      
    }

    getMonthName(dt) {
      mlist = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
      ];
      return mlist[dt.getMonth()];
    };

    UNSAFE_componentWillMount() {
      console.log("My Bags: ", this.props.cart)
      this
          .setTotal
          .bind(this);
      this.setTotal(this.props.cart);
      dt = new Date();
      this.setState({
          checkOutDate: this.getMonthName(dt) + " " + dt.getDate() + ", " + dt.getFullYear()
      });
      console.log(this.props.orderResponse)
    }

    setTotal(cart) {
      total = 0;
      console.log("setTotal:: ", cart);
      for (i = 0; i < cart.length; i++) {
          item = cart[i];
          total +=  Number(item.price * item.quantity);
      }
      this.setState({total});
    }

    render() {
        return (
            <View style={styles.itemsContainer}>

                <View style={styles.headerBg}>
                    {this.header()}

                    <Text style={styles.orderTimeText}>{this.state.checkOutDate+" at 7:15 PM\nOrder #"+this.props.orderResponse.success.id}</Text>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <ScrollView style={{
                        flex: 1
                    }}>
                        <View style={styles.orderListContainer}>
                        {this
                            .state
                            .cart
                            .map((item, key) => {
                                return (this.orderItems({
                                    fullItem: item,
                                    name: item.name,
                                    count: 1,
                                    notes: "Extra Cheese",
                                    size: "X 2",
                                    price: item.price,
                                    image: item.image
                                }));
                            })}
                        </View>
                        <View style={styles.totalContainer}>
                            <Text category="h4" style={styles.totalText}>Total</Text>
                            <Text category="h4" style={styles.totalPriceText}>${this.state.total}</Text>
                        </View>

                        <View style={styles.okayContainer}>
                            <Text category="h4" style={styles.okayText}>Give your okay a review.</Text>
                            <TouchableOpacity
                                onPress={() => {
                                  this.props.navigation.navigate("MenuCategory");
                                }}
                                activeOpacity={.7}
                                style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>OKAY</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    onStarRatingPress(rating) {
        this.setState({starCount: rating});
    }

    orderItems(item) {
        return (
            <View style={styles.orderItemContentContainer}>
                <View style={styles.orderItemContent}>
                    <Image style={styles.orderItemImage} source={{uri:item.image}}/>
                    <View style={styles.orderItemDescription}>
                        <Text style={styles.orderItemName}>{item.name}</Text>
                        <Text style={styles.orderItemNotes}>Notes: {item.notes}</Text>
                    </View>
                    <Text style={styles.orderSizeText}>{item.size}</Text>
                    <Text style={styles.orderPriceText}>${item.price}</Text>
                </View>
                {item.lastItem == undefined && <View style={styles.orderItemSeparator}></View>}
            </View>
        )
    }
}

const mapStateToProps = state => ({successOrder:state.CheckOut.successOrder,orderResponse:state.CheckOut.orderResponse,cart: state.MenuCategory.cart});

const mapDispatchToProps = dispatch => ({actions: {
  clearCart: () => {
    dispatch(reduxActions.clearCart());
  },
}});

export default connect(mapStateToProps, mapDispatchToProps)(App);
