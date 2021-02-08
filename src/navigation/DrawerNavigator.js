import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StartStackNavigator } from "./StackNavigator";
import { TripTabs, BookingsTabs, MoreTabs, ContactTabs, AllGamesTabs } from "./TabNavigator";
import { AllGamesStackNavigator } from "./StackNavigator";
import { ManageTripStackNavigator } from "./StackNavigator";

/* for testing */
import AllGames from 'components/SpecialGames/AllGames';
/* end */

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="login" component={StartStackNavigator} />
            <Drawer.Screen name="book a trip" component={TripTabs} />
            <Drawer.Screen name="ManageTrip" options={{ title: 'Manage trip' }} component={ManageTripStackNavigator} />
            <Drawer.Screen name="all games" component={AllGamesTabs} />
            <Drawer.Screen name="my bookings" component={BookingsTabs} />
            <Drawer.Screen name="more" component={MoreTabs} />
            <Drawer.Screen name="contact us" component={ContactTabs} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;