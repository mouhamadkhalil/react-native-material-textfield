import React, { useState, useEffect } from 'react';
import { AsyncStorage, I18nManager} from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import * as Location from 'expo-location';
import {setI18nConfig}  from './src/helpers/utils.js';

const App = () => {
  setI18nConfig();
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      await AsyncStorage.setItem('location', location);
    })();
  }, []);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;
