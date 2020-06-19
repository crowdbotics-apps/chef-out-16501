import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground
} from "react-native";
import {Text, CheckBox, List} from "react-native-ui-kitten";
import StarRating from 'react-native-star-rating';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';

import BagIcon from '../../../components/MyBag'
import {connect} from 'react-redux';
import * as reduxActions from '../redux/actions';
import {styles} from './styles'
import headerImage from "../assets/specific_order.png"
import {ScrollView} from "react-native-gesture-handler";
import {DrawerActions} from "react-navigation-drawer";

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
        dataSource: {},
        starCount: 4.5,
        addOnItems: [],
        item_varients:[]
    };

    componentDidMount() {
        var that = this;
        let items = []
        items.push({
            size: "Size L",
            slice: "(8 Slices)",
            price: "$17.23",
            key: 0,
            image: require("../assets/pizza_.png"),
            selectedImage: require("../assets/pizza_select.png")
        });
        items.push({
            size: "Size M",
            slice: "(6 Slices)",
            price: "$10.15",
            key: 1,
            image: require("../assets/pizza_.png"),
            selectedImage: require("../assets/pizza_select.png")
        });
        that.setState({dataSource: items});
    }

    header() {
        return (
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate("MenuCategory")}}>
                    <Image source={require('../assets/back_icon.png')}/>
                </TouchableOpacity>

                <BagIcon {...this.props}/>

            </View>
        )
    }
    

    UNSAFE_componentWillMount() {
      const {actions: {
        loadItemVariant
          }} = this.props;
          loadItemVariant();

      if(this.props.item_varient){
        this.setState({item_varients: this.props.item_varient,specific_item:this.props.specific_item});
      }
      console.log("this.props.specific_item::",this.props.specific_item);
      this.setState({specific_item:this.props.specific_item});
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      const {item_varient,specific_item} = nextProps;
      if(item_varient){
        this.setState({item_varients: item_varient});
      }
      if(specific_item){
        this.setState({specific_item});
      }
    }

    onStarRatingPress(rating) {
        this.setState({starCount: rating});
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.itemsContainer}>

                <ImageBackground
                    resizeMode={"contain"}
                    style={styles.headerImageBg}
                    source={headerImage}></ImageBackground>

                <View style={styles.topContainer}>
                    {this.header()}
                    <View style={styles.topContent}>
                        <Text category="h3" style={styles.topHeading}>{this.state.specific_item.name}</Text>
                        <Text style={styles.topDescribe}>{this.state.specific_item.description}</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount}
                            fullStarColor={'#FFD027'}
                            emptyStarColor={'#FFD027'}
                            halfStarEnabled={true}
                            starSize={18}
                            disabled={true}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}/>
                        <Text style={styles.startCountText}>{this.state.starCount}</Text>
                    </View>
                </View>
                <View style={styles.pagerContainer}>
                    <IndicatorViewPager
                        style={{
                        flex: 1,
                        backgroundColor: 'white',
                        flexDirection: 'column-reverse'
                    }}
                        indicator={this._renderTitleIndicator()}>

                        {this.renderSize()}
                        {this.renderAdOns()}
                        {this.renderReview()}
                    </IndicatorViewPager>
                </View>

            </ScrollView>
        );
    }

    renderSize() {

        return (
            <View style={styles.sizeContainer}>
                {this.gridItems()}

                {(this.state.selectedItem != undefined) && <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate("CheckOut")}}
                    activeOpacity={.7}
                    style={styles.checkoutButtonContainer}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>

                </TouchableOpacity>
}
            </View>
        )
    }

    gridItems() {
        return (
            <List
                style={styles.grid}
                data={this.state.dataSource}
                renderItem={({item}) => (
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => {
                    this.setState({selectedItem: item.key})
                }}
                    style={styles.gridRow}>
                    <View
                        style={[
                        styles.sizeGridItemContainer,
                        (item.key == this.state.selectedItem) && {
                            borderColor: "#EC5E53"
                        }
                    ]}>
                        {(item.key == this.state.selectedItem) && <Image
                            style={styles.sizeSeletectItemIcon}
                            source={require("../assets/select_icon.png")}/>}
                        <Image
                            resizeMode="contain"
                            style={styles.sizeItemImage}
                            source={(item.key == this.state.selectedItem)
                            ? item.selectedImage
                            : item.image}/>
                        <Text style={styles.sizeTextMain}>{item.size}</Text>
                        <Text style={styles.sizeTextDescribe}>{item.slice}
                            <Text
                                style={{
                                color: "#00A807"
                            }}>{"\t" + item.price}</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}/>
        )
    }

    renderAdOns() {

        return (
            <View style={styles.adOnsContainer}>
              {this.state.item_varients.map(item => this.addOnItems(item.name, item.price,item.name))}  
            </View>
        )
    }

    addOnItems(name, price, key) {
        return (
            <View style={styles.adOnsItemContainer}>
                <CheckBox
                    textStyle={styles.adOnsItemCheckBox}
                    onChange={(isChecked) => {
                    {
                        this.state.addOnItems[key] = isChecked;
                        this.setState({addOnItems: this.state.addOnItems});
                    }
                }}
                    text={name}
                    checked={this.state.addOnItems[key]}/>
                <Text style={styles.adOnsItemPriceText}>${price}</Text>
            </View>
        )
    }

    renderReview() {
        return (
            <View style={styles.reviewContainer}>
                <ScrollView
                    style={{
                }}>
                    {this.reviewItems(require('../assets/person.png'), "Jane Garcia", "Everything was just so yummy!")}
                    {this.reviewItems(require('../assets/person_1.png'), "Felix Serrano", "Great food!")}
                    {this.reviewItems(require('../assets/person.png'), "Jane Garcia", "Everything was just so yummy!")}
                    {this.reviewItems(require('../assets/person_1.png'), "Felix Serrano", "Great food!")}
                </ScrollView>
            </View>
        )
    }

    reviewItems(dp, name, comment) {
        return (
            <View style={styles.reviewItemContainer}>
                <View style={styles.reviewItemContent}>
                    <Image style={styles.reviewPersonImage} source={dp}/>
                    <View style={styles.reviewDescriptionContent}>
                        <Text style={styles.reviewPersonName}>{name}</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount}
                            fullStarColor={'#FFD027'}
                            emptyStarColor={'#FFD027'}
                            halfStarEnabled={true}
                            starSize={16}
                            disabled={true}/>
                        <Text style={styles.reviewPersonComment}>{comment}</Text>
                    </View>
                    <View style={styles.reviewDateTimeContent}>
                        <Text style={styles.reviewTimeText}>23 Mar 2019</Text>
                        <Text style={styles.reviewTimeText}>12:45 pm</Text>
                    </View>
                </View>
            </View>
        )
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator
            selectedItemTextStyle={{
            color: "#0A1F31",
            width: 103,
            textAlign: 'center'
        }}
            itemTextStyle={{
            color: "#A0A4A6",
            width: 80,
            textAlign: 'center'
        }}
            selectedBorderStyle={{
            backgroundColor: "#EC5E53"
        }}
            style={{
            backgroundColor: '#fff',
            borderBottomColor: "#E6E6E6",
            borderBottomWidth: 2,
            justifyContent: 'space-between'
        }}
            titles={['Size', 'Add ons', 'Review']}/>;
    }
}

const mapStateToProps = state => ({specific_item:state.MenuCategory.specific_item,item_varient:state.SpecificOrder.item_varient});

const mapDispatchToProps = dispatch => ({
    actions: {
      loadItemVariant: () => {
            dispatch(reduxActions.loadItemVariant());
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

