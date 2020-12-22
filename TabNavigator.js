import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, TripStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={MainStackNavigator} />
            <Tab.Screen name="Trip" component={TripStackNavigator} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;