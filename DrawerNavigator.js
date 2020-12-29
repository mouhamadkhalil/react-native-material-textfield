import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { TripStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import LoginScreen from "./Components/Start/LoginScreen";
import SignUpScreen from "./Components/Start/SignupScreen";
import DocumentScreen from "./Components/TripDocs/DocumentScreen";

import Changes1Screen from "./Components/Changes/Changes1Screen";
import Changes2Screen from "./Components/Changes/Changes2Screen";
import Changes3Screen from "./Components/Changes/Changes3Screen";

import InviteToJoin1Screen from "./Components/InviteToJoin/InviteToJoin1Screen";
import InviteToJoin2Screen from "./Components/InviteToJoin/InviteToJoin2Screen";
import InviteToJoin3Screen from "./Components/InviteToJoin/InviteToJoin3Screen";

import HotelScreen from "./Components/TripInfo/HotelScreen";
import GameScreen from "./Components/TripInfo/GameScreen";
import PerkScreen from "./Components/TripInfo/PerkScreen";
import Flights1Screen from "./Components/TripInfo/Flights1Screen";
import Flights2Screen from "./Components/TripInfo/Flights2Screen";
import PickUpScreen from "./Components/TripInfo/PickUpScreen";

import Help1Screen from "./Components/Help/Help1Screen";
import Help2Screen from "./Components/Help/Help2Screen";


import AnyDayHomeScreen from "./Components/Home/AnyDayHomeScreen";
import ChatScreen from "./Components/Home/ChatScreen";
import Day1HomeScreen from "./Components/Home/Day1HomeScreen";
import GameDayScreen from "./Components/Home/GameDayScreen";
import Home24HScreen from "./Components/Home/Home24HScreen";
import HomePreScreen from "./Components/Home/HomePreScreen";
import MenuScreen from "./Components/Home/MenuScreen";
import Post2Screen from "./Components/Home/Post2Screen";
import PostScreen from "./Components/Home/PostScreen";

import Day1Screen from "./Components/Home(Status)/Day1Screen";
import Day2Screen from "./Components/Home(Status)/Day2Screen";

import CompletePaymentScreen from "./Components/Manage Trip/CompletePaymentScreen";
import ManageTripScreen from "./Components/Manage Trip/ManageTripScreen";
import UploadPassport1Screen from "./Components/Manage Trip/UploadPassport1Screen";
import UploadPassport2Screen from "./Components/Manage Trip/UploadPassport2Screen";
import UploadPassport3Screen from "./Components/Manage Trip/UploadPassport3Screen";

import SpotLightScreen from "./Components/NewsLetterInfo/SpotLightScreen";

import AnyDayScreen from "./Components/Schedule/AnyDayScreen";

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
import ChatProfile1Screen from "./Components/Fan Chat/ChatProfile1Screen";
import ChatProfile2Screen from "./Components/Fan Chat/ChatProfile2Screen";
import ChatProfile3Screen from "./Components/Fan Chat/ChatProfile3Screen";
import Group2bScreen from "./Components/Fan Chat/Group2bScreen";
import Group2Screen from "./Components/Fan Chat/Group2Screen";

import Info from "./Components/More/Info";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={TabNavigator} />
            <Drawer.Screen name="Trip" component={TripStackNavigator} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Sign Up" component={SignUpScreen} />
            <Drawer.Screen name="Document" component={DocumentScreen} />

            <Drawer.Screen name="Changes" component={Changes1Screen} />
            <Drawer.Screen name="Changes 2" component={Changes2Screen} />
            <Drawer.Screen name="Changes 3" component={Changes3Screen} />

            <Drawer.Screen name="Invite to Join" component={InviteToJoin1Screen} />
            <Drawer.Screen name="Invite to Join 2" component={InviteToJoin2Screen} />
            <Drawer.Screen name="Invite to Join 3" component={InviteToJoin3Screen} />

            <Drawer.Screen name="Hotel" component={HotelScreen} />
            <Drawer.Screen name="Game" component={GameScreen} />
            <Drawer.Screen name="Perk" component={PerkScreen} />
            <Drawer.Screen name="Flights 1" component={Flights1Screen} />
            <Drawer.Screen name="Flights 2" component={Flights2Screen} />
            <Drawer.Screen name="Pick up" component={PickUpScreen} />

            <Drawer.Screen name="Help 1" component={Help1Screen} />
            <Drawer.Screen name="Help 2" component={Help2Screen} />

            <Drawer.Screen name="AnyDay Home" component={AnyDayHomeScreen} />
            <Drawer.Screen name="Chat" component={ChatScreen} />
            <Drawer.Screen name="Day 1" component={Day1HomeScreen} />
            <Drawer.Screen name="Game Day" component={GameDayScreen} />
            <Drawer.Screen name="Home 24H" component={Home24HScreen} />
            <Drawer.Screen name="Home Pre" component={HomePreScreen} />
            <Drawer.Screen name="Menu" component={MenuScreen} />
            <Drawer.Screen name="Post 2" component={Post2Screen} />
            <Drawer.Screen name="Post" component={PostScreen} />

            <Drawer.Screen name="Day1" component={Day1Screen} />
            <Drawer.Screen name="Day 2" component={Day2Screen} />

            <Drawer.Screen name="Complete Payment" component={CompletePaymentScreen} />
            <Drawer.Screen name="Manage Trip" component={ManageTripScreen} />
            <Drawer.Screen name="Upload passport 1" component={UploadPassport1Screen} />
            <Drawer.Screen name="Upload passport 2" component={UploadPassport2Screen} />
            <Drawer.Screen name="Upload passport 3" component={UploadPassport3Screen} />

            <Drawer.Screen name="Spot Light" component={SpotLightScreen} />

            <Drawer.Screen name="Any Day" component={AnyDayScreen} />

            <Drawer.Screen name="Chat Active 1" component={ChatActive1Screen} />
            <Drawer.Screen name="Chat Active 2" component={ChatActive2Screen} />
            <Drawer.Screen name="Chat Active 3" component={ChatActive3Screen} />
            <Drawer.Screen name="Chat Home 1" component={ChatHome1Screen} />
            <Drawer.Screen name="Chat Home 2" component={ChatHome2Screen} />
            <Drawer.Screen name="Chat Home 3" component={ChatHome3Screen} />
            <Drawer.Screen name="Chat Home 4" component={ChatHome4Screen} />
            <Drawer.Screen name="Chat Home 5" component={ChatHome5Screen} />
            <Drawer.Screen name="Chat Home 8" component={ChatHome8Screen} />
            <Drawer.Screen name="Chat Home 10" component={ChatHome10Screen} />
            <Drawer.Screen name="Chat Home 12" component={ChatHome12Screen} />
            <Drawer.Screen name="Chat Home" component={ChatHomeScreen} />
            <Drawer.Screen name="Chat Profile 1" component={ChatProfile1Screen} />
            <Drawer.Screen name="Chat Profile 2" component={ChatProfile2Screen} />
            <Drawer.Screen name="Chat Profile 3" component={ChatProfile3Screen} />
            <Drawer.Screen name="Group 2b" component={Group2bScreen} />
            <Drawer.Screen name="Group 2" component={Group2Screen} />

            <Drawer.Screen name="Info" component={Info} />


        </Drawer.Navigator>
    );
};

export default DrawerNavigator;