import React from 'react';
import {
    TouchableHighlight,
    View,
    ScrollView,
    Image,
    Platform,
    StyleSheet
} from 'react-native';
import {Text, withStyles} from 'react-native-ui-kitten';
import {installed_blueprints} from '../config/installed_blueprints';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerActions} from 'react-navigation-drawer';

class _SideMenu extends React.Component {

    state = {
        menuShow: false
    }

    onMenuItemPressed = item => {
        this
            .props
            .navigation
            .navigate(item.access_route);
    };

    renderIcon = () => (<Image
        style={this.props.themedStyle.icon}
        source={require('../assets/images/smallLogo.png')}/>);

    renderMenuItem = item => (
        <View>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => {
                if (item.subMenu) {
                    this.setState({
                        menuShow: !this.state.menuShow
                    });
                } else {
                    this
                        .props
                        .navigation
                        .navigate(item.route)
                }
            }}>
                <View
                    style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View
                        style={{
                        flexDirection: 'row',
                        flex: 1,
                        borderBottomWidth: 2,
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        borderBottomColor: '#ffffff30',
                        height: 55
                    }}>
                        <View
                            style={{
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginEnd: 15
                        }}>
                            <Image
                                style={{
                                tintColor: '#ffffff80'
                            }}
                                source={item.icon}/>
                        </View>
                        <Text
                            style={{
                            fontSize: 18,
                            color: '#ffffff80'
                        }}>{item.name}</Text>
                    </View>
                    <View
                        style={{
                        width: 60,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {item.subMenu && <TouchableOpacity activeOpacity={.8}>
                            <Image
                                style={{
                                tintColor: '#fff'
                            }}
                                source={this.state.menuShow
                                ? require('../assets/icons/menu/up_arrow.png')
                                : require('../assets/icons/menu/down_arrow.png')}/>
                        </TouchableOpacity>
}
                    </View>
                </View>
            </TouchableOpacity>
            {this.state.menuShow && item.subMenu && this.menuItem()}
        </View>
    );

    menuItem() {
        return (

            <View style={{
                paddingStart: 80
            }}>
                {this.renderSubMenu({name: "Pizza", icon: require('../assets/icons/menu/pizza.png')})}
                {this.renderSubMenu({name: "Pasta", icon: require('../assets/icons/menu/pasta.png')})}
                {this.renderSubMenu({name: "Salad", icon: require('../assets/icons/menu/salad.png')})}
                {this.renderSubMenu({name: "Desert", icon: require('../assets/icons/menu/desert.png')})}
                {this.renderSubMenu({name: "Beverage", icon: require('../assets/icons/menu/beverage.png')})}
            </View>
        )
    }

    renderSubMenu(item) {
        return (
            <TouchableOpacity activeOpacity={0.8}>
                <View
                    style={{
                    flexDirection: 'row',
                    flex: 1,
                    borderBottomWidth: 2,
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    borderBottomColor: '#ffffff30',
                    height: 60
                }}>
                    <View
                        style={{
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginEnd: 15
                    }}>
                        <Image
                            style={{
                            tintColor: '#fff'
                        }}
                            source={item.icon}/>
                    </View>
                    <Text
                        style={{
                        fontSize: 18,
                        color: '#fff'
                    }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderMenu() {
        return (

            <View style={{
                width: '100%'
            }}>
                {this.renderMenuItem({name: "Home", icon: require('../assets/icons/menu/home.png'), route: ""})}
                {this.renderMenuItem({name: "Menu", icon: require('../assets/icons/menu/menu.png'), subMenu: {}})}
                {this.renderMenuItem({name: "Your Bag", icon: require('../assets/icons/menu/bag.png'), route: ""})}
                {this.renderMenuItem({name: "Contact Us", icon: require('../assets/icons/menu/contact.png'), route: "ContactUs"})}
                {this.renderMenuItem({name: "Order History", icon: require('../assets/icons/menu/history.png'), route: "OrderHistory"})}
                {this.renderMenuItem({name: "Policy", icon: require('../assets/icons/menu/policy.png'), route: ""})}
            </View>
        )
    }

    render = () => (
        <View style={this.props.themedStyle.root}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={[this.props.themedStyle.container, this.props.themedStyle.content]}>
                    <Text category="h3" style={this.props.themedStyle.text}>
                        FOODIE
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                        this
                            .props
                            .navigation
                            .dispatch(DrawerActions.toggleDrawer());
                    }}>
                        <Image source={require('../assets/icons/close_icon.png')}/>
                    </TouchableOpacity>
                </View>
                {this.renderMenu()}
            </ScrollView>
        </View>
    );
}

export default SideMenu = withStyles(_SideMenu, theme => ({
    container: {
        height: 80,
        paddingHorizontal: 20,
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#EC5E53"
    },
    root: {
        paddingTop: Platform.OS === 'ios'
            ? 20
            : 0,
        backgroundColor: "#EC5E53",
        flex: 1
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        marginRight: 13
    },
    text: {
        color: '#fff'
    }
}));
