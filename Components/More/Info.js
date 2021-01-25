
import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
    Linking,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Flyfoot from "../../assets/Images_Design/flyfoot1.png";
import Flag2 from "../../assets/Images_Design/flag2.png";
import Chat from "../../assets/Images_Design/msg1.png";
import Question from "../../assets/Images_Design/faq1.png";
import Setting from "../../assets/Images_Design/setting1.png";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Arrow1 from "../../assets/Images_Design/arrow_right1.png";
import Arrow2 from "../../assets/Images_Design/arrow_right2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/notification1.png";

const sourceFile = require('../../services.js');

import Autocomplete from 'react-native-autocomplete-input';

const Info = () => {

    const [films, setFilms] = useState([]);
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});

    useEffect(() => {
        fetch('https://apitest.fly-foot.com/api/mobile/game/getSuggestedGames')
            .then((res) => res.json())
            .then((json) => {
                const newJson = "{results :" + JSON.stringify(json) + "}";
                setFilms(JSON.parse(newJson));
                //const { results: films } = json;
                // console.log("tefilmsstobj", films);
                console.log("type", typeof newJson);


                //setFilms(films);



                /*const newJson = "{results :" + JSON.stringify(json) + "}";
                // console.log("testobj", newJson);

                const { films: setFilms } = useState(JSON.parse(newJson));
                console.log("films :", films);

                //setFilms(films);
                //setting the data in the films state*/
            })
            .catch((e) => {
                //alert(e);
            });
    }, []);

    const findFilm = (query) => {
        if (query) {
            const regex = new RegExp(`${query.trim()}`, 'i');
            // console.log("123", films[0].City);
            setFilteredFilms(

                films.filter((film) => film.City.search(regex) >= 0)
            );
        } else {
            setFilteredFilms([]);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView style={styles.container}>
                <TouchableOpacity onpress={() => Linking.openURL('http://google.com')}>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 20, marginTop: 70 }}>
                        <Image source={Flyfoot} style={{ width: 20, height: 25, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ marginLeft: 100, color: "blue", fontSize: 15, marginLeft: 60, marginTop: -25 }}
                            onPress={() => {
                                Linking.openURL('https://fly-foot.com/en/about/aboutus');
                            }}>
                            About us
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>

                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 30, marginTop: 25 }}>
                        <Image source={Chat} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -25 }}
                            onPress={() => {
                                Linking.openURL('https://fly-foot.com/en/about/contact');
                            }}>
                            Get in touch
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity >
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 30, marginTop: 25 }}>
                        <Image source={Question} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>FAQ</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 30, marginTop: 25 }}>
                        <Image source={Setting} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}
                            onPress={() => {
                                Linking.openURL('https://fly-foot.com/en/about/TC');
                            }}>
                            Terms &amp; conditions
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}>
                            <Image source={Arrow1} /></Text>

                    </ScrollView>
                </TouchableOpacity>

                <View style={styles.container}>

                    <View style={styles.descriptionContainer}>
                        {films ? (
                            <>
                                <Text style={styles.infoText}>
                                    Selected Data
              </Text>
                                <Text style={styles.infoText}>
                                    {JSON.stringify(selectedValue)}
                                </Text>
                            </>
                        ) : (
                                <Text style={styles.infoText}>
                                    Enter The Film Title
                                </Text>
                            )}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
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
export default Info;