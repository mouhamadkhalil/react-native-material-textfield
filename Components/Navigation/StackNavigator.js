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

const StartStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" navigationProps={navigation} component={Login} />
            <Stack.Screen name="Signup" navigationProps={navigation} component={Signup} />
        </Stack.Navigator>
    );
}   

const TripStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="book a trip" navigationProps={navigation} component={SpecialGames} />
        </Stack.Navigator>
    );
}

const MyBookingStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="my bookings" navigationProps={navigation} component={AnyDayScreen} />
        </Stack.Navigator>
    );
}

const MoreStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="more" navigationProps={navigation} component={InfoScreen} />
        </Stack.Navigator>
    );
}

const ContactStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="contact us" navigationProps={navigation} component={Help2Screen} />
        </Stack.Navigator>
    );
}

export { StartStackNavigator, TripStackNavigator, MyBookingStackNavigator, MoreStackNavigator, ContactStackNavigator };