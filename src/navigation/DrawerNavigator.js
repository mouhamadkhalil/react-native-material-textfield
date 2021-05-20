import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import LeaguesScreen from "../screens/Trips/LeaguesScreen";
import TeamsScreen from "../screens/Trips/TeamsScreen";
import { TripTabs, AllGamesTabs } from "./TabNavigator";
import { ManageTripStackNavigator, TripDocumentsStackNavigator } from "./StackNavigator";
import { resetUserCredentials, translate } from "helpers/utils.js";
import { PointPropType } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    const logout = async (props) => {
        await resetUserCredentials();
        props.navigation.navigate("Login");
    }

    return (
        <Drawer.Navigator drawerContent={props => {
            let filteredProps = props;
            if (props.navigation.state?.routeName == 'myBookings') {
                filteredProps = {
                    ...props,
                    state: {
                        ...props.state,
                        routeNames: props.state.routeNames.filter((routeName) => routeName !== 'manageTrip'),
                        routes: props.state.routes.filter((route) => route.name !== 'manageTrip'),
                    }
                };
            }
            return (
                <DrawerContentScrollView {...filteredProps}>
                    <DrawerItemList {...filteredProps} />
                    <DrawerItem label={translate('logout')} onPress={() => logout(props)} />
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="Book a trip" component={TripTabs} />
            <Drawer.Screen name="Teams" component={TeamsScreen} />
            <Drawer.Screen name="Leagues" component={LeaguesScreen} />
            <Drawer.Screen name="All games" component={AllGamesTabs} />
            <Drawer.Screen name="manageTrip" options={{ title: translate('manageTrip') }} component={ManageTripStackNavigator} />
            <Drawer.Screen name="tripDocuments" options={{ title: translate('tripDocuments') }} component={TripDocumentsStackNavigator} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;