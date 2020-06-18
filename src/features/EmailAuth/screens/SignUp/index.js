import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Dimensions, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Layout, Button, Input} from 'react-native-ui-kitten';

import {scaleModerate} from '../../../../utils/scale';
import {styles} from '../styles';
import * as emailAuthActions from '../../redux/actions';
import ErrorBox from '../../../../components/ErrorBox';
import Toast from 'react-native-simple-toast';
import validate from 'validate.js';

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
    },
    confirm_password: {
        equality: "password",
        presence: {
            message: "^Password is different from password confirmation."
        }
    }
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirm_password: '',
            validationErrors: {},
            emailError: "",
            passwordError: "",
            confirm_passwordError: ""
        };

        this.handleEmailChange = this
            .handleEmailChange
            .bind(this);
        this.handlePasswordChange = this
            .handlePasswordChange
            .bind(this);
        this.handleConfirmPasswordChange = this
            .handleConfirmPasswordChange
            .bind(this);
        this.submitSignUp = this
            .submitSignUp
            .bind(this);
        this.loginFacebook = this
            .loginFacebook
            .bind(this);
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {signUpErrors} = nextProps;
        if (signUpErrors) {
            Toast.show(signUpErrors, Toast.LONG);
        }
        if(nextProps.accessToken){
          this.props.navigation.navigate("Country")
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

    handleConfirmPasswordChange(confirm_password) {
        this.setState({confirm_password});
        // todo change keyboard and add validation
    }

    renderErrors() {
        const {signUpErrors} = this.props;
        if (signUpErrors) {
            return <ErrorBox errorText={signUpErrors}/>;
        }
    }

    submitSignUp() {
        console.log(this.state);
        const {actions: {
                signUp
            }} = this.props;

        const {email, password, confirm_password} = this.state;

        // todo add disable buttons on submit
        let errors = validate({
            email: email,
            password: password,
            confirm_password: confirm_password
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
            if (errors.confirm_password) {
                this.setState({confirm_passwordError: "Confirm Password in Empty or Not Same."})
                Toast.show('Confirm Password in Empty or Not Same.', Toast.LONG);
                return false;
            }
            return;
        }
        signUp({email, password});

        this.setState({email: '', password: '', confirm_password: ''});
    }

    loginFacebook() {

        const {actions: {
                loginFacebook
            }} = this.props;
        loginFacebook()
    }

    render() {
        const {email, password, confirm_password} = this.state;
        const {errors} = this.props;

        return (
            <View style={{
                flex: 1
            }}>
                {this.renderImage()}
                <ScrollView contentContainerStyle={styles.screen}>
                    <Text style={styles.heading} size="large">FOODIE</Text>
                    <Text style={styles.subHead}>Signup for an account</Text>
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

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <Input
                            value={confirm_password}
                            onChangeText={this.handleConfirmPasswordChange}
                            placeholder="Confirm Password"
                            size="small"
                            style={styles.input}
                            secureTextEntry={true}
                            textStyle={styles.text}
                            autoCapitalize="none"/>
                    </View>

                    <TouchableOpacity
                        activeOpacity={.7}
                        style={[styles.actionButon]}
                        onPress={this.submitSignUp}>
                        <Text
                            style={{
                            color: '#fff',
                            fontSize: 15
                        }}>{"SIGNUP"}</Text>
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

                    <Text style={styles.signUp} onPress={() => this.props.navigation.goBack()}>
                        {"I already have an account.\t"}
                        <Text
                            style={[
                            styles.signUp, {
                                color: "#EC5E53"
                            }
                        ]}>
                            {"Login"}</Text>
                    </Text>

                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({signUpErrors: state.EmailAuth.errors.SignUp,accessToken: state.EmailAuth.accessToken});

const mapDispatchToProps = dispatch => ({
    actions: {
        signUp: ({email, password}) => {
            dispatch(emailAuthActions.signUp({email, password}));
        },

        loginFacebook: () => {
            dispatch(emailAuthActions.loginFB({call:'SIGNUP'}));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps,)(SignUp);
