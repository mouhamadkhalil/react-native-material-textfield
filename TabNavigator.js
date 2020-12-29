import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, TripStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="book a trip" component={TripStackNavigator} />
            <Tab.Screen name="my Boookings" component={TripStackNavigator} />
            <Tab.Screen name="more" component={TripStackNavigator} />
            <Tab.Screen name="Settings" component={TripStackNavigator} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;