import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StartStackNavigator } from "./StackNavigator";
import LeaguesScreen from "../screens/Trips/LeaguesScreen";
import TeamsScreen from "../screens/Trips/TeamsScreen";
import NotificationsScreen from "../screens/Chat/NotificationsScreen";
import { TripTabs, BookingsTabs, MoreTabs, ContactTabs, AllGamesTabs, WhatToDoTabs, WhereToEatTabs } from "./TabNavigator";
import { ManageTripStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Book a trip" component={TripTabs} />
            <Drawer.Screen name="ManageTrip" options={{ title: 'Manage trip' }} component={ManageTripStackNavigator} />
            <Drawer.Screen name="Teams" component={TeamsScreen} />
            <Drawer.Screen name="Leagues" component={LeaguesScreen} />
            <Drawer.Screen name="All games" component={AllGamesTabs} />
            <Drawer.Screen name="What To Do" component={WhatToDoTabs} />
            <Drawer.Screen name="Where To Eat" component={WhereToEatTabs} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            <Drawer.Screen name="My bookings" component={BookingsTabs} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;