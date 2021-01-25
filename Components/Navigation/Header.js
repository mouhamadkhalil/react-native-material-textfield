import React, { useState, useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../Navigation/Header";
import Login from "../Start/LoginScreen";
import Signup from "../Start/SignupScreen";
import SpecialGames from "../Special Games/SpecialGame";
import AnyDayScreen from "../Schedule/AnyDayScreen";
import InfoScreen from "../More/Info";
import Help1Screen from "../Help/Help1Screen";
import Help2Screen from "../Help/Help2Screen";
import { StyleSheet, View, Image, TouchableOpacity, TextInput } from "react-native";
import Line2 from "../../assets/Images_Design/line2.png";
import Moment from 'moment';
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/bell.png";

import Autocomplete from 'react-native-autocomplete-input';

const getSuggestedGames = () => {
    fetch('https://apitest.fly-foot.com/api/mobile/game/getSuggestedGames')
        .then(res => res.json())
        .then(json => {
            // const newJson = "{results :" + JSON.stringify(json) + "}";
            // setFilms(JSON.parse(newJson));
            //const { results: films } = json;
            // console.log("tefilmsstobj", films);
            setMatches(json);
            console.log(json);


            //setFilms(films);



            /*const newJson = "{results :" + JSON.stringify(json) + "}";
            // console.log("testobj", newJson);

            const { films: setFilms } = useState(JSON.parse(newJson));
            console.log("films :", films);

            //setFilms(films);
            //setting the data in the films state*/
        })
        .catch(e => {
            console.error(e);
        });
};




const HeaderOptions = ({ navigation }) => {
    const [matches, setMatches] = useState([]);
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});
    const findMatch = str => {
        console.log("str:", str);
        fetch(`https://fly-foot.com/api/mobile/team/search?text=${str.trim()}`)
            .then(res => res.json())
            .then(json => {
                setMatches(json);
                console.log(json);
            })
            .catch(e => {
                console.error(e);
            });
    };
    // const findMatch = query => {
    //     let ar = [];
    //     if (query) {
    //         const regex = new RegExp(query.trim(), 'i');
    //         console.log(matches);
    //         ar = matches.filter(match => regex.test(match.City));
    //     }
    //     setFilteredFilms(ar);
    // };

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
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{
                            paddingLeft: 10, paddingRight: 10, borderRadius: 20, marginLeft: 0, marginTop: 0,
                            backgroundColor: "white", width: 185, height: 35
                        }}
                        containerStyle={styles.autocompleteContainer}
                        data={filteredFilms}
                        defaultValue={
                            JSON.stringify(selectedValue) === '{}' ?
                                '' :
                                selectedValue.title
                        }
                        onChangeText={text => findMatches(text)}
                        placeholder="&nbsp;&nbsp;Search your gamess ... "
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedValue(item);
                                    setFilteredFilms([]);
                                }}>
                                <Text style={styles.itemText}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
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
                        <Image source={Search} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert("hello Im Notification !")} style={{ width: 40 }}>
                        <Image source={Notifictaion} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>
                </View>
            )
        }
    );
};
const DrawerButton = () => {
    return (
        <View>
            <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 30, marginTop: 0 }} />
            <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 30, marginTop: -5 }} />
            <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 30, marginTop: -5 }} />
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
        borderRadius: 50,
        marginTop: 20,
        width: 188,
        marginLeft: 70,
        marginTop: 0,
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
        width: 300
    },
});

export default HeaderOptions;
