import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    SectionList,
    TextInput
} from "react-native";
import {
    Text,
    Button,
    List,
    Card,
    CardHeader,
    Input
} from "react-native-ui-kitten";

import {connect} from 'react-redux';

import * as reduxActions from '../redux/actions';
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

class App extends Component {

    state = {
        DATA: []
    }
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount() {
        const {actions: {
                loadCountry
            }} = this.props;
        loadCountry();
        this.setCountries(this.props.countries);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {countries} = nextProps;
        this.setCountries(countries);
    }

    setCountries(countries) {
        this.state.DATA = [];
        var alphabets = [
            "A", "B",  "C",  "D",     "E",  "F",   "G",   "H",
            "I",    "J",    "K",    "L",     "M",      "N", "O",
            "P",      "Q",       "R",     "S",     "T",   "U",
            "V",        "W",       "X",       "Y",      "Z"
        ];
        alphabets.forEach((A) => {
            filterCountry = {};
            filterCountry[A] = [];
            for (var i = 0; i < countries.length; i++) {
                country = countries[i];
                if (country.name.startsWith(A)) {
                    filterCountry[A].push(country);
                }
            }
            if(filterCountry[A].length>0){
              this.state.DATA.push({title:A,data:filterCountry[A]});
            }
        });

        console.log("DATA:: ",this.state.DATA);
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

                <Text style={styles.heading}>Select Country</Text>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.itemsContainer}>

                {this.renderImage()}

                {this.header()}
                <View
                    style={{
                    height: 60,
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 35,
                    alignItems: 'center'
                }}>

                    <Image
                        style={{
                        width: 16,
                        height: 16
                    }}
                        source={require("../assets/search.png")}/>

                    <TextInput
                        style={{
                        fontSize: 18
                    }}
                        placeholder={"Search"}/>
                </View>
                 <SectionList

                style={{
                  flex: 1,
                  width: '100%'
              }}
                  sections={this.state.DATA}
                  keyExtractor={(item, index) => item + index}
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  renderItem={this.renderItems }
                  renderSectionHeader={({ section: { title } }) => (
                    <View style={{backgroundColor:"#F7F7F7",height:40,justifyContent:'flex-end',paddingHorizontal:35,paddingVertical:2}}>
                      <Text style={{color:"#A7A8AB",fontSize:18}}>{title}</Text>
                    </View>
                  )}
                /> 

            </View>
        );
    }

    renderItems= ({item}) =>{
      console.log(item)
      return(
        <View
                    style={{
                    flexDirection: 'row',
                    paddingHorizontal: 35,
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    justifyContent: 'space-between',
                    flex: 1,
                    height: 60
                }}>
                    <TouchableOpacity
                        onPress={() => {
                        this
                            .props
                            .actions
                            .setCountry(item);
                        this
                            .props
                            .navigation
                            .navigate('MenuCategory');
                    }}
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Image
                            style={{
                            width: 38,
                            height: 25
                        }}
                            source={{
                            uri: item.flag
                        }}/>
                        <Text
                            style={{
                            fontSize: 18,
                            color: "#0A1F31",
                            marginStart: 15
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                        color: '#009AED',
                        fontSize: 18
                    }}>{item.description}</Text>
                </View>
      )
    }

    FlatListItemSeparator = () => {
        return (<View
            style={{
            height: 1,
            width: "100%",
            backgroundColor: "#E6E6E6"
        }}/>);
    }

}

const mapStateToProps = state => ({countries: state.Country.countries});

const mapDispatchToProps = dispatch => ({
    actions: {
        loadCountry: () => {
            dispatch(reduxActions.loadCountry());
        },
        setCountry: (selectedCountry) => {
            dispatch(reduxActions.setCountry(selectedCountry));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
