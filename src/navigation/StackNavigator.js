import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { translate } from 'helpers/utils.js';
import R from 'res/R';

import Login from "screens/Account/LoginScreen";
import Signup from "components/Start/SignupScreen";
import SpecialGames from "components/SpecialGames/SpecialGame";
import RequestScreen from "screens/Trips/RequestScreen";
import MoreScreen from "screens/More/MoreScreen";
import ContactUsScreen from "screens/ContactUs/ContactUsScreen";

/* chat */
import ChatScreen from "screens/Chat/ChatScreen";
import ChatRoomScreen from "screens/Chat/ChatRoomScreen";

/* notification */
import NotificationsScreen from "screens/Notifications/NotificationsScreen";
import NotificationsDetailsScreen from "screens/Notifications/NotificationsDetailsScreen";

/* manage trip */
import ManageTripScreen from "screens/ManageTrip/ManageTripScreen";
import CompletePaymentScreen from "components/ManageTrip/CompletePaymentScreen";
import UploadPassportScreen from "screens/ManageTrip/UploadPassportScreen";
import TripChangesScreen from "screens/ManageTrip/TripChangesScreen";
import InviteToJoinScreen from "screens/ManageTrip/InviteToJoinScreen";

/* trip documents */
import DocumentScreen from "screens/TripDocuments/DocumentScreen";
/* trip  info */
import TripInfoScreen from "screens/TripInfo/TripInfoScreen";
import MyFlightScreen from "screens/TripInfo/MyFlightScreen";
import MyHotelScreen from "screens/TripInfo/MyHotelScreen";
import MyPerkScreen from "screens/TripInfo/MyPerkScreen";
import MyGameScreen from "screens/TripInfo/MyGameScreen";

import Help1Screen from "components/Help/Help1Screen";
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
        <Stack.Navigator
            screenOptions={({ navigation, route }) => (HeaderOptions(navigation, route))}
        >
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="book a trip" component={SpecialGames} />
          
            <Stack.Screen name="teams" component={TeamsScreen} />
            <Stack.Screen name="leagues" component={LeaguesScreen} />
            <Stack.Screen name="allGames" component={AllGamesScreen} />
            <Stack.Screen name="request" component={RequestScreen} />
            <Stack.Screen name="giftcard" component={GiftCardScreen} />
            <Stack.Screen name="giftcard2" component={GiftCard2Screen} />
            <Stack.Screen name="tripOverview" component={TripOverViewScreen} />
            <Stack.Screen name="customize" component={CustomizeTripScreen} />
            <Stack.Screen name="flight" component={SelectFlightScreen} />
            <Stack.Screen name="experiences" component={ExperiencesScreen} />
            <Stack.Screen name="summary" component={SummaryScreen} />
            <Stack.Screen name="checkoutFanInfo" component={CheckoutFanInfoScreen} />
            <Stack.Screen name="checkoutSummary" component={CheckoutSummaryScreen} />
            <Stack.Screen name="checkoutPayment" component={CheckoutPaymentScreen} />

            <Stack.Screen name="my trips" component={MyTripsScreen} />
            <Stack.Screen name="my profile" component={MyProfileScreen} />
            <Stack.Screen name="quiz" component={QuizScreen} />
            <Stack.Screen name="leader board" component={LeaderBoardScreen} />
            <Stack.Screen name="confirmation" component={MultitripConfirmationScreen} />

            <Stack.Screen name="notifications" options={{ title: translate("notifications") }} component={NotificationsScreen} />
            <Stack.Screen name="notificationsDetails" options={{ title: translate("notificationsDetails") }} component={NotificationsDetailsScreen} />


        </Stack.Navigator>)
}

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
        <Stack.Navigator screenOptions={({ navigation, route }) => (HeaderOptions(navigation, route))}>
            <Stack.Screen name="myBookings" component={anyDay} />
            <Stack.Screen name="whereToEat" options={{ title: translate("whereToEat") }} component={WhereToEatScreen} />
            <Stack.Screen name="whatToDo" options={{ title: translate("whatToDo") }} component={WhatToDoScreen} />
            <Stack.Screen name="placeDetails" options={{ title: translate("placeDetails") }} component={PlaceDetailsScreen} />
            <Stack.Screen name="upcomingDetails" component={upcomingDetailsScreen} />
            <Stack.Screen name="notifications" options={{ title: translate("notifications") }} component={NotificationsScreen} />
            <Stack.Screen name="notificationsDetails" options={{ title: translate("notificationsDetails") }} component={NotificationsDetailsScreen} />
        </Stack.Navigator>
    );
};

const MoreStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' } }}>
            <Stack.Screen name="more" options={{ title: translate("more") }} navigationProps={navigation} component={MoreScreen} />
            <Stack.Screen name="FAQ" navigationProps={navigation} component={Help1Screen} />
        </Stack.Navigator>
    );
};

const ContactStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' } }}>
            <Stack.Screen name="contactUs" options={{ title: translate("contactUs") }} navigationProps={navigation} component={ContactUsScreen} />
            <Stack.Screen name="chats" options={{ title: translate("chats") }} navigationProps={navigation} component={ChatScreen} />
            <Stack.Screen name="chatRoom" options={{ title: translate("chatRoom") }} navigationProps={navigation} component={ChatRoomScreen} />
        </Stack.Navigator>
    );
};

const ManageTripStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: R.colors.blue },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
        }}>
               <Stack.Screen name="manageTrip" options={{ title: translate("manageTrip") }} component={ManageTripScreen} />
            <Stack.Screen name="completePayment" options={{ title: translate("completePayment") }} component={CompletePaymentScreen} />
            <Stack.Screen name="uploadPassport" options={{ title: translate("uploadPassport") }} component={UploadPassportScreen} />
            <Stack.Screen name="tripChanges" options={{ title: translate("changesCancellations") }} component={TripChangesScreen} />
            <Stack.Screen name="inviteToJoin" options={{ title: translate("inviteTravellers") }} component={InviteToJoinScreen} />
        </Stack.Navigator>
    );
};

const TripInfoStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: R.colors.blue },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
          
        }}>
             
        <Stack.Screen name="tripInfo" options={{ title: translate("tripInformation") }} component={TripInfoScreen} />
        <Stack.Screen name="myFlight" options={{ title: translate("myFlight") }} component={MyFlightScreen} />
        <Stack.Screen name="myHotel" options={{ title: translate("myHotel") }} component={MyHotelScreen} />
        <Stack.Screen name="myGame" options={{ title: translate("myGame") }} component={MyGameScreen} />
        <Stack.Screen name="myPerk" options={{ title: translate("myPerk") }} component={MyPerkScreen} />
  
        </Stack.Navigator>
    );
};    

const TripDocumentsStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#F7F7F7' },
            headerTintColor: R.colors.blue,
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
        }}>
            <Stack.Screen name="tripDocuments" options={{ title: translate("tripDocuments") }} component={DocumentScreen} />
        </Stack.Navigator>
    );
};




export { ChatStackNavigator, NotificationsStackNavigator, StartStackNavigator, TripStackNavigator, MyBookingStackNavigator, MoreStackNavigator, ContactStackNavigator, AllGamesStackNavigator, ManageTripStackNavigator, TripDocumentsStackNavigator,TripInfoStackNavigator };