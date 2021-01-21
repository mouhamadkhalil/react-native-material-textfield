// import { StatusBar } from "expo-status-bar";
import React from "react";
// import { StyleSheet, Button, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
// import BottomTabNavigator from "./TabNavigator";
import DrawerNavigator from "./Components/Navigation/DrawerNavigator";


const App = () => {
    return (
        <NavigationContainer>
            <DrawerNavigator  />
        </NavigationContainer>
    );
};

export default App;
