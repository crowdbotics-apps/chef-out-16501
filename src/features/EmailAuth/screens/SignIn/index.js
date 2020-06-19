import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Dimensions, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Layout, Button, Input} from 'react-native-ui-kitten';

import {scaleModerate, scaleVertical} from '../../../../utils/scale';
import {styles} from '../styles';
import Toast from 'react-native-simple-toast';
import * as emailAuthActions from '../../redux/actions';
import ErrorBox from '../../../../components/ErrorBox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import validate from 'validate.js';
import messaging from '@react-native-firebase/messaging';

import {LoginManager} from "react-native-fbsdk";

var constraints = {

    email: {
        presence: true,
        email: {
            message: 'is not valid.'
        }
    },
    password: {
        presence: true,
        length: {
            minimum: 6,
            maximum: 20,
            message: "must be at least 6 characters and maximum 20 characters."
        }
    }
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            validationErrors: {}
        };

        this.handleEmailChange = this
            .handleEmailChange
            .bind(this);
        this.handlePasswordChange = this
            .handlePasswordChange
            .bind(this);
        this.goToPasswordRecover = this
            .goToPasswordRecover
            .bind(this);
        this.goToSignUp = this
            .goToSignUp
            .bind(this);
        this.submitLogin = this
            .submitLogin
            .bind(this);
        this.loginFacebook = this
            .loginFacebook
            .bind(this);
    }

    componentWillMount() {
        if (this.props.accessToken) {
            this.saveToken(this.props.accessToken)
            this
                .props
                .navigation
                .navigate("Country");
        }
    }

    loginFacebook() {

        const {actions: {
                loginFacebook
            }} = this.props;
        loginFacebook()
    }

    renderImage = () => {
        const screenSize = Dimensions.get('window');
        const imageSize = {
            width: screenSize.width,
            height: screenSize.height
        };
        return (<Image
            style={[styles.image, imageSize]}
            source={require('../../../../assets/images/auth/auth_bg.png')}/>);
    };

    saveToken(token) {
        messaging()
            .getToken()
            .then(registration_id => {
                console.log("SignIN", registration_id);
                this.props.actions.sendFCMToken({
                  registration_id,
                  type:'android',
                  token
                })
            });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {signInErrors} = nextProps;
        console.log("UNSAFE_componentWillReceiveProps:: ", nextProps)
        Toast.show(signInErrors, Toast.LONG);
        if (nextProps.accessToken) {

          this.saveToken(nextProps.accessToken)
            this
                .props
                .navigation
                .navigate("Country")
        }
    }

    handleEmailChange(email) {
        this.setState({email});
        // todo add email validation
    }

    handlePasswordChange(password) {
        this.setState({password});
        // todo change keyboard and add validation
    }

    renderErrors() {
        const {signInErrors} = this.props;
        if (signInErrors) {
            return <ErrorBox errorText={signInErrors}/>;
        }
    }

    submitLogin() {

        const {actions: {
                login
            }} = this.props;

        const {email, password} = this.state;

        // todo add disable buttons on submit
        let errors = validate({
            email: email,
            password: password
        }, constraints);

        if (errors) {
            console.log(errors)

            if (errors.email) {
                this.setState({emailError: 'Email in Empty/Invalid.'})
                Toast.show('Email in Empty/Invalid.', Toast.LONG);
                return false;
            }
            if (errors.password) {
                this.setState({passwordError: 'Password in Empty.'})
                Toast.show('Password in Empty.', Toast.LONG);
                return false;
            }
            return;
        }

        // todo add disable buttons on submit
        login({email: email, password});

        //this.setState({email: '', password: ''});
    }

    goToPasswordRecover() {
        const {navigation} = this.props;
        navigation.navigate('RecoverPassword');
    }

    goToSignUp() {
        const {navigation} = this.props;
        navigation.navigate('SignUp');
    }

    render() {
        const {email, password} = this.state;
        const {errors} = this.props;

        return (
            <View style={{
                flex: 1
            }}>
                {this.renderImage()}
                <ScrollView contentContainerStyle={styles.screen}>
                    <Text style={styles.heading} size="large">FOODIE</Text>
                    <Text style={styles.subHead}>Login to your account</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button}>
                            <Icon name="twitter" size={20} color="#ED6854"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon name="google" size={20} color="#ED6854"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon name="facebook" size={20} color="#ED6854"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Email address</Text>
                        <Input
                            value={email}
                            onChangeText={this.handleEmailChange}
                            placeholder="Email"
                            size="small"
                            style={styles.input}
                            keyboardType="email-address"
                            textStyle={styles.text}
                            autoCapitalize="none"/>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Password</Text>
                        <Input
                            value={password}
                            onChangeText={this.handlePasswordChange}
                            placeholder="Password"
                            size="small"
                            style={styles.input}
                            secureTextEntry={true}
                            textStyle={styles.text}
                            autoCapitalize="none"/>
                    </View>
                    <Text style={[styles.textRow]} onPress={this.goToPasswordRecover}>
                        Forgot password?
                    </Text>

                    <TouchableOpacity
                        activeOpacity={.7}
                        style={[styles.actionButon]}
                        onPress={this.submitLogin}>
                        <Text
                            style={{
                            color: '#fff',
                            fontSize: 15
                        }}>{"LOGIN"}</Text>
                    </TouchableOpacity>

                    <Text style={styles.Or}>Or</Text>

                    <TouchableOpacity
                        activeOpacity={.7}
                        style={[
                        styles.actionButon, {
                            backgroundColor: "#3B5A99",
                            marginTop: 0
                        }
                    ]}
                        onPress={this.loginFacebook}>
                        <Image
                            style={styles.fbIcon}
                            source={require('../../../../assets/images/auth/fb.png')}/>
                        <Text
                            style={{
                            color: '#fff',
                            fontSize: 15
                        }}>{"LOGIN WITH FACEBOOK"}</Text>
                    </TouchableOpacity>

                    <Text style={styles.signUp} onPress={this.goToSignUp}>
                        {"I don’t have an account.\t"}
                        <Text
                            style={[
                            styles.signUp, {
                                color: "#EC5E53"
                            }
                        ]}>
                            {"Sign up"}</Text>
                    </Text>

                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({signInErrors: state.EmailAuth.errors.SignIn, accessToken: state.EmailAuth.accessToken});

const mapDispatchToProps = dispatch => ({
    actions: {
        login: ({email, password}) => {
            dispatch(emailAuthActions.login({email, password}));
        },

        loginFacebook: () => {
            dispatch(emailAuthActions.loginFB({call: 'LOGIN'}));
        },

        sendFCMToken: ({registration_id, type, token}) => {
            dispatch(emailAuthActions.sendFCMToken({
                    registration_id,
                    type,
                    token
            }));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps,)(SignIn);
