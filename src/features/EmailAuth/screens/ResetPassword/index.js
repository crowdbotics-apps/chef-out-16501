import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Dimensions, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Layout, Button, Input} from 'react-native-ui-kitten';

import {scaleModerate, scaleVertical} from '../../../../utils/scale';
import {styles} from '../styles';
import * as emailAuthActions from '../../redux/actions';
import ErrorBox from '../../../../components/ErrorBox';
import Icon from 'react-native-vector-icons/FontAwesome5';

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

    renderErrors() {
        const {recoverPasswordErrors} = this.props;
        if (recoverPasswordErrors) {
            return <ErrorBox errorText={recoverPasswordErrors}/>;
        }
    }

    submitPasswordReset() {
        //const {actions: {
         //       recoverPassword
        //    }} = this.props;

        //const {email} = this.state;

        //recoverPassword(email);
    }

    handleNewPasswordPasswordChange(newPassword) {
      this.setState({newPassword});
      // todo change keyboard and add validation
    }

    handleConfirmPasswordPasswordChange(confirmPassword) {
      this.setState({confirmPassword});
      // todo change keyboard and add validation
    }

    render() {
        const {newPassword, confirmPassword} = this.state;

        return (
            <View style={{
                flex: 1
            }}>
                {this.renderImage()}
                <ScrollView contentContainerStyle={styles.screen}>
                    <Text style={styles.heading} size="large">FOODIE</Text>
                    <Text style={styles.subHead}>Reset Password?</Text>
                    <Text style={styles.description}>Set new password for your account.</Text>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>New Password</Text>
                        <Input
                            value={newPassword}
                            onChangeText={this.handlePasswordChange}
                            placeholder="New Password"
                            size="small"
                            style={styles.input}
                            secureTextEntry={true}
                            textStyle={styles.text}
                            autoCapitalize="none"/>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <Input
                            value={confirmPassword}
                            onChangeText={this.handleConfirmPasswordPasswordChange}
                            placeholder="Confirm Password"
                            size="small"
                            style={styles.input}
                            secureTextEntry={true}
                            textStyle={styles.text}
                            autoCapitalize="none"/>
                    </View>

                    <Button style={styles.actionButon} onPress={this.submitPasswordReset}>
                        CONFIRM
                    </Button>
                    <Text style={styles.signUp} onPress={() => this.props.navigation.goBack()}>
                        <Icon size={14} style={{paddingHorizontal:10}} name="arrow-left" color="#EC5E53" />
                        <Text
                            style={[
                            styles.signUp, {
                                color: "#EC5E53"
                            }
                        ]}>
                            {"\tBack to home"}</Text>
                    </Text>
                    {this.renderErrors()}
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
