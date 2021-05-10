import React from 'react';
import * as SecureStore from 'expo-secure-store';
import AppLoading from 'expo-app-loading';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import Toast from "react-native-fast-toast";
import * as Location from 'expo-location';
import { setI18nConfig } from 'helpers/utils.js';
import fonts from 'fonts';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default class App extends React.Component {

  state = {
    fontsLoaded: false,
    errorMsg: null
  };

  async loadFontsAsync() {
    await Font.loadAsync(fonts).then(() =>
      this.setState({ fontsLoaded: true }));
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    };

  componentDidMount = async () => {
    // load fonts
    await this.loadFontsAsync();
    // init push notifications
    await this.registerForPushNotificationsAsync();
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

