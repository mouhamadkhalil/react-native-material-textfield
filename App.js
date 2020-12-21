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

import UploadPassport1Screen from "./Components/Manage Trip/UploadPassport1Screen";
import UploadPassport2Screen from "./Components/Manage Trip/UploadPassport2Screen";
import UploadPassport3Screen from "./Components/Manage Trip/UploadPassport3Screen";
import ManageTripScreen from "./Components/Manage Trip/ManageTripScreen";
import CompletePaymentScreen from "./Components/Manage Trip/CompletePaymentScreen";

import Help1Screen from "./Components/Help/Help1Screen";
import Help2Screen from "./Components/Help/Help2Screen";

import SpotLightScreen from "./Components/NewsLetterInfo/SpotLightScreen";

import AnyDayScreen from "./Components/Schedule/AnyDayScreen";

import Day1Screen from "./Components/Home(Status)/Day1Screen";
import Day2Screen from "./Components/Home(Status)/Day2Screen";

import PickUpScreen from "./Components/TripInfo/PickUpScreen";
import Flights1Screen from "./Components/TripInfo/Flights1Screen";
import Flights2Screen from "./Components/TripInfo/Flights2Screen";
import GameScreen from "./Components/TripInfo/GameScreen";
import HotelScreen from "./Components/TripInfo/HotelScreen";
import PerkScreen from "./Components/TripInfo/PerkScreen";
import TripScreen from "./Components/TripInfo/TripScreen";


const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Trip">

                {/* Start */}
                {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Sign up" component={SignUpScreen} />


                {/* TripDocs */}
                <Stack.Screen name="Documents" component={DocumentScreen} />


                {/* Changes */}
                <Stack.Screen name="Changes 1" component={Changes1Screen} />
                <Stack.Screen name="Changes 2" component={Changes2Screen} />
                <Stack.Screen name="Changes 3" component={Changes3Screen} />


                {/* Invite To Join */}
                <Stack.Screen name="Join 1" component={InviteToJoin1Screen} />
                <Stack.Screen name="Join 2" component={InviteToJoin2Screen} />
                <Stack.Screen name="Join 3" component={InviteToJoin3Screen} />


                {/* Manage Trip */}
                <Stack.Screen name="Upload Passport 1" component={UploadPassport1Screen} />
                <Stack.Screen name="Upload Passport 2" component={UploadPassport2Screen} />
                <Stack.Screen name="Upload Passport 3" component={UploadPassport3Screen} />
                <Stack.Screen name="Manage Trip" component={ManageTripScreen} />
                <Stack.Screen name="Complete Payment" component={CompletePaymentScreen} />


                {/* FAQ */}
                <Stack.Screen name="FAQ 1" component={Help1Screen} />
                <Stack.Screen name="FAQ 2" component={Help2Screen} />


                {/* NEWSLETTER */}
                <Stack.Screen name="Spot Light" component={SpotLightScreen} />


                {/* SCHEULE */}
                <Stack.Screen name="Any Day" component={AnyDayScreen} />


                {/* HOME (STATUS) */}
                <Stack.Screen name="Day 1" component={Day1Screen} />
                <Stack.Screen name="Day 2" component={Day2Screen} />


                {/* TRIP INFO */}
                <Stack.Screen name="Pick up" component={PickUpScreen} />
                <Stack.Screen name="Flights 1" component={Flights1Screen} />
                <Stack.Screen name="Flights 2" component={Flights2Screen} />
                <Stack.Screen name="Game" component={GameScreen} />
                <Stack.Screen name="Hotel" component={HotelScreen} />
                <Stack.Screen name="Perk" component={PerkScreen} />
                <Stack.Screen name="Trip" component={TripScreen} />




            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
