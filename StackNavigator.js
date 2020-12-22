import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Button
} from "react-native";


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

import AnyDayHomeScreen from "./Components/Home/AnyDayHomeScreen";
import ChatScreen from "./Components/Home/ChatScreen";
import Day1HomeScreen from "./Components/Home/Day1HomeScreen";
import GameDayScreen from "./Components/Home/GameDayScreen";
import Home24HScreen from "./Components/Home/Home24HScreen";
import HomePreScreen from "./Components/Home/HomePreScreen";
import MenuScreen from "./Components/Home/MenuScreen";
import Post2Screen from "./Components/Home/Post2Screen";
import PostScreen from "./Components/Home/PostScreen";


const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (

        <Stack.Navigator initialRouteName="Login">

            {/* Start */}
            {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
            <Stack.Screen name="Login" component={LoginScreen} options={({ navigation, route }) => ({
                headerLeft: () => (
                    <Button
                        onPress={() => navigation.toggleDrawer()}
                        title="menu"
                        color="#333"
                    />
                ),
            })} />
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


            {/* HOME */}
            <Stack.Screen name="AnyDay Home" component={AnyDayHomeScreen} />
            <Stack.Screen name="Day1 Home" component={Day1HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Game Day" component={GameDayScreen} />
            <Stack.Screen name="Home 24 H" component={Home24HScreen} />
            <Stack.Screen name="Home Pre" component={HomePreScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Post 2" component={Post2Screen} />
            <Stack.Screen name="Post" component={PostScreen} />


        </Stack.Navigator>
    );
};

const TripStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Trip" component={TripScreen} />
        </Stack.Navigator>
    );
};
export { MainStackNavigator, TripStackNavigator };