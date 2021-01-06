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

import ChatActive1Screen from "./Components/Fan Chat/ChatActive1Screen";
import ChatActive2Screen from "./Components/Fan Chat/ChatActive2Screen";
import ChatActive3Screen from "./Components/Fan Chat/ChatActive3Screen";
import ChatHome1Screen from "./Components/Fan Chat/ChatHome1Screen";
import ChatHome2Screen from "./Components/Fan Chat/ChatHome2Screen";
import ChatHome3Screen from "./Components/Fan Chat/ChatHome3Screen";
import ChatHome4Screen from "./Components/Fan Chat/ChatHome4Screen";
import ChatHome5Screen from "./Components/Fan Chat/ChatHome5Screen";
import ChatHome8Screen from "./Components/Fan Chat/ChatHome8Screen";
import ChatHome10Screen from "./Components/Fan Chat/ChatHome10Screen";
import ChatHome12Screen from "./Components/Fan Chat/ChatHome12Screen";
import ChatHomeScreen from "./Components/Fan Chat/ChatHomeScreen";
import ChatProfile1 from "./Components/Fan Chat/ChatProfile1Screen";
import ChatProfile2 from "./Components/Fan Chat/ChatProfile2Screen";
import ChatProfile3 from "./Components/Fan Chat/ChatProfile3Screen";
import Group2bScreen from "./Components/Fan Chat/Group2bScreen";
import Group2Screen from "./Components/Fan Chat/Group2Screen";

import InfoScreen from "./Components/More/Info";

import SpecialGamesScreen from "./Components/Special Games/SpecialGame";
import AllGamesScreen from "./Components/Special Games/AllGames";



const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={({ navigation, route }) => ({
                headerLeft: () => (
                    <Button
                        onPress={() => navigation.toggleDrawer()}
                        title="menu"
                        color="#333"
                    />
                ),
            })} />

            {/* Start */}
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

            {/* Fan Chat */}
            <Stack.Screen name="Group 2b Screen" component={Group2bScreen} />
            <Stack.Screen name="Group 2 Screen" component={Group2Screen} />
            <Stack.Screen name="Chat Profile 1" component={ChatProfile1} />
            <Stack.Screen name="Chat Profile 2" component={ChatProfile2} />
            <Stack.Screen name="Chat Profile 3" component={ChatProfile3} />
            <Stack.Screen name="Chat Home Screen" component={ChatHomeScreen} />
            <Stack.Screen name="Chat Home 12 Screen" component={ChatHome12Screen} />
            <Stack.Screen name="Chat Home 10 Screen" component={ChatHome10Screen} />
            <Stack.Screen name="Chat Home 8 Screen" component={ChatHome8Screen} />
            <Stack.Screen name="Chat Home 5 Screen" component={ChatHome5Screen} />
            <Stack.Screen name="Chat Home 4 Screen" component={ChatHome4Screen} />
            <Stack.Screen name="Chat Active 1" component={ChatActive1Screen} />
            <Stack.Screen name="Chat Active 2" component={ChatActive2Screen} />
            <Stack.Screen name="Chat Active 3" component={ChatActive3Screen} />
            <Stack.Screen name="Chat Home 1" component={ChatHome1Screen} />
            <Stack.Screen name="Chat Home 2" component={ChatHome2Screen} />
            <Stack.Screen name="Chat Home 3" component={ChatHome3Screen} />



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

            {/* More */}
            <Stack.Screen name="Info" component={InfoScreen} />

            {/* Special Games */}
            <Stack.Screen name="Special Games" component={SpecialGamesScreen} />
            <Stack.Screen name="All Games" component={AllGamesScreen} />


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

const BookingStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Flights" component={AnyDayScreen} />
        </Stack.Navigator>
    );
};

const InfoStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Info" component={InfoScreen} />
        </Stack.Navigator>
    );
};

const HelpStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FAQ" component={Help2Screen} />
        </Stack.Navigator>
    );
};

const GameDayStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Special Games" component={SpecialGamesScreen} />
        </Stack.Navigator>
    );
};

export { GameDayStackNavigator, HelpStackNavigator, MainStackNavigator, TripStackNavigator, BookingStackNavigator, InfoStackNavigator };