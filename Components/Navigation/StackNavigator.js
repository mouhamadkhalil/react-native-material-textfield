import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Start/LoginScreen";
import Signup from "../Start/SignupScreen";
import SpecialGames from "../Special Games/SpecialGame";
import AllGames from "../Special Games/AllGames";
import AnyDayScreen from "../Schedule/AnyDayScreen";
import InfoScreen from "../More/Info";
import Help1Screen from "../Help/Help1Screen";
import Help2Screen from "../Help/Help2Screen";
import BookNowScreen from "../Special Games/BookNow";
import HeaderOptions from "./Header";



const Stack = createStackNavigator();

const StartStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" navigationProps={navigation} component={Login} />
            <Stack.Screen name="Signup" navigationProps={navigation} component={Signup} />
        </Stack.Navigator>
    );
};

const TripStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#F7F7F7' } }}>
            <Stack.Screen name="book a trip" navigationProps={navigation} component={SpecialGames} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="all games" navigationProps={navigation} component={AllGames}  />
            <Stack.Screen name="book now" navigationProps={navigation} component={BookNowScreen} options={HeaderOptions({ navigation })} />
        </Stack.Navigator>
    );
};

const AllGamesStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#F7F7F7' } }}>
            <Stack.Screen name="all games" navigationProps={navigation} component={AllGames} options={HeaderOptions({ navigation })} />
        </Stack.Navigator>
    );
};

const MyBookingStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="my bookings" navigationProps={navigation} component={AnyDayScreen} options={HeaderOptions({ navigation })} />
        </Stack.Navigator>
    );
};

const MoreStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="more" navigationProps={navigation} component={InfoScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="FAQ" navigationProps={navigation} component={Help1Screen} options={HeaderOptions({ navigation })} />
        </Stack.Navigator>
    );
};

const ContactStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="contact us" navigationProps={navigation} component={Help2Screen} options={HeaderOptions({ navigation })} />
        </Stack.Navigator>
    );
};

export { StartStackNavigator, TripStackNavigator, MyBookingStackNavigator, MoreStackNavigator, ContactStackNavigator, AllGamesStackNavigator };