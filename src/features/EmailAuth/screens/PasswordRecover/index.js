import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Dimensions, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Layout, Button, Input} from 'react-native-ui-kitten';

import {scaleModerate, scaleVertical} from '../../../../utils/scale';
import {styles} from '../styles';
import * as emailAuthActions from '../../redux/actions';
import ErrorBox from '../../../../components/ErrorBox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import validate from 'validate.js';

var constraints = {

    email: {
        presence: true,
        email: {
            message: 'is not valid.'
        }
    }
}

class PasswordRecover extends Component {
    static navigationOptions = {
        headerMode: 'none'
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {
                email: ''
            }
        };

        this.handleEmailChange = this
            .handleEmailChange
            .bind(this);
        this.submitPasswordReset = this
            .submitPasswordReset
            .bind(this);
        this.renderErrors = this
            .renderErrors
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

    handleEmailChange(email) {
        this.setState({email});
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {recoverPasswordErrors} = nextProps;
        Toast.show(recoverPasswordErrors, Toast.LONG);
    }

    renderErrors() {
        const {recoverPasswordErrors} = this.props;
        if (recoverPasswordErrors) {
            return <ErrorBox errorText={recoverPasswordErrors}/>;
        }
    }

    submitPasswordReset() {
        const {actions: {
                recoverPassword
            }} = this.props;

        const {email} = this.state;
        let errors = validate({
            email: email
        }, constraints);

        if (errors) {
            console.log(errors)

            if (errors.email) {
                this.setState({emailError: 'Email in Empty/Invalid.'})
                Toast.show('Email in Empty/Invalid.', Toast.LONG);
                return false;
            }
            return;
        }

        recoverPassword(email);
    }

    render() {
        const {email} = this.state;

        return (
            <View style={{
                flex: 1
            }}>
                {this.renderImage()}
                <ScrollView contentContainerStyle={styles.screen}>
                    <Text style={styles.heading} size="large">FOODIE</Text>
                    <Text style={styles.subHead}>Forgot Password?</Text>
                    <Text style={styles.description}>No worries, let us help you!</Text>

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

                    <Button style={styles.actionButon} onPress={this.submitPasswordReset}>
                        CONFIRM
                    </Button>
                    <Text style={styles.signUp} onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            size={14}
                            style={{
                            paddingHorizontal: 10
                        }}
                            name="arrow-left"
                            color="#EC5E53"/>
                        <Text
                            style={[
                            styles.signUp, {
                                color: "#EC5E53"
                            }
                        ]}>
                            {"\tBack to home"}</Text>
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({recoverPasswordErrors: state.EmailAuth.errors.PasswordRecover});

const mapDispatchToProps = dispatch => ({
    actions: {
        recoverPassword: email => {
            dispatch(emailAuthActions.resetPassword(email));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps,)(PasswordRecover);
