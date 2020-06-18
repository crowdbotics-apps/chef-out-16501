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
import {connect} from 'react-redux';
import {Text, Layout, Button, Input} from 'react-native-ui-kitten';
import {styles} from './styles'
import headerImage from "../assets/top_bg.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import StarRating from 'react-native-star-rating';
import validate from 'validate.js';
import Toast from 'react-native-simple-toast';
import * as actions from '../redux/actions';

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

var constraints = {

    email: {
        presence: true,
        email: {
            message: 'is not valid.'
        }
    },
    first_name: {
        presence: true
    },
    last_name: {
        presence: true
    },
    address: {
        presence: true
    },
    phone: {
        presence: true
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,

            first_name: null,
            last_name: null,
            email: null,
            address: null,
            phone: null,
            total: 0
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

    UNSAFE_componentWillMount() {
        this.setTotal(this.props.cart);

        dt = new Date();
        this.setState({
            checkOutDate: this.getMonthName(dt) + " " + dt.getDate() + ", " + dt.getFullYear()
        })
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

    submitContactForm() {

        const {
            first_name,
            last_name,
            phone,
            email,
            address,
            checkOutDate
        } = this.state;

        let errors = validate({
            first_name,
            last_name,
            phone,
            email,
            address
        }, constraints);

        if (errors) {
            console.log(errors)
            if (errors.first_name) {
                Toast.show('First Name in required.', Toast.LONG);
                return false;
            }
            if (errors.last_name) {
                Toast.show('Last Name in required', Toast.LONG);
                return false;
            }
            if (errors.phone) {
                Toast.show('Phone in required', Toast.LONG);
                return false;
            }
            if (errors.email) {
                Toast.show('Email in Empty/Invalid.', Toast.LONG);
                return false;
            }
            if (errors.address) {
                Toast.show('Address in required', Toast.LONG);
                return false;
            }
            return;
        }
        this
            .props
            .actions
            .checkOutContact({
                first_name,
                last_name,
                phone,
                email,
                address,
                checkOutDate
            })
        this
            .props
            .navigation
            .replace("Payment")
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

    render() {
        const {first_name, last_name, phone, address, email} = this.state;
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
                        justifyContent: 'flex-start',
                        width: '100%'
                    }}>
                        <Image source={require('../assets/contact_1.png')}/>
                        <Text
                            category="h3"
                            style={{
                            marginHorizontal: 15,
                            fontSize: 26,
                            color: "#0A1F31"
                        }}>Contact Info</Text>
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
                        <View
                            style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <View
                                style={[
                                styles.fieldContainer, {
                                    flex: .48
                                }
                            ]}>
                                <Text style={styles.label}>First Name</Text>
                                <Input
                                    value={first_name}
                                    placeholder="John"
                                    size="small"
                                    onChangeText={(first_name) => {
                                    this.setState({first_name})
                                }}
                                    style={styles.input}
                                    textStyle={styles.text}
                                    autoCapitalize="words"/>
                            </View>
                            <View
                                style={[
                                styles.fieldContainer, {
                                    flex: .48
                                }
                            ]}>
                                <Text style={styles.label}>Last Name</Text>
                                <Input
                                    value={last_name}
                                    placeholder="Smith"
                                    size="small"
                                    onChangeText={(last_name) => {
                                    this.setState({last_name})
                                }}
                                    style={styles.input}
                                    textStyle={styles.text}
                                    autoCapitalize="words"/>
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Phone</Text>
                            <Input
                                value={phone}
                                placeholder="0956 683 XXXX"
                                keyboardType="phone-pad"
                                size="small"
                                onChangeText={(phone) => {
                                this.setState({phone})
                            }}
                                style={styles.input}
                                textStyle={styles.text}
                                autoCapitalize="none"/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Email</Text>
                            <Input
                                value={email}
                                placeholder="john@gmail.cm"
                                size="small"
                                keyboardType="email-address"
                                onChangeText={(email) => {
                                this.setState({email})
                            }}
                                style={styles.input}
                                textStyle={styles.text}
                                autoCapitalize="none"/>
                        </View>

                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Address</Text>
                            <Input
                                value={address}
                                placeholder="Your detailed address for delivery"
                                size="small"
                                numberOfLines={3}
                                onChangeText={(address) => {
                                this.setState({address})
                            }}
                                style={styles.input}
                                textStyle={styles.text}
                                autoCapitalize="none"/>
                        </View>
                    </View>

                    <View style={styles.contentContainer}>

                        <TouchableOpacity
                            onPress={() => {
                            this.submitContactForm()
                        }}
                            activeOpacity={.7}
                            style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>NEXT</Text>

                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({cart: state.MenuCategory.cart, user: state.EmailAuth.user, accessToken: state.EmailAuth.accessToken});

const mapDispatchToProps = dispatch => ({
    actions: {
        checkOutContact: (contact) => {
            dispatch(actions.addContact(contact));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps,)(App);
