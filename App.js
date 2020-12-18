import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from "./Components/Start/SplashScreen";
import LoginScreen from "./Components/Start/LoginScreen";
import SignUpScreen from "./Components/Start/SignupScreen";
import DocumentScreen from "./Components/TripDocs/DocumentScreen";

import Changes1Screen from "./Components/Changes/Changes1Screen";
import Changes2Screen from "./Components/Changes/Changes2Screen";
import Changes3Screen from "./Components/Changes/Changes3Screen";


import InviteToJoin1Screen from "./Components/InviteToJoin/InviteToJoin1Screen";
import InviteToJoin2Screen from "./Components/InviteToJoin/InviteToJoin2Screen";
import InviteToJoin3Screen from "./Components/InviteToJoin/InviteToJoin3Screen";




const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="InviteToJoin3">

                {/* Start */}
                {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignUpScreen} />


                {/* TripDocs */}
                <Stack.Screen name="Documents" component={DocumentScreen} />


                {/* Changes */}
                <Stack.Screen name="Changes1" component={Changes1Screen} />
                <Stack.Screen name="Changes2" component={Changes2Screen} />
                <Stack.Screen name="Changes3" component={Changes3Screen} />


                {/* Invite To Join */}
                <Stack.Screen name="InviteToJoin1" component={InviteToJoin1Screen} />
                <Stack.Screen name="InviteToJoin2" component={InviteToJoin2Screen} />
                <Stack.Screen name="InviteToJoin3" component={InviteToJoin3Screen} />





            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
