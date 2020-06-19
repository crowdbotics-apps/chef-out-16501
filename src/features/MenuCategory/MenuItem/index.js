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
import Icon from 'react-native-vector-icons/FontAwesome';

import BagIcon from '../../../components/MyBag'
import {connect} from 'react-redux';
import {styles} from './styles'
import headerImage from "../assets/menu_top.png"
import {ScrollView, FlatList} from "react-native-gesture-handler";
import * as reduxActions from '../redux/actions';

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

class App extends Component {

    state = {
        heading1: "Foodie",
        heading2: "Fresh Food",
        text: 'There is no better advertisement  campaign that’s is\nlow and also successful at' +
                ' the same time.\nGreat business ideas.',
        dataSource: []
    };

    UNSAFE_componentWillMount() {
        const {actions: {
                loadItemCategory
            }} = this.props;
        loadItemCategory(this.props.selectedCategory.id);

        console.log("MAINMENU UNSAFE_componentWillMount:: ", this.props.selectedCategory)
        this.setState({selectedCategory: this.props.selectedCategory});
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {item_categories} = nextProps;
        console.log("MAINMENU UNSAFE_componentWillReceiveProps:: ", item_categories)
        this.setState({dataSource: item_categories});
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
                <TouchableOpacity
                    onPress={() => {
                    this
                        .props
                        .navigation
                        .goBack()
                }}
                    activeOpacity={0.8}>
                    <Image source={require('../assets/back_icon.png')}/>
                </TouchableOpacity>

                <Text style={styles.heading}>{this.state.selectedCategory.name}</Text>

                
                <BagIcon {...this.props}/>

            </View>
        )
    }

    gridItems() {
        return (<List style={styles.grid} data={this.state.dataSource} renderItem={({item}) => (
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => {
                  this.props.actions.setSpecificItems(item);
                this
                    .props
                    .navigation
                    .navigate("SpecificOrder")
            }}
                style={styles.gridRow}>
                <ImageBackground source={{uri:item.item.image}} style={styles.imageBg}></ImageBackground>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.bottomRow}>
                    <Text numberOfLines={1} style={styles.priceText}>${item.price}</Text>
                    <TouchableOpacity activeOpacity={.8} onPress={()=>{
                      item.quantity = 1;
                      this.props.cart.push(item);
                      this.props.actions.updateCart(this.props.cart);
                    }}>
                        <View style={styles.addContainer}>
                            <Text style={styles.addText}>{"+ ADD"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )} //Setting the number of column
        numColumns={2} keyExtractor={(item, index) => index.toString()}/>)
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.itemsContainer}>

                {this.renderImage()}
                <ImageBackground
                    resizeMode={"cover"}
                    style={{
                    marginTop: 0,
                    width: windowWidth *1.3,
                    height: (windowHeight * .57),
                    justifyContent: 'center',
                    position: 'absolute'
                }}
                    source={headerImage}></ImageBackground>

                {this.header()}
                {this.gridItems()}

            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({cart:state.MenuCategory.cart,selectedCategory:state.MenuCategory.selectedCategory.item,item_categories: state.MenuCategory.item_categories});

const mapDispatchToProps = dispatch => ({
    actions: {
        loadItemCategory: (id) => {
            dispatch(reduxActions.loadItemCategory(id));
        },
        
        updateCart: (cart) => {
          dispatch(reduxActions.updateCart(cart));
        },

        setSpecificItems: (item) => {
          dispatch(reduxActions.setSpecificItems(item));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
