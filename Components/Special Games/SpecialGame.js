import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/notification1.png";
import Card1 from "../../assets/Images_Design/card1.png";
import Card2 from "../../assets/Images_Design/card2.png";
import Btn1 from "../../assets/Images_Design/btn1.png";
import Btn2 from "../../assets/Images_Design/btn2.png";
import Arrow from "../../assets/Images_Design/arrow_right1.png";

export default class Day2Screen extends React.Component {

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text
                    style={{
                        alignContent: "center",
                        color: "#4c0099",
                        fontWeight: "bold",
                        marginTop: 40,
                        fontSize: 19,
                        marginLeft: 210
                    }}
                >
                    MONDAY 12 SEPT
                </Text>
                <Image source={Search} style={{ width: 40, height: 40, marginLeft: 380, marginTop: -30 }} />
                <Image source={Notifictaion} style={{ width: 20, height: 20, marginLeft: 430, marginTop: -30 }} />
                <TouchableOpacity>
                    <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -25 }} />
                    <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                    <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                </TouchableOpacity>
                <ScrollView style={{ backgroundColor: "black", height: 15, width: 50, marginLeft: 140, marginTop: 50 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -22,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 200
                    }}
                >
                    SPECIAL GAME
                </Text>
                <ScrollView>
                    <TouchableOpacity>
                        <Image source={Card1} style={{ marginLeft: 140, marginTop: 30 }} />
                    </TouchableOpacity>
                    <Image source={Btn2} style={{ marginLeft: 175, marginTop: -25 }} />
                    <TouchableOpacity>
                        <Image source={Card2} style={{ marginLeft: 340, marginTop: -275 }} />
                    </TouchableOpacity>
                    <Image source={Btn1} style={{ marginLeft: 380, marginTop: -25 }} />
                </ScrollView>
                <ScrollView style={{ backgroundColor: "black", height: 15, width: 50, marginLeft: 140, marginTop: 50 }}>
                </ScrollView>
                <Text
                    style={{
                        marginTop: -22,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 200
                    }}
                >
                    POPULAR GAMES
                </Text>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "#F2E0E0", width: 310, height: 70, marginLeft: 140, marginTop: 30, borderRadius: 20 }}>
                        <Text style={{ marginLeft: 20, marginTop: 27, fontSize: 12, fontWeight: "bold" }}>31 JAN</Text>
                        <Text style={{ marginLeft: 75, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>FC. Barcelona</Text>
                        <Text style={{ marginLeft: 185, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>CHELESEA FC.</Text>
                        <Image source={Arrow} style={{ marginLeft: 295, marginTop: -16 }} />
                    </ScrollView>
                </TouchableOpacity>

                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "#F2E0E0", width: 310, height: 70, marginLeft: 140, marginTop: 30, borderRadius: 20 }}>
                        <Text style={{ marginLeft: 20, marginTop: 27, fontSize: 12, fontWeight: "bold" }}>05 JAN</Text>
                        <Text style={{ marginLeft: 75, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>BV. dortmun</Text>
                        <Text style={{ marginLeft: 185, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>Real madrid</Text>
                        <Image source={Arrow} style={{ marginLeft: 295, marginTop: -16 }} />
                    </ScrollView>
                </TouchableOpacity>

                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "#F2E0E0", width: 310, height: 70, marginLeft: 140, marginTop: 30, marginBottom: 30, borderRadius: 20 }}>
                        <Text style={{ marginLeft: 20, marginTop: 27, fontSize: 12, fontWeight: "bold" }}>24 JAN</Text>
                        <Text style={{ marginLeft: 75, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>AS. Roma</Text>
                        <Text style={{ marginLeft: 185, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>FC. Bayern</Text>
                        <Image source={Arrow} style={{ marginLeft: 295, marginTop: -16 }} />
                    </ScrollView>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1100,
        marginLeft: -110,
        width: 500,
        marginTop: 30,
        marginBottom: 0,
        backgroundColor: "#F5F7EC",
    },
});
