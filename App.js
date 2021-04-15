import React from 'react';
import * as SecureStore from 'expo-secure-store';
import AppLoading from 'expo-app-loading';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import Toast from "react-native-fast-toast";
import * as Location from 'expo-location';
import { setI18nConfig } from 'helpers/utils.js';
import fonts from 'fonts';

export default class App extends React.Component {

  state = {
    fontsLoaded: false,
    errorMsg: null
  };

  async loadFontsAsync() {
    await Font.loadAsync(fonts).then(() =>
      this.setState({ fontsLoaded: true }));
  }

  componentDidMount = async () => {
    // load fonts
    await this.loadFontsAsync();
    
    // init I18 config
    setI18nConfig();

    // get location
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({ErrorMsg : 'Oops, this will not work on Snack in an Android emulator. Try it on your device!'});
      return;
    }
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ErrorMsg : 'Permission to access location was denied'});
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    await SecureStore.setItemAsync('location', JSON.stringify(location.coords));
  }

  render() {
    return (
      this.state.fontsLoaded ?
        <NavigationContainer>
          <DrawerNavigator />
          <Toast ref={(ref) => global['toast'] = ref} />
        </NavigationContainer>
        :
        <AppLoading />)
  }
}

