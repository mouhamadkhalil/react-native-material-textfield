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

const sourceFile = require('../../services.js');

export default class Restaurant extends React.Component {

    state = {
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, fontSize: 20, marginTop: 70 }}>Monday - Saturday </Text>
                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, fontSize: 14, marginTop: 10 }}>12:00 - 15:00 | 19:30 - 23:00
                </Text>
                <Text style={{ color: "#76FF02", marginLeft: 380, marginTop: -18 }}>OPEN NOW </Text>
                <Text style={{ color: "white", marginLeft: 150, marginTop: 30, width: 300, fontSize: 16 }}>Liquorice pudding jelly caramels heesecake
                tart. Carrot cake jujubes muffin cake pie.
                heesecaketart Liquorice pudding jellycaramels carrot.
                </Text>
                <Text style={{ color: "#999999", marginLeft: 150, fontWeight: "bold", fontSize: 25, marginTop: 40 }}>RATING</Text>
                <Text style={{ color: "#999999", marginLeft: 330, fontWeight: "bold", fontSize: 25, marginTop: -33 }}>PRICE</Text>
                <Text style={{ marginLeft: 170, color: "white", marginTop: 60 }}>Carrer de la Duquessa d’Orleans, 56</Text>
                <Text style={{ marginLeft: 170, color: "white", marginTop: 15 }}>+34 932 05 09 61</Text>
                <Text style={{ marginLeft: 170, color: "white", marginTop: 15 }}>info@bellanapoli.com</Text>
                <Text style={{ marginLeft: 170, color: "white", marginTop: 15 }}>www.bellanapoli.com</Text>            
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
        backgroundColor: "#FF6310",
    },
});
