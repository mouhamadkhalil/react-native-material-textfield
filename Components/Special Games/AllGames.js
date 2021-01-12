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
import DropDownPicker from "react-native-dropdown-picker";
import Carousal from "./Carousal.js";
import Carousal2 from "./Carousal2.js";

const sourceFile = require('../../services.js');

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
        GameDate1: "",
        GameDate2: "",
        LeaguesName: "",
        GameCode: "",
        HomeTeam: "",
        AwayTeam: "",
        StadeCity: "",
        GameCity1: "",
        GameCity2: "",
        GamePrice1: "",
        GamePrice2: "",
        pageNumber: 1,
        LeaguesName: "",
        DaysLeft: "",
        pageSize: 15,
        idTeam: 2122,
        orderBy: "",
    };

    searchGame = () => {
        const urlSearch = `${API_URL}/mobile/game/search?text=${this.state.searchText}`;
        fetch(urlSearch, {
            method: "GET",
            headers: {
                "Content-Type": sourceFile.Content_Type,
                "Accept": sourceFile.Accept,
                "ff_version": sourceFile.ff_version,
                "ff_language": sourceFile.ff_language,
                "source": sourceFile.source,
                // "authorization" : sourceFile.authorization,
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
                console.log("test", response[0].City);
                this.setState({ idMatch: response[0].idMatch });
                this.setState({ City: response[0].City });
                this.setState({ Stade: response[0].Stade });
                this.setState({ GameDate1: response[0].GameDate });
                this.setState({ LeaguesName: response[0].LeaguesName });
                this.setState({ GameCode: response[0].GameCode });
                this.setState({ HomeTeam: response[0].HomeTeam });
                this.setState({ AwayTeam: response[0].AwayTeam });
                this.setState({ StadeCity: response[0].StadeCity });
            });
    };

    FilterGame = () => {
        const urlFilter = `${API_URL}/mobile/game/getall?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}&idTeam=${this.state.idTeam}&order=${this.state.orderBy}`;
        fetch(urlFilter, {
            method: "GET",
            headers: {
                "Content-Type": sourceFile.Content_Type,
                "Accept": sourceFile.Accept,
                "ff_version": sourceFile.ff_version,
                "ff_language": sourceFile.ff_language,
                "source": sourceFile.source,
                // "authorization" : sourceFile.authorization,
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
                console.log("leaguess ===> ", response.Items[0].MatchBundleDetail[0].GameSeat.Sequence);
                this.setState({ GameDate1: response.Items[0].MatchBundleDetail[0].Game.GameDate })
                this.setState({ GameDate2: response.Items[1].MatchBundleDetail[0].Game.GameDate })
                this.setState({ GameCity1: response.Items[0].MatchBundleDetail[0].Game.City })
                this.setState({ GameCity2: response.Items[1].MatchBundleDetail[0].Game.City })
                this.setState({ LeaguesName: response.Items[0].MatchBundleDetail[0].Game.League })
                this.setState({ DaysLeft: response.Items[0].MatchBundleDetail[0].GameSeat.Sequence })
                this.setState({ GamePrice1: response.Items[0].MatchBundleDetail[0].GameSeats[0].ExtraCostPerFan });
                this.setState({ GamePrice2: response.Items[0].MatchBundleDetail[0].GameSeats[0].ExtraCost });
            });
    };




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
                    <TouchableOpacity style={{ height: 70, width: 150 }} onPress={this.FilterGame}>
                        <Text style={{ marginLeft: 40, marginTop: 20 }}>FILTER</Text>
                        <Image source={Arrow1} style={{ marginLeft: 100, marginTop: -13, width: 12, height: 12 }} />
                    </TouchableOpacity>
                </ScrollView>

                <DropDownPicker
                    items={[
                        { label: "sort by date", value: "date" },
                        { label: "sort by price", value: "price" },
                    ]}
                    defaultValue={this.state.orderBy}
                    containerStyle={{ height: 75 }}
                    style={{ backgroundColor: "#fafafa", width: 130, marginLeft: 315, marginTop: 30 }}
                    itemStyle={{
                        justifyContent: "flex-start",
                    }}
                    dropDownStyle={{ width: 130, marginLeft: 315 }}
                    onChangeItem={(item) =>
                        this.setState({
                            orderBy: item.value,
                        })
                    }
                />

                <Carousal />
                <Carousal2 />
                <Carousal />

                {/* <TouchableOpacity style={{ marginTop: 60, width: 140, height: 250, marginLeft: 150 }}>
                    <ScrollView style={{ backgroundColor: "white", borderRadius: 20 }}>
                        <Text style={{ fontSize: 30, marginTop: 30, marginLeft: 10 }}>{this.state.GameDate1.substring(8, 10)}</Text>
                        <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 14 }}>{this.state.GameDate1.substring(5, 7)}</Text>
                        <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >{this.state.DaysLeft} DAYS</Text>
                        <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                        <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20 }}>{this.state.LeaguesName} LEAGUE</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20 }}>{this.state.GameCity1}</Text>
                    </ScrollView>
                </TouchableOpacity> */}
                {/* 
                <TouchableOpacity style={{ backgroundColor: "red", width: 100, height: 50, marginLeft: 172, marginTop: -25 }}>
                    <ScrollView style={{ backgroundColor: "#62F622", width: 100, height: 50 }}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 15 }}>{this.state.GamePrice1}$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Image source={Arrow} style={{ marginLeft: 80, marginTop: -10 }} />
                        <Text style={{ marginTop: -5, marginLeft: 10, fontSize: 9, fontWeight: "bold" }}>BOOK NOW</Text>
                    </ScrollView>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={{ marginTop: -275, width: 140, height: 250, marginLeft: 310 }}>
                    <ScrollView style={{ backgroundColor: "white", borderRadius: 20 }}>
                        <Text style={{ fontSize: 30, marginTop: 30, marginLeft: 10 }}>{this.state.GameDate2.substring(8, 10)}</Text>
                        <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 14 }}>{this.state.GameDate2.substring(5, 7)}</Text>
                        <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >{this.state.DaysLeft} DAYS</Text>
                        <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                        <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20 }}>{this.state.LeaguesName} LEAGUE</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20 }}>{this.state.GameCity2}</Text>
                    </ScrollView>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={{ backgroundColor: "red", width: 100, height: 50, marginLeft: 330, marginTop: -25 }}>
                    <ScrollView style={{ backgroundColor: "#62F622", width: 100, height: 50 }}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 15 }}>{this.state.GamePrice2}$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Image source={Arrow} style={{ marginLeft: 80, marginTop: -10 }} />
                        <Text style={{ marginTop: -5, marginLeft: 10, fontSize: 9, fontWeight: "bold" }}>BOOK NOW</Text>
                    </ScrollView>
                </TouchableOpacity> */}

                {/* <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "white", marginTop: 30, width: 295, height: 250, marginLeft: 150, borderRadius: 20 }}>
                        <Text style={{ fontSize: 30, marginTop: 60, marginLeft: 10 }}>{this.state.GameDate1.substring(8, 10)}</Text>
                        <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 10 }}>{this.state.GameDate1.substring(5, 7)}</Text>
                        <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >{this.state.DaysLeft} DAYS</Text>
                        <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                        <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20, fontSize: 10 }}>{this.state.LeaguesName}  LEAGUE</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20 }}>{this.state.GameCity1}</Text>
                        <Text style={{ fontSize: 30, marginTop: -125, marginLeft: 170 }}>{this.state.GameDate2.substring(8, 10)}</Text>
                        <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 170 }}>{this.state.GameDate2.substring(5, 7)}</Text>
                        <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 170 }} >{this.state.DaysLeft} DAYS</Text>
                        <Text style={{ marginLeft: 210, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                        <Text style={{ marginLeft: 210 }} >FULHAN</Text>
                        <Text style={{ marginLeft: 210, marginTop: 20, fontSize: 10, width: 200 }}>{this.state.LeaguesName}  LEAGUE</Text>
                        <Text style={{ marginLeft: 210, marginTop: 20 }}>{this.state.GameCity2}</Text>
                    </ScrollView>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={{ backgroundColor: "red", width: 100, height: 50, marginLeft: 250, marginTop: -25 }}>
                    <ScrollView style={{ backgroundColor: "#62F622", width: 100, height: 50 }}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 15 }}>{this.state.GamePrice1}$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Image source={Arrow} style={{ marginLeft: 80, marginTop: -10 }} />
                        <Text style={{ marginTop: -5, marginLeft: 10, fontSize: 9, fontWeight: "bold" }}>BOOK NOW</Text>
                    </ScrollView>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={{ marginTop: 60, width: 140, height: 250, marginLeft: 150 }}>
                    <ScrollView style={{ backgroundColor: "white", borderRadius: 20 }}>
                        <Text style={{ fontSize: 30, marginTop: 30, marginLeft: 10 }}>{this.state.GameDate1.substring(8, 10)}</Text>
                        <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 14 }}>{this.state.GameDate1.substring(5, 7)}</Text>
                        <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >{this.state.DaysLeft} DAYS</Text>
                        <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                        <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20 }}>{this.state.LeaguesName}  LEAGUE</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20 }}>{this.state.GameCity1}</Text>
                    </ScrollView>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={{ backgroundColor: "red", width: 100, height: 50, marginLeft: 172, marginTop: -25 }}>
                    <ScrollView style={{ backgroundColor: "#62F622", width: 100, height: 50 }}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 15 }}>{this.state.GamePrice1}$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Image source={Arrow} style={{ marginLeft: 80, marginTop: -10 }} />
                        <Text style={{ marginTop: -5, marginLeft: 10, fontSize: 9, fontWeight: "bold" }}>BOOK NOW</Text>
                    </ScrollView>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={{ marginTop: -275, width: 140, height: 250, marginLeft: 310 }}>
                    <ScrollView style={{ backgroundColor: "white", borderRadius: 20 }}>
                        <Text style={{ fontSize: 30, marginTop: 30, marginLeft: 10 }}>{this.state.GameDate2.substring(8, 10)}</Text>
                        <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 14 }}>{this.state.GameDate2.substring(5, 7)}</Text>
                        <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >{this.state.DaysLeft} DAYS</Text>
                        <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                        <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20 }}>{this.state.LeaguesName}  LEAGUE</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20 }}>{this.state.GameCity2}</Text>
                    </ScrollView>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={{ backgroundColor: "red", width: 100, height: 50, marginLeft: 330, marginTop: -25 }}>
                    <ScrollView style={{ backgroundColor: "#62F622", width: 100, height: 50 }}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 15 }}>{this.state.GamePrice2}$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Image source={Arrow} style={{ marginLeft: 80, marginTop: -10 }} />
                        <Text style={{ marginTop: -5, marginLeft: 10, fontSize: 9, fontWeight: "bold" }}>BOOK NOW</Text>
                    </ScrollView>
                </TouchableOpacity> */}
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
