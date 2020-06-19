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
import {Text, Layout, Button, Input} from 'react-native-ui-kitten';
import {styles} from './styles'
import headerImage from "../assets/top_bg.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import Geolocation from '@react-native-community/geolocation';

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
                        .replace("Payment")
                }}>
                    <Image
                        style={{
                        width: 60,
                        height: 60
                    }}
                        source={require('../assets/back_icon.png')}/>
                </TouchableOpacity>

                <Text style={styles.heading}>Checkout</Text>

                <TouchableOpacity
                    style={{
                    width: 60,
                    height: 60
                }}
                    activeOpacity={0.8}></TouchableOpacity>

            </View>
        )
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
        })

        this.setLocation()
    }

    async setLocation(){
      await Geolocation
      .getCurrentPosition((geoLocation) => {
          console.log("getCurrentPosition:: ",geoLocation);
          this.setState({location_latitude: geoLocation.coords.latitude, location_longitude: geoLocation.coords.longitude});
      });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({cart: nextProps.cart});
        this.setTotal(nextProps.cart);
        if(nextProps.orderResponse && nextProps.orderResponse.success){
          this
          .props
          .navigation
          .navigate("OrderComplete");
        }
    }

    setTotal(cart) {
        total = 0;
        console.log("setTotal:: ", cart);
        for (i = 0; i < cart.length; i++) {
            item = cart[i];
            total += Number(item.price * item.quantity);
        }
        this.setState({total});
    }

    placeOrder(){
      console.log(this.props.contact);
      console.log(this.props.cart);
      this.props.actions.placeOrders({
        total:this.state.total,
        orders:this.props.cart,
        contact: this.props.contact,
        user:this.props.user,
        location_latitude:this.state.location_latitude,
        location_longitude:this.state.location_longitude,
      })
    }

    render() {
        return (
            <View style={styles.itemsContainer}>

                <ImageBackground style={styles.headerBg} source={headerImage}>

                    {this.header()}

                    <View
                        style={{
                        flexDirection: 'row',
                        paddingTop: 12,
                        justifyContent: 'space-between',
                        borderTopColor: "#E6E6E6",
                        borderTopWidth: 2
                    }}>
                        <Text
                            style={{
                            fontSize: 18,
                            color: "#fff"
                        }}>Date:</Text>
                        <Text
                            style={{
                            fontSize: 18,
                            color: "#fff",
                            fontWeight: "bold"
                        }}>{this.state.checkOutDate}</Text>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10
                    }}>
                        <Text
                            style={{
                            fontSize: 18,
                            color: "#fff"
                        }}>Total Bill:</Text>
                        <Text
                            style={{
                            fontSize: 18,
                            color: "#fff",
                            fontWeight: "bold"
                        }}>${this.state.total}</Text>
                    </View>

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
                <ScrollView
                    style={{
                    flex: 1,
                    width: '100%'
                }}>
                    <View
                        style={{
                        paddingHorizontal: 35,
                        alignItems: "center",
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        width: '100%'
                    }}>
                        <View
                            style={{
                            flexDirection: "row"
                        }}>
                            <Image source={require('../assets/place_order_3.png')}/>
                            <Text
                                category="h3"
                                style={{
                                marginHorizontal: 15,
                                fontSize: 26,
                                color: "#0A1F31"
                            }}>Your Order</Text>
                        </View>
                        <TouchableOpacity>
                            <Text
                                style={{
                                fontSize: 18,
                                color: "#EC5E53"
                            }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                        borderColor: "#DEDEDF",
                        backgroundColor: "#fff",
                        marginVertical: 20,
                        width: "100%",
                        borderWidth: 1,
                        padding: 35,
                        paddingVertical: 15
                    }}>
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

                    <View style={styles.contentContainer}>

                        <View style={styles.totalContainer}>
                            <Text category="h4" style={styles.totalText}>Total</Text>
                            <Text category="h4" style={styles.totalPriceText}>${this.state.total}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                              this.placeOrder();
                              // this
                              //     .props
                              //     .navigation
                              //     .navigate("OrderComplete")
                        }}
                            activeOpacity={.7}
                            style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>PLACE ORDER</Text>

                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
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
const mapStateToProps = state => ({successOrder:state.CheckOut.successOrder,orderResponse:state.CheckOut.orderResponse,contact:state.CheckOut.contact,cart: state.MenuCategory.cart, user: state.EmailAuth.user, accessToken: state.EmailAuth.accessToken});

const mapDispatchToProps = dispatch => ({actions: {
  placeOrders: (data) => {
    dispatch(actions.placeOrders(data));
  }
}});

export default connect(mapStateToProps, mapDispatchToProps)(App);