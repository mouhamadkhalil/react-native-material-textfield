import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { translate } from 'helpers/utils.js';
import R from 'res/R';

import Login from "components/Start/LoginScreen";
import Signup from "components/Start/SignupScreen";
import SpecialGames from "components/SpecialGames/SpecialGame";
import AnyDayScreen from "components/Schedule/AnyDayScreen";
import RequestScreen from "screens/Trips/RequestScreen";
import MoreScreen from "screens/More/MoreScreen";
import ContactUsScreen from "screens/ContactUs/ContactUsScreen";

/* chat */
import ChatScreen from "screens/Chat/ChatScreen";
import ChatRoomScreen from "screens/Chat/ChatRoomScreen";

/* notification */
import NotificationsScreen from "screens/Notifications/NotificationsScreen";
import NotificationsDetailsScreen from "screens/Notifications/NotificationsDetailsScreen";


import Help1Screen from "components/Help/Help1Screen";
import ManageTripScreen from 'components/ManageTrip/ManageTripScreen'
import TeamsScreen from "screens/Trips/TeamsScreen";
import LeaguesScreen from "screens/Trips/LeaguesScreen";
import AllGamesScreen from "screens/Trips/AllGamesScreen";
import GiftCardScreen from "components/SpecialGames/GiftCard";
import GiftCard2Screen from "components/SpecialGames/GiftCard2";
import TripOverViewScreen from "screens/Trips/TripOverViewScreen";
import CustomizeTripScreen from "components/SpecialGames/CustomizeTrip";
import SelectFlightScreen from "screens/Trips/SelectFilghtScreen";
import ExperiencesScreen from "screens/Trips/ExperiencesScreen";
import SummaryScreen from "screens/Trips/SummaryScreen";
import CheckoutFanInfoScreen from "screens/Trips/CheckoutFanInfoScreen";
import CheckoutSummaryScreen from "screens/Trips/CheckoutSummaryScreen";
import CheckoutPaymentScreen from "screens/Trips/CheckoutPaymentScreen";

import WhatToDoScreen from "screens/OnSpot/WhatToDoScreen";
import WhereToEatScreen from "screens/OnSpot/WhereToEatScreen";
import PlaceDetailsScreen from "screens/OnSpot/PlaceDetailsScreen";

import upcomingScreen from "screens/MyBookings/UpcomingScreen";
import anyDay from "screens/MyBookings/AnyDay";
import upcomingDetailsScreen from "screens/MyBookings/UpcomingDetailsScreen";

import MyTripsScreen from "components/SpecialGames/MyTrips";
import MyProfileScreen from "components/Profile/MyProfile";
import QuizScreen from "components/WebView/Quiz";
import LeaderBoardScreen from "components/WebView/LeaderBoard";
import ActivityCardScreen from "components/Schedule/ActivityCard";
import RestaurantScreen from "components/Schedule/Restaurant";
import MuseumScreen from "components/Schedule/Museum";
import SagradaScreen from "components/Schedule/SagradaFamilia";
import NightLifeScreen from "components/Schedule/NightLife";
import NightLife1Screen from "components/Schedule/NightLife1";
import ETicketScreen from "components/Schedule/Eticket";
import HeaderOptions from "./Header";
import MultitripConfirmationScreen from "components/SpecialGames/MultitripConfirmation";


const InitialStack = createStackNavigator();
const Stack = createStackNavigator();

const StartStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" navigationProps={navigation} component={Login} />
            <Stack.Screen name="Signup" navigationProps={navigation} component={Signup} />
        </Stack.Navigator>
    );
};

const ChatStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: R.colors.blue },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
        }}>
            <Stack.Screen name="chats" options={{ title: translate("chats") }} navigationProps={navigation} component={ChatScreen} />
            <Stack.Screen name="chatRoom" options={{ title: translate("chatRoom") }} navigationProps={navigation} component={ChatRoomScreen} />
        </Stack.Navigator>
    )
}

const NotificationsStackNavigator = ({ navigation }) => {
    return (
        <InitialStack.Navigator screenOptions={{
            headerStyle: { backgroundColor: R.colors.blue },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
        }}>
            <InitialStack.Screen name="notifications" options={{ title: translate("notifications") }} navigationProps={navigation} component={NotificationsScreen} />
            <InitialStack.Screen name="notificationsDetails" options={{ title: translate("notificationsDetails") }} navigationProps={navigation} component={NotificationsDetailsScreen} />
        </InitialStack.Navigator>
    )
}

function TripStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#F7F7F7' },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
        }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="book a trip" component={SpecialGames} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />

            <Stack.Screen name="teams" component={TeamsScreen} />
            <Stack.Screen name="leagues" component={LeaguesScreen} />
            <Stack.Screen name="allGames" component={AllGamesScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="request" component={RequestScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="giftcard" component={GiftCardScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="giftcard2" component={GiftCard2Screen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="tripOverview" component={TripOverViewScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="customize" component={CustomizeTripScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="flight" component={SelectFlightScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="experiences" component={ExperiencesScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="summary" component={SummaryScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="checkoutFanInfo" component={CheckoutFanInfoScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="checkoutSummary" component={CheckoutSummaryScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="checkoutPayment" component={CheckoutPaymentScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />

            <Stack.Screen name="my trips" component={MyTripsScreen} />
            <Stack.Screen name="my profile" component={MyProfileScreen} />
            <Stack.Screen name="quiz" component={QuizScreen} />
            <Stack.Screen name="leader board" component={LeaderBoardScreen} />
            <Stack.Screen name="confirmation" component={MultitripConfirmationScreen} />

            <Stack.Screen name="notifications" options={{ title: translate("notifications") }} component={NotificationsScreen} />
            <Stack.Screen name="notificationsDetails" options={{ title: translate("notificationsDetails") }} component={NotificationsDetailsScreen} />


        </Stack.Navigator>)
}

const WhatToDoStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#F7F7F7' } }}>
            <Stack.Screen name="whatToDo" navigationProps={navigation} component={WhatToDoScreen} />
            <Stack.Screen name="placeDetails" navigationProps={navigation} component={PlaceDetailsScreen} />

            <Stack.Screen name="request" navigationProps={navigation} component={RequestScreen} />
            <Stack.Screen name="tripOverview" navigationProps={navigation} component={TripOverViewScreen} />
            <Stack.Screen name="customize" navigationProps={navigation} component={CustomizeTripScreen} />
            <Stack.Screen name="flight" navigationProps={navigation} component={SelectFlightScreen} />
            <Stack.Screen name="experiences" navigationProps={navigation} component={ExperiencesScreen} />
            <Stack.Screen name="summary" navigationProps={navigation} component={SummaryScreen} />
            <Stack.Screen name="checkoutFanInfo" navigationProps={navigation} component={CheckoutFanInfoScreen} />
            <Stack.Screen name="checkoutSummary" navigationProps={navigation} component={CheckoutSummaryScreen} />
            <Stack.Screen name="checkoutPayment" navigationProps={navigation} component={CheckoutPaymentScreen} />

        </Stack.Navigator>
    );
};

const WhereToEatStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#F7F7F7' } }}>
            <Stack.Screen name="whereToEat" navigationProps={navigation} component={WhereToEatScreen} />
            <Stack.Screen name="placeDetails" navigationProps={navigation} component={PlaceDetailsScreen} />

            <Stack.Screen name="request" navigationProps={navigation} component={RequestScreen} />
            <Stack.Screen name="tripOverview" navigationProps={navigation} component={TripOverViewScreen} />
            <Stack.Screen name="customize" navigationProps={navigation} component={CustomizeTripScreen} />
            <Stack.Screen name="flight" navigationProps={navigation} component={SelectFlightScreen} />
            <Stack.Screen name="experiences" navigationProps={navigation} component={ExperiencesScreen} />
            <Stack.Screen name="summary" navigationProps={navigation} component={SummaryScreen} />
            <Stack.Screen name="checkoutFanInfo" navigationProps={navigation} component={CheckoutFanInfoScreen} />
            <Stack.Screen name="checkoutSummary" navigationProps={navigation} component={CheckoutSummaryScreen} />
            <Stack.Screen name="checkoutPayment" navigationProps={navigation} component={CheckoutPaymentScreen} />

        </Stack.Navigator>
    );
};

const AllGamesStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#F7F7F7' } }}>
            <Stack.Screen name="allGames" navigationProps={navigation} component={AllGamesScreen} />
            <Stack.Screen name="request" navigationProps={navigation} component={RequestScreen} />
            <Stack.Screen name="tripOverview" navigationProps={navigation} component={TripOverViewScreen} />
            <Stack.Screen name="customize" navigationProps={navigation} component={CustomizeTripScreen} />
            <Stack.Screen name="flight" navigationProps={navigation} component={SelectFlightScreen} />
            <Stack.Screen name="experiences" navigationProps={navigation} component={ExperiencesScreen} />
            <Stack.Screen name="summary" navigationProps={navigation} component={SummaryScreen} />
            <Stack.Screen name="checkoutFanInfo" navigationProps={navigation} component={CheckoutFanInfoScreen} />
            <Stack.Screen name="checkoutSummary" navigationProps={navigation} component={CheckoutSummaryScreen} />
            <Stack.Screen name="checkoutPayment" navigationProps={navigation} component={CheckoutPaymentScreen} />
            <Stack.Screen name="notifications" options={{ title: translate("notifications") }} component={NotificationsScreen} />
            <Stack.Screen name="notificationsDetails" options={{ title: translate("notificationsDetails") }} component={NotificationsDetailsScreen} />
        </Stack.Navigator>
    );
};

const MyBookingStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="myBookings" component={anyDay} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="upcomingDetails" component={upcomingDetailsScreen} options={({ navigation, route }) => (HeaderOptions(navigation, route))} />
            <Stack.Screen name="notifications" options={{ title: translate("notifications") }} component={NotificationsScreen} />
            <Stack.Screen name="notificationsDetails" options={{ title: translate("notificationsDetails") }} component={NotificationsDetailsScreen} />
        </Stack.Navigator>
    );
};

const MoreStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="more" navigationProps={navigation} component={MoreScreen} />
            <Stack.Screen name="FAQ" navigationProps={navigation} component={Help1Screen} />
        </Stack.Navigator>
    );
};

const ContactStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="contactUs" navigationProps={navigation} component={ContactUsScreen} />
        </Stack.Navigator>
    );
};

const ManageTripStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ManageTrip" options={{ title: 'Manage trip' }} navigationProps={navigation} component={ManageTripScreen} />
        </Stack.Navigator>
    );
};




export { ChatStackNavigator, NotificationsStackNavigator, StartStackNavigator, TripStackNavigator, MyBookingStackNavigator, MoreStackNavigator, ContactStackNavigator, AllGamesStackNavigator, ManageTripStackNavigator, WhatToDoStackNavigator, WhereToEatStackNavigator };