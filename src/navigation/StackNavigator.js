import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "components/Start/LoginScreen";
import Signup from "components/Start/SignupScreen";
import SpecialGames from "components/SpecialGames/SpecialGame";
import AllGames from "components/SpecialGames/AllGames";
import AnyDayScreen from "components/Schedule/AnyDayScreen";
import InfoScreen from "components/More/Info";
import Help1Screen from "components/Help/Help1Screen";
import Help2Screen from "components/Help/Help2Screen";
import BookNowScreen from "components/SpecialGames/BookNow";
import ManageTripScreen from 'components/ManageTrip/ManageTripScreen'
import TeamsScreen from "components/SpecialGames/Teams";
import LeaguesScreen from "components/SpecialGames/Leagues";
import AllGamesScreen from "components/SpecialGames/AllGames";
import RequestScreen from "components/SpecialGames/Request";
import GiftCardScreen from "components/SpecialGames/GiftCard";
import GiftCard2Screen from "components/SpecialGames/GiftCard2";
import TripOverViewScreen from "components/SpecialGames/TripOverView";
import CustomizeTripScreen from "components/SpecialGames/CustomizeTrip";
import SelectFlightScreen from "components/SpecialGames/SelectFilght";
import MyTripsScreen from "components/SpecialGames/MyTrips";
import MyProfileScreen from "components/Profile/MyProfile";
import QuizScreen from "components/WebView/Quiz";
import LeaderBoardScreen from "components/WebView/LeaderBoard";
import ActivityCardScreen from "components/Schedule/ActivityCard";
import WhereToEatScreen from "components/Schedule/WhereToEat";
import RestaurantScreen from "components/Schedule/Restaurant";
import WhatToDoScreen from "components/Schedule/WhatToDo";
import MuseumScreen from "components/Schedule/Museum";
import SagradaScreen from "components/Schedule/SagradaFamilia";
import NightLifeScreen from "components/Schedule/NightLife";
import NightLife1Screen from "components/Schedule/NightLife1";
import ETicketScreen from "components/Schedule/Eticket";
import HeaderOptions from "./Header";
import MultitripConfirmationScreen from "components/SpecialGames/MultitripConfirmation";


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
            <Stack.Screen name="my trips" navigationProps={navigation} component={MyTripsScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="my profile" navigationProps={navigation} component={MyProfileScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="quiz" navigationProps={navigation} component={QuizScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="leader board" navigationProps={navigation} component={LeaderBoardScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="confirmation" navigationProps={navigation} component={MultitripConfirmationScreen} options={HeaderOptions({ navigation })} />

        </Stack.Navigator>
    );
};


const AllGamesStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#F7F7F7' } }}>
            <Stack.Screen name="all games" navigationProps={navigation} component={AllGames} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="request" navigationProps={navigation} component={RequestScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="tripoverview" navigationProps={navigation} component={TripOverViewScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="customize" navigationProps={navigation} component={CustomizeTripScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="flight" navigationProps={navigation} component={SelectFlightScreen} options={HeaderOptions({ navigation })} />
        </Stack.Navigator>
    );
};

const MyBookingStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="my bookings" navigationProps={navigation} component={AnyDayScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="activity card" navigationProps={navigation} component={ActivityCardScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="WhereToEat" navigationProps={navigation} component={WhereToEatScreen} options={HeaderOptions({ navigation })} />
            <Stack.Screen name="restaurant" navigationProps={navigation} component={RestaurantScreen} />
            <Stack.Screen name="WhatToDo" navigationProps={navigation} component={WhatToDoScreen} />
            <Stack.Screen name="museum" navigationProps={navigation} component={MuseumScreen} />
            <Stack.Screen name="sagrada" navigationProps={navigation} component={SagradaScreen} />
            <Stack.Screen name="nightlife" navigationProps={navigation} component={NightLifeScreen} />
            <Stack.Screen name="nightlife1" navigationProps={navigation} component={NightLife1Screen} />
            <Stack.Screen name="eticket" navigationProps={navigation} component={ETicketScreen} />

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