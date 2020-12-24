import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, TripStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={MainStackNavigator} />
            <Tab.Screen name="Book a trip" component={TripStackNavigator} />
            <Tab.Screen name="My Boookings" component={TripStackNavigator} />
            <Tab.Screen name="Trips" component={TripStackNavigator} />
            <Tab.Screen name="Settings" component={TripStackNavigator} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;