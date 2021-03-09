import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Autocomplete from 'react-native-autocomplete-input';
import { get, servicesUrl } from 'helpers/services';
import Moment from 'moment';
import R from "res/R";

const HeaderOptions = ({ navigation }) => {
    const [games, setGames] = useState([]);
    const [suggestedGames, setSuggestedGames] = useState([]);

    useEffect(() => {
    }, [games]);

    const findAll = str => {
        let results = [];
        if (str.trim().length == 0) {
            getSuggestedGames();
            return;
        }
        get(servicesUrl.getTeamSearch + str.trim())
            .then(response => {
                results.push(...json);
            })
            .then(() => {
                get(servicesUrl.getGameSearch + str.trim())
                    .then(json => {
                        results.push(...json);
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
                setGames(response);
                setSuggestedGames(response);
            })
            .catch(e => {
                console.error(e);
            });
        }
        else
            setGames(suggestedGames);
    };

    const clear = () => {
        setGames([]);
    }

    return (
        {
            headerTintColor: '#374BBF',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
            title: Moment(new Date()).format('dddd DD MMM'),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}><DrawerButton /></TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                    <View style={{ width: 220 }}>
                        <View style={{}}>
                            <Autocomplete
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={{
                                    width: "100%",
                                }}
                                containerStyle={styles.autocompleteContainer}
                                inputContainerStyle={styles.inputContainer}
                                listContainerStyle={styles.listContainer}
                                data={games}
                                onChangeText={text => findAll(text)}
                                placeholder="Search your games ... "
                                onBlur={() => clear()}
                                onFocus={() => findAll('')}
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() => {
                                            this.props.navigation.navigate('book now', { idMatch: 123 });
                                        }}>
                                        {item.idTeams ?
                                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2, padding: 7, backgroundColor: "#f7f7f7" }}>
                                                <Image source={R.images.teams} style={{ width: 25, height: 25, marginRight: 10 }} />
                                                <Text style={styles.itemText}>{item.TeamName.toUpperCase()}</Text>
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
                                                <Text style={styles.itemText}>{item.HomeTeam.toUpperCase()} VS {item.AwayTeam.toUpperCase()}</Text>
                                            </View>
                                        }
                                    </Pressable>
                                )}

                            />
                        </View>
                    </View>
                    {/* <TextInput
                        style={{ display: "none", marginLeft: 120, borderRadius: 20, backgroundColor: "white", width: 190, height: 35 }}
                        placeholder="  &nbsp;&nbsp;Search your game ... "
                        placeholderTextColor="#46D822"
                        autoCapitalize="none"
                        onChangeText={searchText => {
                            this.setState({ searchText });
                        }}
                    /> */}
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
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        padding: 16,
        marginTop: 0,
    },
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
        fontWeight: "bold"
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
