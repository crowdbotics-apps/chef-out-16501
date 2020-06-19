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
import {connect} from 'react-redux';

import BagIcon from '../../../components/MyBag'
import {styles} from './styles'
import headerImage from "../assets/top_bg.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import StarRating from 'react-native-star-rating';
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
            starCount: 5,
            time:'',
            review_text:'',
            checkOutDate:"",
            bill:props.navigation.state.params.bill
          //   bill: {
          //     id: 58,
          //     total_amount: 60.0,
          //     timestamp_created: "2020-04-29T21:38:29.264234Z",
          //     status: "pending",
          //     location_latitude: "37.4219983333333346",
          //     location_longitude: "-122.0840000000000174",
          //     address: "",
          //     profile: 4,
          //     contact_info: 15
          // }
        }
        //console.log('A new FCM message arrived!', props.navigation.state.params.bill);
    }

    UNSAFE_componentWillMount(){
      this.setDateTime()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps.reviewResponse && nextProps.reviewResponse.success){
        this
        .props
        .navigation
        .navigate("MenuCategory");
      }
    }

    setDateTime(){
      d = new Date(this.state.bill.timestamp_created);
      var hour = d.getHours() == 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours());
      var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
      var ampm = d.getHours() < 12 ? 'AM' : 'PM';
      var time = hour + ':' + min + ' ' + ampm;
      
      checkOutDate = + d.getDate()+ " " + this.getMonthName(d) + " " + d.getFullYear()

      this.setState({time,checkOutDate})
    
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

    header() {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                    this
                        .props
                        .navigation
                        .goBack()
                }}>
                    <Image
                        style={{
                        width: 60,
                        height: 60
                    }}
                        source={require('../assets/back_icon.png')}/>
                </TouchableOpacity>

                <Text style={styles.heading}>Review</Text>

                <BagIcon whiteIcon={true} {...this.props}/>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.itemsContainer}>

                <ImageBackground style={styles.headerBg} source={headerImage}>

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
                <View style={styles.contentContainer}>
                    <Text
                        category="h4"
                        style={{
                        fontSize: 26,
                        color: "#0A1F31"
                        }}>{this.state.checkOutDate} at {this.state.time}</Text>
                    <Text
                        category="h4"
                        style={{
                        fontSize: 26,
                        color: "#0A1F31"
                        }}>Order #{this.state.bill.id}</Text>
                    <Text style={styles.feedbackText}>Feedback for you order</Text>
                    <View style={{
                        width: 150
                    }}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount}
                            fullStarColor={'#FFD027'}
                            emptyStarColor={'#A7A8AB'}
                            backgroundColor={'#A7A8AB'}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            halfStarEnabled={true}
                            starSize={27}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={this.state.review_text}
                            style={styles.input}
                            onChangeText={(review_text) => {
                              this.setState({review_text})
                            }}
                            placeholderTextColor="#6D7477"
                            placeholder="Write a review"/>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                          this.props.actions.sendReview({bill_id:this.state.bill.id,review_text:this.state.review_text,rating:this.state.starCount})
                        }}
                        activeOpacity={.7}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>SUBMIT</Text>

                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    onStarRatingPress(rating) {
        this.setState({starCount: rating});
    }
}

const mapStateToProps = state => ({reviewResponse: state.MenuCategory.reviewResponse,reviewError: state.MenuCategory.reviewError});

const mapDispatchToProps = dispatch => ({
  actions: {
      sendReview: (data) => {
          dispatch(reduxActions.reviewItem(data));
      },
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
