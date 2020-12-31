import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    StyleSheet,
    TextInput,
    Text,
    ScrollView,
    Image,
    Button,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { GameDayStackNavigator, HelpStackNavigator, TripStackNavigator, BookingStackNavigator, MainStackNavigator, InfoStackNavigator } from "./StackNavigator";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        // <Tab.Navigator>
        //     <Tab.Screen name="Home" component={MainStackNavigator} />
        //     <Tab.Screen name="book a trip" component={TripStackNavigator} />
        //     <Tab.Screen name="my bookings" component={TripStackNavigator} />
        //     <Tab.Screen name="more" component={TripStackNavigator} />
        //     <Tab.Screen name="contact us" component={TripStackNavigator} />
        // </Tab.Navigator>


        <Tab.Navigator
            screenOptions={({ route }) => ({
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
                    else if (route.name === 'my bookings') {
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
        >
            <Tab.Screen name="home" component={MainStackNavigator} />
            <Tab.Screen name="book a trip" component={GameDayStackNavigator} />
            <Tab.Screen name="my bookings" component={BookingStackNavigator} />
            <Tab.Screen name="more" component={InfoStackNavigator} />
            <Tab.Screen name="contact us" component={HelpStackNavigator} />
        </Tab.Navigator>

    );
};

export default BottomTabNavigator;