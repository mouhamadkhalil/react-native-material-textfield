
import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking,
    ActivityIndicator
} from "react-native";
import Chat from "../FanChat/chat";
import R from "res/R";

const Info = () => {
    return (

        <ScrollView style={styles.container}>
            <TouchableOpacity style={{ ...styles.linkButton, marginTop: 90 }} onpress={() => Linking.openURL('https://fly-foot.com/en/about/aboutus')}>
                <Image source={R.Image.logo_icon} style={styles.linkIcon} />
                <Text style={styles.linkText}>About us</Text>
                <Image source={r.images.arrow_right_sm} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onpress={() => Linking.openURL('https://fly-foot.com/en/about/contact')}>
                <Image source={Chat} style={styles.linkIcon} />
                <Text style={styles.linkText}>Get in touch</Text>
                <Image source={r.images.arrow_right_sm} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton} onpress={() => Linking.openURL('http://google.com')}>
                <Image source={R.images.question} style={styles.linkIcon} />
                <Text style={styles.linkText}>FAQ</Text>
                <Image source={r.images.arrow_right_sm} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL('https://fly-foot.com/en/about/TC')}>
                <Image source={R.images.setting} style={styles.linkIcon} />
                <Text style={styles.linkText}>Terms &amp; conditions</Text>
                <Image source={r.images.arrow_right_sm} />
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