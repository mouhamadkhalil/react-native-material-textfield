import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Button
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
import { RNCarousel } from 'react-native-carousel-cards';

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
                <View style={{ marginTop: -35, marginLeft: 380, width: 40, height: 50 }}>
                    <TouchableOpacity>
                        <Image source={Search} style={{ width: 40, height: 40, marginLeft: 0, marginTop: 4 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: -40, marginLeft: 430, width: 40, height: 50 }}>
                    <TouchableOpacity>
                        <Image source={Notifictaion} style={{ width: 20, height: 20, marginLeft: 0, marginTop: 4 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: -49, width: 190 }}>
                    <TouchableOpacity>
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: 0 }} />
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                    </TouchableOpacity>
                </View>
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
                    {/* <TouchableOpacity>
                        <Image source={Card1} style={{ marginLeft: 140, marginTop: 30 }} />
                    </TouchableOpacity>
                    <Image source={Btn2} style={{ marginLeft: 175, marginTop: -25 }} />
                    <TouchableOpacity>
                        <Image source={Card2} style={{ marginLeft: 340, marginTop: -275 }} />
                    </TouchableOpacity>
                    <Image source={Btn1} style={{ marginLeft: 380, marginTop: -45 }} /> */}

                    <ScrollView style={{ width: 310, marginTop: 40, marginLeft: 140 }}>
                        <RNCarousel
                            data={[
                                { url: "https://media.istockphoto.com/photos/soccer-player-receives-successful-pass-and-kicks-ball-to-score-goal-picture-id1161534865?k=6&m=1161534865&s=612x612&w=0&h=JtED6RuKyUK7Eb3P9v3oPyQ8AtwJ81c8E1aWg_X52Nc=" },
                                { url: "https://i.pinimg.com/564x/fa/77/21/fa77213753dc0a086e28a45038a4ee16.jpg" },
                                { url: "https://techynickk.com/wp-content/uploads/2019/12/fifa2.jpg" },
                                { url: "https://media.istockphoto.com/photos/soccer-player-receives-successful-pass-and-kicks-ball-to-score-goal-picture-id1161534865?k=6&m=1161534865&s=612x612&w=0&h=JtED6RuKyUK7Eb3P9v3oPyQ8AtwJ81c8E1aWg_X52Nc=" },
                                { url: "https://i.pinimg.com/564x/fa/77/21/fa77213753dc0a086e28a45038a4ee16.jpg" },
                                { url: "https://techynickk.com/wp-content/uploads/2019/12/fifa2.jpg" },
                            ]}
                        />
                    </ScrollView>
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

                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "#F2E0E0", width: 310, height: 70, marginLeft: 140, marginTop: 0, marginBottom: 30, borderRadius: 20 }}>
                        <Text style={{ marginLeft: 20, marginTop: 27, fontSize: 12, fontWeight: "bold" }}>24 JAN</Text>
                        <Text style={{ marginLeft: 75, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>AS. Roma</Text>
                        <Text style={{ marginLeft: 185, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>FC. Bayern</Text>
                        <Image source={Arrow} style={{ marginLeft: 295, marginTop: -16 }} />
                    </ScrollView>
                </TouchableOpacity>

                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "#F2E0E0", width: 310, height: 70, marginLeft: 140, marginTop: 0, marginBottom: 30, borderRadius: 20 }}>
                        <Text style={{ marginLeft: 20, marginTop: 27, fontSize: 12, fontWeight: "bold" }}>24 JAN</Text>
                        <Text style={{ marginLeft: 75, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>AS. Roma</Text>
                        <Text style={{ marginLeft: 185, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>FC. Bayern</Text>
                        <Image source={Arrow} style={{ marginLeft: 295, marginTop: -16 }} />
                    </ScrollView>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: "#4AD219", width: 150, height: 50, marginLeft: 220, marginBottom: 30, marginTop: -45, borderRadius: 20 }}>
                    <Text style={{ color: "white", fontWeight: "bold", marginLeft: 33, marginTop: 15 }}>LOAD MORE &nbsp;+</Text>
                </TouchableOpacity>

                <ScrollView style={{ backgroundColor: "black", height: 15, width: 50, marginLeft: 140, marginTop: 0 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -22,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 200
                    }}
                >
                    HOT GAMES
                </Text>
                <ScrollView>
                    <TouchableOpacity>
                        <Image source={Card1} style={{ marginLeft: 140, marginTop: 30 }} />
                    </TouchableOpacity>
                    <Image source={Btn2} style={{ marginLeft: 175, marginTop: -25 }} />
                    <TouchableOpacity>
                        <Image source={Card2} style={{ marginLeft: 340, marginTop: -275 }} />
                    </TouchableOpacity>
                    <Image source={Btn1} style={{ marginLeft: 380, marginTop: -45 }} />
                </ScrollView>

                <ScrollView style={{ backgroundColor: "black", height: 15, width: 50, marginLeft: 140, marginTop: 90 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -22,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 200
                    }}
                >
                    POPULAR TEAMS
                </Text>
                <ScrollView>
                    <TouchableOpacity>
                        <Image source={Card1} style={{ marginLeft: 140, marginTop: 30 }} />
                    </TouchableOpacity>
                    <Image source={Btn2} style={{ marginLeft: 175, marginTop: -25 }} />
                    <TouchableOpacity>
                        <Image source={Card2} style={{ marginLeft: 340, marginTop: -275 }} />
                    </TouchableOpacity>
                    <Image source={Btn1} style={{ marginLeft: 380, marginTop: -45 }} />
                </ScrollView>

                <ScrollView style={{ backgroundColor: "black", height: 15, width: 50, marginLeft: 140, marginTop: 90 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -22,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 200
                    }}
                >
                    COMPETETIONS
                </Text>
                <ScrollView>
                    <TouchableOpacity>
                        <Image source={Card1} style={{ marginLeft: 140, marginTop: 30 }} />
                    </TouchableOpacity>
                    <Image source={Btn2} style={{ marginLeft: 175, marginTop: -25 }} />
                    <TouchableOpacity>
                        <Image source={Card2} style={{ marginLeft: 340, marginTop: -275 }} />
                    </TouchableOpacity>
                    <Image source={Btn1} style={{ marginLeft: 380, marginTop: -45 }} />
                </ScrollView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1100,
        marginLeft: -110,
        width: 500,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: "#F5F7EC",
    },
});
