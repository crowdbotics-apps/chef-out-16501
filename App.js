import React from 'react';
import {mapping, dark} from '@eva-design/eva';
import {ApplicationProvider, Layout, Text, IconRegistry} from 'react-native-ui-kitten';
import {Provider as ReduxProvider} from 'react-redux';

import SplashScreen from './src/features/SplashScreen';
import {store} from './src/redux/store';
import AppContainer from './src/navigator/mainNavigator';
import {setupHttpConfig} from './src/utils/http';
import {crowdboticsTheme} from './src/config/crowdboticsTheme';
import * as NavigationService from './src/navigator/NavigationService';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});



persistor = persistStore(store);

export default class App extends React.Component {
    state = {
        isLoaded: false
    };

    async componentWillMount() {
        /**
     * add any aditional app config here,
     * don't use blocking requests here like HTTP requests since they block UI feedback
     * create HTTP requests and other blocking requests using redux saga
     */
        await this.loadAssets();
        console.log("App", "componentWillMount")
        setupHttpConfig();
    }

    async requestUserPermission() {
      const settings = await messaging().requestPermission();
    
      if (settings) {
        console.log('Permission settings:', settings);
      }
    }

    componentDidMount() {
        /**
     * Read above commments above adding async requests here
     */
        NavigationService.setNavigator(this.navigator);
        this.requestUserPermission()
    }

    loadAssets = async() => {
        // add any loading assets here
        this.setState({isLoaded: true});
    };

    renderLoading = () => (
        <Layout style={[styles.flex]}>
            <Text>Loading</Text>
        </Layout>
    );

    renderApp = () => (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider mapping={mapping} theme={crowdboticsTheme}>
                    <AppContainer
                        style={[styles.flex]}
                        ref={nav => {
                        this.navigator = nav;
                    }}>
                        <Layout style={[styles.flex]}>
                            <SplashScreen/>
                        </Layout>
                    </AppContainer>
                </ApplicationProvider>
            </PersistGate>
        </ReduxProvider>
    );

    render = () => this.state.isLoaded
        ? this.renderApp()
        : this.renderLoading();
}

const styles = {
    flex: {
        flex: 1
    }
};
