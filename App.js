import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./Components/Navigation/DrawerNavigator";
import * as Location from 'expo-location';

const App = () => {
    const [location, setLocation] = useState(null);
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
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.log(text);
    return (
        <NavigationContainer>
            <DrawerNavigator  />
        </NavigationContainer>
    );
};

export default App;
