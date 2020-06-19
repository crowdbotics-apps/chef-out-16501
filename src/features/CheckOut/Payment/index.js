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
        this.state = {
            starCount: 0
        }
    }

    header() {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {this.props.navigation.replace("Main")}}>
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
                    activeOpacity={0.8}>

                </TouchableOpacity>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.itemsContainer}>

                <ImageBackground style={styles.headerBg} source={headerImage}>

                    {this.header()}

                    <View style={{flexDirection:'row',paddingTop:12,justifyContent:'space-between',borderTopColor:"#E6E6E6",borderTopWidth:2}}>
                      <Text style={{fontSize:18,color:"#fff"}}>Date:</Text>
                      <Text style={{fontSize:18,color:"#fff",fontWeight:"bold"}}>March 11, 2020</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                      <Text  style={{fontSize:18,color:"#fff"}}>Total Bill:</Text>
                      <Text  style={{fontSize:18,color:"#fff",fontWeight:"bold"}}>$30.60</Text>
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
                <ScrollView style={{flex:1,width:'100%'}}>
                <View style={{paddingHorizontal:35,alignItems:"center", marginTop:20,flexDirection:'row',justifyContent:"space-between",width:'100%'}}>
                  <View style={{flexDirection:"row"}}>
                    <Image
                      source={require('../assets/payment_2.png')}/>
                      <Text category="h3" style={{marginHorizontal:15,fontSize:26,color:"#0A1F31"}}>Payment Info</Text>
                  </View>
                  <TouchableOpacity>
                      <Text style={{fontSize:18,color:"#EC5E53"}}>Edit</Text>
                      </TouchableOpacity>
                </View>
                <View style={{borderColor:"#DEDEDF",backgroundColor:"#fff",marginVertical:20,width:"100%",borderWidth:1,padding:35,paddingVertical:15}}>
                  <View style={{alignItems:"center",flexDirection:'row',justifyContent:"space-between",width:'100%'}}>
                    <Image
                      source={require('../assets/visa.png')}/>
                      <Text style={{fontSize:14,color:"#6D7477",flex:1,marginStart:20}}>{"You will need to confirm the payment after the formation of your order."}</Text>
                  </View>
                  <View style={{alignItems:"center",flexDirection:'row',justifyContent:"space-between",width:'100%'}}>
                      <View style={{flex:.48}}>
                        <View style={{marginVertical:15}}>
                        <Text style={{color:"#6D7477",fontSize:14}}>{"Cardholder name".toUpperCase()}</Text>
                        <Text style={{color:"##0A1F31",fontSize:14}}>Alexandre Katherey</Text>
                        </View>

                        <View style={{marginBottom:15}}>
                        <Text style={{color:"#6D7477",fontSize:14}}>{"Expiration date".toUpperCase()}</Text>
                        <Text style={{color:"##0A1F31",fontSize:14}}>07/23</Text>
                        </View>
                      </View>
                      <View style={{flex:.48}}>
                        <View style={{marginVertical:15}}>
                        <Text style={{color:"#6D7477",fontSize:14}}>{"Card number".toUpperCase()}</Text>
                        <Text style={{color:"##0A1F31",fontSize:14}}>1290 9182 9182 0990</Text>
                        </View>
                        <View style={{marginBottom:15}}>
                        <Text style={{color:"#6D7477",fontSize:14}}>{"CVC".toUpperCase()}</Text>
                        <Text style={{color:"##0A1F31",fontSize:14}}>333</Text>
                        </View>
                        
                      </View>
                  </View>
                </View>

                  
                <View style={styles.contentContainer}>
                    
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.replace("FinalStep")}}
                        activeOpacity={.7}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Next</Text>

                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        );
    }

}
