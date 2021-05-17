import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TripStackNavigator, MyBookingStackNavigator, MoreStackNavigator, ContactStackNavigator, AllGamesStackNavigator ,WhatToDoStackNavigator, WhereToEatStackNavigator} from "./StackNavigator";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TripTabs = ({navigation}) => {
    return (
        <Tab.Navigator initialRouteName= "book a trip" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'book a trip') {
                    return (
                        <Ionicons
                            name={focused ? 'earth-outline' : 'earth-outline'}
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'home') {
                    return (
                        <Ionicons
                            name={focused ? 'home-outline' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
                else if (route.name === 'more') {
                    return (
                        <Ionicons
                            name={focused ? 'ellipsis-horizontal-outline' : 'ellipsis-horizontal-outline'}
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'contact us') {
                    return (
                        <Ionicons
                            name={focused ? 'chatbox-ellipses-outline' : 'chatbox-ellipses-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
                else if (route.name === 'myBookings') {
                    return (
                        <Ionicons
                            name={focused ? 'list-circle-outline' : 'list-circle-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
            },
        })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }}
            navigationProps={navigation}
        >
            <Tab.Screen name="book a trip" component={TripStackNavigator} />
            <Tab.Screen name="myBookings" component={MyBookingStackNavigator} />
            <Tab.Screen name="more" component={MoreStackNavigator} />
            <Tab.Screen name="contact us" component={ContactStackNavigator} />
        </Tab.Navigator>
    );
};

const BookingsTabs = ({ navigation }) => {
    return (
        <Tab.Navigator initialRouteName= "myBookings" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'book a trip') {
                    return (
                        <Ionicons
                            name={focused ? 'earth-outline' : 'earth-outline'}
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'home') {
                    return (
                        <Ionicons
                            name={focused ? 'home-outline' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
                else if (route.name === 'more') {
                    return (
                        <Ionicons
                            name={focused ? 'ellipsis-horizontal-outline' : 'ellipsis-horizontal-outline'}
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'contact us') {
                    return (
                        <Ionicons
                            name={focused ? 'chatbox-ellipses-outline' : 'chatbox-ellipses-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
                else if (route.name === 'myBookings') {
                    return (
                        <Ionicons
                            name={focused ? 'list-circle-outline' : 'list-circle-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
            },
        })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }}
            navigationProps={navigation}
        >
            <Tab.Screen name="book a trip" component={TripStackNavigator} />
            <Tab.Screen name="myBookings" component={MyBookingStackNavigator} />
            <Tab.Screen name="more" component={MoreStackNavigator} />
            <Tab.Screen name="contact us" component={ContactStackNavigator} />
        </Tab.Navigator>
    );
};

const MoreTabs = ({ navigation }) => {
    return (
        <Tab.Navigator initialRouteName= "more"  screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'book a trip') {
                    return (
                        <Ionicons
                            name={focused ? 'earth-outline' : 'earth-outline'}
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'home') {
                    return (
                        <Ionicons
                            name={focused ? 'home-outline' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
                else if (route.name === 'more') {
                    return (
                        <Ionicons
                            name={focused ? 'ellipsis-horizontal-outline' : 'ellipsis-horizontal-outline'}
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'contact us') {
                    return (
                        <Ionicons
                            name={focused ? 'chatbox-ellipses-outline' : 'chatbox-ellipses-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
                else if (route.name === 'myBookings') {
                    return (
                        <Ionicons
                            name={focused ? 'list-circle-outline' : 'list-circle-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
            },
        })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }}
            navigationProps={navigation}
        >
            <Tab.Screen name="book a trip" component={TripStackNavigator} />
            <Tab.Screen name="myBookings" component={MyBookingStackNavigator} />
            <Tab.Screen name="more" component={MoreStackNavigator} />
            <Tab.Screen name="contact us" component={ContactStackNavigator} />
        </Tab.Navigator>
    );
};

const ContactTabs = ({ navigation }) => {
    return (
        <Tab.Navigator initialRouteName= "contact us" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'book a trip') {
                    return (
                        <Ionicons
                            name={focused ? 'earth-outline' : 'earth-outline'}
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'home') {
                    return (
                        <Ionicons
                            name={focused ? 'home-outline' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
                else if (route.name === 'more') {
                    return (
                        <Ionicons
                            name={focused ? 'ellipsis-horizontal-outline' : 'ellipsis-horizontal-outline'}
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'contact us') {
                    return (
                        <Ionicons
                            name={focused ? 'chatbox-ellipses-outline' : 'chatbox-ellipses-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
                else if (route.name === 'myBookings') {
                    return (
                        <Ionicons
                            name={focused ? 'list-circle-outline' : 'list-circle-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
            },
        })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }}
            navigationProps={navigation}
        >
            <Tab.Screen name="book a trip" component={TripStackNavigator} />
            <Tab.Screen name="myBookings" component={MyBookingStackNavigator} />
            <Tab.Screen name="more" component={MoreStackNavigator} />
            <Tab.Screen name="contact us" component={ContactStackNavigator} />
        </Tab.Navigator>
    );
};


const AllGamesTabs = ({ navigation }) => {
    return (
        <Tab.Navigator initialRouteName= "book a trip" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'book a trip') {
                    return (
                        <Ionicons
                            name={focused ? 'earth-outline' : 'earth-outline'}
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'home') {
                    return (
                        <Ionicons
                            name={focused ? 'home-outline' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
                else if (route.name === 'more') {
                    return (
                        <Ionicons
                            name={focused ? 'ellipsis-horizontal-outline' : 'ellipsis-horizontal-outline'}
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'contact us') {
                    return (
                        <Ionicons
                            name={focused ? 'chatbox-ellipses-outline' : 'chatbox-ellipses-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
                else if (route.name === 'myBookings') {
                    return (
                        <Ionicons
                            name={focused ? 'list-circle-outline' : 'list-circle-outline'}
                            size={size}
                            color={color}
                        />
                    );
                }
            },
        })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }}
            navigationProps={navigation}
        >
            <Tab.Screen name="book a trip" component={AllGamesStackNavigator} />
            <Tab.Screen name="myBookings" component={MyBookingStackNavigator} />
            <Tab.Screen name="more" component={MoreStackNavigator} />
            <Tab.Screen name="contact us" component={ContactStackNavigator} />
        </Tab.Navigator>
    );
};

export {TripTabs, BookingsTabs, MoreTabs, ContactTabs, AllGamesTabs};