import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Lightbox from 'react-native-lightbox-v2';
import DownArrow from "../../assets/Images_Design/arrow_down.png";
import UpArrow from "../../assets/Images_Design/arrow_up.png";
import Location from "../../assets/Images_Design/location1.png";
import Fork from "../../assets/Images_Design/fork.png";

const sourceFile = require('../../helpers/services.js');

export default class NightLife extends React.Component {

    state = {
    };

    render() {
        return (
            <ScrollView style={styles.container}>

                <Text style={{ fontSize: 45, color: "white", marginLeft: 200, marginTop: 30 }}>Night life</Text>
                <Text style={{ fontSize: 17, color: "white", marginLeft: 230, marginTop: 5, fontWeight: "bold" }}>IN BARCELONA </Text>

                <Text style={{ fontSize: 15, color: "white", marginLeft: 150, width: 310, marginTop: 10 }}>Liq
                uorrice pudding jelly caramels cheesecake </Text>

                <Text style={{ fontSize: 15, color: "white", marginLeft: 170, width: 310, marginTop: 10 }}>tart. Carrot cake jujubes muffin cake pie. </Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('nightlife1')}>
                    <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 50 }}>BARS</Text>
                </TouchableOpacity>

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>CLUBS</Text>

                {/* carousal  */}

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>LIVE MUSIC</Text>

                {/* carousal  */}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1400,
        marginLeft: -110,
        width: 500,
        marginTop: 0,
        backgroundColor: "#031892",
    },
});
