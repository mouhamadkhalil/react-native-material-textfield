import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Start/LoginScreen";
import Signup from "../Start/SignupScreen";
import SpecialGames from "../Special Games/SpecialGame";
import TripScreen from "../TripInfo/TripScreen";
import AnyDayScreen from "../Schedule/AnyDayScreen";
import InfoScreen from "../More/Info";
import Help2Screen from "../Help/Help2Screen";


const Stack = createStackNavigator();

const StartStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    );
}   

const TripStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="book a trip" component={SpecialGames} />
        </Stack.Navigator>
    );
}

const MyBookingStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="my bookings" component={AnyDayScreen} />
        </Stack.Navigator>
    );
}

const MoreStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="more" component={InfoScreen} />
        </Stack.Navigator>
    );
}

const ContactStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="contact us" component={Help2Screen} />
        </Stack.Navigator>
    );
}

export { StartStackNavigator, TripStackNavigator, MyBookingStackNavigator, MoreStackNavigator, ContactStackNavigator };