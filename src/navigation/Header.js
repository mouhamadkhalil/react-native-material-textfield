import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Autocomplete from 'react-native-autocomplete-input';
import { get, servicesUrl } from 'helpers/services';
import Moment from 'moment';
import R from "res/R";

const HeaderOptions = ({ navigation }) => {
    const [games, setGames] = useState([]);
    const [suggestedGames, setSuggestedGames] = useState([]);

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
        if (item.idTeams)
            navigation.navigate('allGames', { idTeam: item.idTeams })
        else {
            bundle = await getMatchBundle(item.GameCode);
            if (bundle.Price == null || bundle.Price == 0)
                navigation.navigate('request', { bundle: bundle })
            else
                navigation.navigate('tripOverview', { bundle: bundle })
        }
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
            title: '',
            headerLeft: () => (
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
                    <TouchableOpacity style={{ marginLeft: 10, marginRight: 10, width: 40 }}>
                        <Image source={R.images.search} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert("hello Im Notification !")} style={{ width: 40 }}>
                        <Image source={R.images.bell} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>
                </View>
            )
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

export default HeaderOptions;
