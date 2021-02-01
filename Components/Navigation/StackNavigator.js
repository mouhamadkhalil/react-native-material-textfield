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
import ManageTripScreen from '../Manage Trip/ManageTripScreen'
import TeamsScreen from "../Special Games/Teams";
import LeaguesScreen from "../Special Games/Leagues";
import AllGamesScreen from "../Special Games/AllGames";
import RequestScreen from "../Special Games/Request";
import GiftCardScreen from "../Special Games/GiftCard";
import GiftCard2Screen from "../Special Games/GiftCard2";
import TripOverViewScreen from "../Special Games/TripOverView";
import CustomizeTripScreen from "../Special Games/CustomizeTrip";
import SelectFlightScreen from "../Special Games/SelectFilght";

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
            <Stack.Screen name="all games" navigationProps={navigation} component={AllGames} />
            <Stack.Screen name="book now" navigationProps={navigation} component={BookNowScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="teams" navigationProps={navigation} component={TeamsScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="leagues" navigationProps={navigation} component={LeaguesScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="AllGames" navigationProps={navigation} component={AllGamesScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="request" navigationProps={navigation} component={RequestScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="giftcard" navigationProps={navigation} component={GiftCardScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="giftcard2" navigationProps={navigation} component={GiftCard2Screen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="tripoverview" navigationProps={navigation} component={TripOverViewScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="customize" navigationProps={navigation} component={CustomizeTripScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="flight" navigationProps={navigation} component={SelectFlightScreen} options={HeaderOptions({ navigation })} />
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

const ManageTripStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ManageTrip" options={{ title: 'Manage trip' }} navigationProps={navigation} component={ManageTripScreen} options={HeaderOptions({ navigation })} />
        </Stack.Navigator>
    );
};




export { StartStackNavigator, TripStackNavigator, MyBookingStackNavigator, MoreStackNavigator, ContactStackNavigator, AllGamesStackNavigator, ManageTripStackNavigator };