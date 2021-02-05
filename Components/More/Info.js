
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
import Question from "../../assets/Images_Design/faq1.png";
import Setting from "../../assets/Images_Design/setting1.png";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Arrow1 from "../../assets/Images_Design/arrow_right1.png";
import Arrow2 from "../../assets/Images_Design/arrow_right2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/notification1.png";
import Chat from "../../helpers/chat";


const sourceFile = require('../../helpers/services.js');

import Autocomplete from 'react-native-autocomplete-input';

const Info = () => {
    return (

        <ScrollView style={styles.container}>
            <TouchableOpacity style={{ ...styles.linkButton, marginTop: 90 }} onpress={() => Linking.openURL('https://fly-foot.com/en/about/aboutus')}>
                <Image source={Flyfoot} style={styles.linkIcon} />
                <Text style={styles.linkText}>About us</Text>
                <Image source={Arrow1} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onpress={() => Linking.openURL('https://fly-foot.com/en/about/contact')}>
                <Image source={Chat} style={styles.linkIcon} />
                <Text style={styles.linkText}>Get in touch</Text>
                <Image source={Arrow1} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton} onpress={() => Linking.openURL('http://google.com')}>
                <Image source={Question} style={styles.linkIcon} />
                <Text style={styles.linkText}>FAQ</Text>
                <Image source={Arrow1} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL('https://fly-foot.com/en/about/TC')}>
                <Image source={Setting} style={styles.linkIcon} />
                <Text style={styles.linkText}>Terms &amp; conditions</Text>
                <Image source={Arrow1} />
            </TouchableOpacity>
        </ScrollView >

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
    },
    linkButton: {
        backgroundColor: "white",
        height: 60,
        marginTop: 30,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5
    },
    linkIcon: {
        width: 20,
        height: 25
    },
    linkText: {
        color: "blue", fontSize: 15, marginRight: "auto", marginLeft: 15
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