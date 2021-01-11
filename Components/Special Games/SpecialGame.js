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

    state = {
        Picture1: "",
        Picture2: "",
        Picture3: "",
        Picture4: "",
        isDone: false,
        searchText: "",
        idMatch: "",
        City: "",
        Stade: "",
        GameDate: "",
        LeaguesName: "",
        GameCode: "",
        HomeTeam: "",
        AwayTeam: "",
        StadeCity: ""
    };


    searchGame = () => {
        const urlSearch = `${API_URL}/mobile/game/search?text=${this.state.searchText}`
        fetch(urlSearch, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
                console.log("test", response[0].City);
                this.setState({ idMatch: response[0].idMatch });
                this.setState({ City: response[0].City });
                this.setState({ Stade: response[0].Stade });
                this.setState({ GameDate: response[0].GameDate });
                this.setState({ LeaguesName: response[0].LeaguesName });
                this.setState({ GameCode: response[0].GameCode });
                this.setState({ HomeTeam: response[0].HomeTeam });
                this.setState({ AwayTeam: response[0].AwayTeam });
                this.setState({ StadeCity: response[0].StadeCity });

            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TextInput
                    style={{ paddingLeft: 10, borderRadius: 20, marginLeft: 190, marginTop: 45, backgroundColor: "white", width: 185, height: 35 }}
                    placeholder="  &nbsp;&nbsp;Search your game ... "
                    placeholderTextColor="#46D822"
                    autoCapitalize="none"
                    onChangeText={searchText => {
                        this.setState({ searchText });
                    }}
                    onSubmitEditing={this.searchGame}
                    value={this.state.searchText}
                />

                <Text
                    style={{
                        alignContent: "center",
                        color: "#4c0099",
                        fontWeight: "bold",
                        marginTop: 30,
                        fontSize: 19,
                        marginLeft: 210
                    }}
                >
                    MONDAY 12 SEPT
        </Text>
                <TouchableOpacity onPress={this.searchGame} style={{ width: 40, marginLeft: 380, marginTop: -95 }}>
                    <Image source={Search} style={{ marginTop: 0, marginLeft: 0, height: 40, width: 40 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("hello Im Notification !")} style={{ width: 40, marginLeft: 430, marginTop: -30 }}>
                    <Image source={Notifictaion} style={{ marginTop: 0, marginLeft: 0, height: 20, width: 20 }} />
                </TouchableOpacity>
                <View style={{ marginTop: -24, width: 190 }}>
                    <TouchableOpacity>
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: 0 }} />
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ backgroundColor: "black", height: 15, width: 50, marginLeft: 140, marginTop: 100 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -20,
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
        marginTop: 30,
        marginBottom: 0,
        backgroundColor: "#F5F7EC",
    },
});
