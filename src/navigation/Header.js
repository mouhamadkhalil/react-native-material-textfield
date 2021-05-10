import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import Autocomplete from 'react-native-autocomplete-input';
import { get, servicesUrl } from 'helpers/services';
import R from "res/R";
import { ImageBackground } from 'react-native';

function HeaderOptions2(navigation, route) {


    useEffect(() => {
        //registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const sendPushNotification = async () => {
        const message = {
            to: "ExponentPushToken[VbC1pWIzxDSI0bYPaiViNj]",
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!',
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    const findAll = str => {
        let results = [];
        if (str.trim().length == 0) {
            getSuggestedGames();
            return;
        }
        get(servicesUrl.getTeamSearch + str.trim())
            .then((response) => {
                results.push(...response);
            })
            .then(() => {
                get(servicesUrl.getGameSearch + str.trim())
                    .then((response) => {
                        results.push(...response);
                        setGames(results);
                    });
            })
            .catch(e => {
                console.error(e);
            });
    };

    const getSuggestedGames = () => {
        if (suggestedGames == null || suggestedGames.length == 0) {
            get(servicesUrl.getSuggestedGames)
                .then(response => {
                    setSuggestedGames(response);
                    setGames(response);
                })
                .catch(e => {
                    console.error(e);
                });
        }
        else
            setGames(suggestedGames);
    };

    const getMatchBundle = (gameCode) => {
        const params = `?customize=false&validateHotelPrice=false&hotelId=-1`;
        return get(servicesUrl.getGameV2 + gameCode + params)
            .then((response) => {
                return response;
            })
    }

    const clear = () => {
        setGames([]);
    }

    const onItemPress = async (item) => {
        var bundle;
        /*if (item.idTeams)
            navigation.navigate('allGames', { idTeam: item.idTeams })
        else {
            bundle = await getMatchBundle(item.GameCode);
            if (bundle.Price == null || bundle.Price == 0)
                navigation.navigate('request', { bundle: bundle })
            else
                navigation.navigate('tripOverview', { bundle: bundle })
        }*/
    };

    const keyExtractor = useCallback(
        (item) => item.idTeams ? 'team' + item.idTeams : 'match' + item.idMatch, []
    );

    const renderListItem =
        ({ item }) =>
            <TouchableOpacity onPress={() => { onItemPress(item) }}>
                {item.idTeams ?
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2, padding: 7, backgroundColor: "#f7f7f7" }}>
                        <Image source={R.images.teams} style={{ width: 25, height: 25, marginRight: 10 }} />
                        <Text style={styles.itemText}>{item.TeamName}</Text>
                    </View>
                    :
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2, padding: 7, backgroundColor: "#f7f7f7" }}>
                        <View style={{ marginRight: 5 }}>
                            <LinearGradient
                                colors={[item.Team1Color1, item.Team1Color2]}
                                style={styles.linearGradient}
                                start={[0, 0]}
                                end={[1, 0]}
                                locations={[0.5, 0.5]}
                            >
                            </LinearGradient>
                        </View>
                        <View style={{ marginRight: 15 }}>
                            <LinearGradient
                                colors={[item.Team2Color1, item.Team2Color2]}
                                style={styles.linearGradient}
                                start={[0, 0]}
                                end={[1, 0]}
                                locations={[0.5, 0.5]}
                            >
                            </LinearGradient>
                        </View>
                        <Text style={styles.itemText}>{item.HomeTeam} VS {item.AwayTeam}</Text>
                    </View>
                }
            </TouchableOpacity>


    return (
        {
            headerTintColor: '#374BBF',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
            title: route?.params?.notificationsNumber ? "45" : "0",
            /*headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}><DrawerButton /></TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                    <View style={{ width: 220 }}>
                        <View style={{
                            ...(Platform.OS !== 'android' && {
                                zIndex: 100, position: 'absolute'
                            })
                        }} >
                            <Autocomplete
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyExtractor={keyExtractor}
                                style={{ width: "100%" }}
                                containerStyle={styles.autocompleteContainer}
                                inputContainerStyle={styles.inputContainer}
                                listContainerStyle={styles.listContainer}
                                data={games}
                                onChangeText={text => findAll(text)}
                                placeholder="Search your games ... "
                                onBlur={() => clear()}
                                onFocus={() => findAll('')}
                                renderItem={renderListItem}
                            />
                        </View>
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10, width: 40 }}>
                        <Image source={R.images.search} style={{ height: 40, width: 40 }} />
                    </View>
                    <TouchableOpacity onPress={() => sendPushNotification()} style={{ flex: 1, flexDirection: 'row', width: 40 }}>
                        <ImageBackground source={R.images.bell} style={{ height: 40, width: 40 }} >
                            <View style={{ backgroundColor: 'red', borderRadius: 40, alignSelf: 'flex-end' }}>
                                <Text style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}>
                                     {route?.params?.notificationsNumber}
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            )*/
        }
    );
};
const DrawerButton = () => {
    return (
        <View>
            <Image source={R.images.line} style={{ width: 35, height: 15, marginStart: 30, marginTop: 0 }} />
            <Image source={R.images.line} style={{ width: 35, height: 15, marginStart: 30, marginTop: -5 }} />
            <Image source={R.images.line} style={{ width: 35, height: 15, marginStart: 30, marginTop: -5 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    autocompleteContainer: {
        width: 300,
        marginLeft: 0,
        marginTop: -17
    },
    inputContainer: {
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 30,
        paddingLeft: 10,
        paddingRight: 10,
        height: 35,
        width: 210
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    listContainer: {
        width: 350,
        marginLeft: -60,
        position: "absolute",
        left: 0,
        top: 45
    },
    itemText: {
        fontSize: 13,
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
        width: 300
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 15,
        width: 15,
    },
});


function HeaderOptions(navigation, route) {

    return (
        {
            title: "",
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}><DrawerButton /></TouchableOpacity>
            ),
            headerRight: function () {
                const [games, setGames] = useState([]);
                const [suggestedGames, setSuggestedGames] = useState([]);
                const [expoPushToken, setExpoPushToken] = useState('');
                const [notification, setNotification] = useState(false);
                const notificationListener = useRef();
                const responseListener = useRef();

                useEffect(() => {
                    //registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

                    // This listener is fired whenever a notification is received while the app is foregrounded
                    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                        setNotification(notification);
                    });

                    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
                    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                        console.log(response);
                    });

                    return () => {
                        Notifications.removeNotificationSubscription(notificationListener.current);
                        Notifications.removeNotificationSubscription(responseListener.current);
                    };
                }, []);

                return (
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                        <View style={{ width: 220 }}>
                            <View style={{
                                ...(Platform.OS !== 'android' && {
                                    zIndex: 100, position: 'absolute'
                                })
                            }} >

                            </View>
                        </View>
                        <View style={{ marginLeft: 10, marginRight: 10, width: 40 }}>
                            <Image source={R.images.search} style={{ height: 40, width: 40 }} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('notifications', { notifications: route?.params?.notifications })} style={{ flex: 1, flexDirection: 'row', width: 40 }}>
                            <ImageBackground source={R.images.bell} style={{ height: 40, width: 40 }} >
                                {route?.params?.notificationsNumber > 0 ?
                                    <View style={{ backgroundColor: 'red', borderRadius: 40, width: 20, alignSelf: 'flex-end' }}>
                                        <Text style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}>
                                            {route?.params?.notificationsNumber}
                                        </Text>
                                    </View> : null}
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    );


}

export default HeaderOptions;
