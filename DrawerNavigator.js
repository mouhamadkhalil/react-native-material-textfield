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
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;