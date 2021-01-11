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
import Game from "../../assets/images/football.jpg";
import Arrow1 from "../../assets/Images_Design/arrow_down.png";

export default class AllGames extends React.Component {

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





                <Image source={Game} style={{ height: 200, marginTop: 80 }} />
                <Text style={{ color: "red", marginLeft: 230, marginTop: 50, fontSize: 30 }}></Text>

                <ScrollView style={{ backgroundColor: "white", width: 300, height: 70, marginLeft: 145, marginTop: -120 }}>
                    <TouchableOpacity>
                        <Text style={{ marginLeft: 40, marginTop: 20 }}>FILTER</Text>
                        <Image source={Arrow1} style={{ marginLeft: 100, marginTop: -13, width: 12, height: 12 }} />
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", width: 120, height: 40, marginLeft: 325, marginTop: 20 }}>
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 10, marginTop: 10 }}>sort by date </Text>
                        <Image source={Arrow1} style={{ marginLeft: 95, marginTop: -14, width: 12, height: 12 }} />
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", marginTop: 20, width: 140, height: 250, marginLeft: 150, borderRadius: 20 }}>
                    <Text style={{ fontSize: 30, marginTop: 30, marginLeft: 10 }}>30</Text>
                    <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 10 }}>DEC</Text>
                    <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >4 DAYS</Text>
                    <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                    <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20 }}>PREMIERE LEAGUE</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20 }}>LONDON</Text>
                </ScrollView>
                <TouchableOpacity>
                    <Image source={Btn1} style={{ marginLeft: 165, marginTop: -25 }} />
                </TouchableOpacity>

                <ScrollView style={{ backgroundColor: "white", marginTop: -270, width: 140, height: 250, marginLeft: 305, borderRadius: 20 }}>
                    <Text style={{ fontSize: 30, marginTop: 30, marginLeft: 10 }}>30</Text>
                    <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 10 }}>DEC</Text>
                    <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >4 DAYS</Text>
                    <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                    <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20 }}>PREMIERE LEAGUE</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20 }}>LONDON</Text>
                </ScrollView>
                <TouchableOpacity>
                    <Image source={Btn1} style={{ marginLeft: 320, marginTop: -25 }} />
                </TouchableOpacity>

                <ScrollView style={{ backgroundColor: "white", marginTop: 30, width: 295, height: 250, marginLeft: 150, borderRadius: 20 }}>
                    <Text style={{ fontSize: 30, marginTop: 60, marginLeft: 10 }}>30</Text>
                    <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 10 }}>DEC</Text>
                    <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >4 DAYS</Text>
                    <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                    <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20, fontSize: 10 }}>PREMIERE LEAGUE</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20 }}>LONDON</Text>
                    <Text style={{ fontSize: 30, marginTop: -125, marginLeft: 170 }}>30</Text>
                    <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 170 }}>DEC</Text>
                    <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 170 }} >4 DAYS</Text>
                    <Text style={{ marginLeft: 210, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                    <Text style={{ marginLeft: 210 }} >FULHAN</Text>
                    <Text style={{ marginLeft: 210, marginTop: 20, fontSize: 10, width: 200 }}>PREMIERE LEAGUE</Text>
                    <Text style={{ marginLeft: 210, marginTop: 20 }}>LONDON</Text>
                </ScrollView>
                <TouchableOpacity>
                    <Image source={Btn1} style={{ marginLeft: 240, marginTop: -25 }} />
                </TouchableOpacity>

                <ScrollView style={{ backgroundColor: "white", marginTop: 20, width: 140, height: 250, marginLeft: 150, borderRadius: 20 }}>
                    <Text style={{ fontSize: 30, marginTop: 30, marginLeft: 10 }}>30</Text>
                    <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 10 }}>DEC</Text>
                    <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >4 DAYS</Text>
                    <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                    <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20 }}>PREMIERE LEAGUE</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20 }}>LONDON</Text>
                </ScrollView>
                <TouchableOpacity>
                    <Image source={Btn1} style={{ marginLeft: 165, marginTop: -25 }} />
                </TouchableOpacity>

                <ScrollView style={{ backgroundColor: "white", marginTop: -270, width: 140, height: 250, marginLeft: 305, borderRadius: 20 }}>
                    <Text style={{ fontSize: 30, marginTop: 30, marginLeft: 10 }}>30</Text>
                    <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 10 }}>DEC</Text>
                    <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >4 DAYS</Text>
                    <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                    <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20 }}>PREMIERE LEAGUE</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20 }}>LONDON</Text>
                </ScrollView>
                <TouchableOpacity>
                    <Image source={Btn1} style={{ marginLeft: 320, marginTop: -25 }} />
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
        marginBottom: 30,
        backgroundColor: "#F5F7EC",
    },
});
