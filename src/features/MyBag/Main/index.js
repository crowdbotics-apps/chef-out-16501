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

import {connect} from 'react-redux';
import {styles} from './styles'
import headerImage from "../assets/menu_top.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import Swipeable from 'react-native-swipeable-row';
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
          total:0,
          cart:props.cart,
          quantity:[]
        }
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

    UNSAFE_componentWillMount(){
      console.log("My Bags: ",this.props.cart)
      this.setTotal.bind(this);
      this.setTotal(this.props.cart);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      this.setState({cart:nextProps.cart});
      this.setTotal(nextProps.cart);
    }

    setTotal(cart){
      total = 0;
      console.log("setTotal:: ",cart);
      for(i=0;i<cart.length;i++){
        item=cart[i];
        total +=  Number(item.price * item.quantity);
      }
      this.setState({total});
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

                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={{marginEnd: 8}} source={require('../assets/shopping-bag.png')}/>
                    <Text style={styles.heading}>{"Your Bag"}</Text>
                </View>

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
                    <View
                        style={{
                        borderRadius: 10,
                        marginTop: 15,
                        width: '100%',
                        flex: 1,
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                        alignItems: 'center'
                    }}>

                        <View
                            style={{
                            backgroundColor: '#EC5E53',
                            minHeight: 70,
                            alignItems: "center",
                            justifyContent: 'center',
                            width: '100%'
                        }}>
                            <Text
                                category="h3"
                                style={{
                                fontSize: 26,
                                color: "#fff"
                            }}>{this.state.cart.length + " Items /\t"}
                                <Text
                                    category="h3"
                                    style={{
                                    fontWeight: "bold",
                                    fontSize: 26,
                                    color: "#fff"
                                }}>{"Total Cost $" + this.state.total}</Text>
                            </Text>
                        </View>
                        <View style={{flex:1,width:'100%'}}>
                              <ScrollView style={{flex:1,paddingBottom:15}}>
                              {this.state.cart.map((item, key) => {
                              return (
                                  this.orderItems({fullItem:item,name: item.name,count:1, notes: "Extra Cheese", size: "X 2", price: item.price, image: item.item.image})
                              );
                              })}
                               
                              </ScrollView>
                        </View>
                        <View style={styles.totalContainer}>
                            <Text category="h4" style={styles.totalText}>Total</Text>
                            <Text category="h4" style={[styles.totalPriceText,{fontSize:26}]}>${this.state.total}</Text>
                        </View>

                    </View>
                    
                    <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate("CheckOut");
                    }}
                        activeOpacity={.7}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Proceed to Payment</Text>

                    </TouchableOpacity>
            </View>
        );

        
    }

    removeItem(i){
      console.log("removeItem:: ", i);
      let filteredArray = this.state.cart.filter(item => item !== i.fullItem)
      this.setState({cart: filteredArray});
      this.setTotal(filteredArray);
      this.props.actions.updateCart(filteredArray);
    }

    addQuatity(item){
      this.state.cart.find(i => i == item).quantity += 1;
      this.props.actions.updateCart(this.state.cart);
    }

    subQuatity(item){
      if( item.quantity > 1){
        this.state.cart.find(i => i == item).quantity -= 1;
      }
      this.props.actions.updateCart(this.state.cart);
    }

    orderItems(item) {
      const rightButtons = [
        <TouchableOpacity activeOpacity={.7} style={{flex:1,justifyContent: 'center',backgroundColor:"#EC5E53",paddingHorizontal:15}}>
          <Text style={{width:'100%',fontSize:18,color:"#fff"}}><Image source={require("../assets/edit.png")}/>{"\tEdit"}</Text>
        </TouchableOpacity>
      ];
      return (
          <Swipeable rightButtons={rightButtons} rightButtonWidth={92}>
            <View style={styles.orderItemContentContainer}>
              <View style={styles.orderItemContent}>
                  <Image style={styles.orderItemImage} source={{uri:item.image}}/>
                  <View style={styles.orderItemDescription}>
                      <Text style={styles.orderItemName}>{item.name}</Text>
                      <Text style={styles.orderItemNotes}>Notes: {item.notes}</Text>
                      <Text style={styles.totalPriceText}>${item.price}</Text>
                      <View style={{marginTop:5,width:88,borderColor:'#E6E6E6',borderRadius:15,borderWidth:1,height:30,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:12,alignItems:'center'}}>
                      <TouchableOpacity onPress={() =>this.subQuatity(item.fullItem) }  activeOpacity={.5}><Image source={require("../assets/minus.png")}/></TouchableOpacity>
                        <Text style={{fontSize:14,color:"#0A1F31"}}>{item.fullItem.quantity}</Text>
                      <TouchableOpacity onPress={() =>this.addQuatity(item.fullItem) } activeOpacity={.5}><Image source={require("../assets/plus.png")}/></TouchableOpacity>
                      </View>
                  </View>
                  <TouchableOpacity onPress={()=>{
                    this.removeItem(item)
                  }} activeOpacity={.8}><Image source={require("../assets/close.png")}/></TouchableOpacity>
              </View>
              {item.lastItem == undefined && <View style={styles.orderItemSeparator}></View>}
              </View>
          </Swipeable>
      )
  }

}

const mapStateToProps = state => ({cart:state.MenuCategory.cart});

const mapDispatchToProps = dispatch => ({
    actions: {
        
        updateCart: (cart) => {
          dispatch(reduxActions.updateCart(cart));
      }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
