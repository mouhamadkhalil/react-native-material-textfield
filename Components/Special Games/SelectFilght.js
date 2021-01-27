import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    Button,
    ScrollView,
    View,
    CheckBox,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Arrow1 from "../../assets/Images_Design/arrow_right1.png";
import Arrow2 from "../../assets/Images_Design/arrow_right2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/notification1.png";
import Chat from "../../assets/Images_Design/chat1.png";
import Lightbox from 'react-native-lightbox-v2';
import Game from "../../assets/images/football.jpg";
import Onspot from "../../assets/images/onspot.png";
import Car1 from "../../assets/images/car1.png";
import Stadium from "../../assets/images/stadium.png"
import Hotel from "../../assets/images/hotel3.png"
import Insurnace from "../../assets/images/insurnace.png"

const sourceFile = require('../../services.js');

export default class AnyDayHomeScreen extends React.Component {

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

    componentDidMount() {
        const url = `${API_URL}/mobile/game/GetHomePageData`;

        fetch(url, {
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
                this.setState({ isDone: true });
                console.log("test", response.GenericGames[0].MatchBundleHotels[0]);
                this.setState({ Picture1: response.GenericGames[0].MatchBundleHotels[0].Images[1] });
                this.setState({ Picture2: response.GenericGames[0].MatchBundleHotels[0].Images[2] });
                this.setState({ Picture3: response.GenericGames[0].MatchBundleHotels[0].Images[3] });
                this.setState({ Picture4: response.GenericGames[0].MatchBundleHotels[0].Images[4] });
            });
    }

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
                this.setState({ GameDate: response[0].GameDate });
                this.setState({ LeaguesName: response[0].LeaguesName });
                this.setState({ GameCode: response[0].GameCode });
                this.setState({ HomeTeam: response[0].HomeTeam });
                this.setState({ AwayTeam: response[0].AwayTeam });
                this.setState({ StadeCity: response[0].StadeCity });
            });
    };

    Customize = () => {
        this.props.navigation.navigate('customize');
    }

    Flight = () => {
        this.props.navigation.navigate('flight');
    }

    Back = () => {
        this.props.navigation.navigate('tripoverview');
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Image source={Game} style={{ height: 200 }} />
                <Text style={{ marginLeft: 140 }}>Trip Overview</Text>
                <View style={{ backgroundColor: "white", width: 310, height: 80, marginLeft: 140, marginTop: -40 }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 10, marginTop: 15, fontSize: 9 }}>DATE</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 60, marginTop: -12, fontSize: 9 }}>MATCH</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 150, marginTop: -12, fontSize: 9 }}>CITY</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 210, marginTop: -12, fontSize: 9 }}>DAYS</Text>
                    <Text style={{ color: "#8CD222", fontWeight: "bold", marginLeft: 250, marginTop: -12, fontSize: 9 }}>910$/fan</Text>
                    <Text style={{ fontSize: 9, marginLeft: 10, fontWeight: "bold", marginTop: 18, color: "blue" }}>13.06.21</Text>
                    <Text style={{ fontSize: 9, marginLeft: 60, fontWeight: "bold", marginTop: -12, color: "blue" }}>England vs Croatia</Text>
                    <Text style={{ fontSize: 9, marginLeft: 150, fontWeight: "bold", marginTop: -12, color: "blue" }}>Barcelona</Text>
                    <Text style={{ fontSize: 9, marginLeft: 210, fontWeight: "bold", marginTop: -12, color: "blue" }}>04</Text>
                    <Text style={{ fontSize: 9, marginLeft: 250, fontWeight: "bold", marginTop: -12, color: "blavk" }}>1912$ Total *</Text>
                </View>
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginLeft: 140, marginTop: 50 }}>
                    Flight Options
                </Text>
                <View style={{ marginLeft: 140, backgroundColor: "white", width: 300, height: 200, marginTop: 30 }}>
                    <Text style={{ color: "gray", marginTop: 20, marginLeft: 20, fontWeight: "bold" }}>TRIP DATES</Text>
                    <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 20, marginTop: 10 }}>11.06.21 - 14.06.21</Text>

                    <Text style={{ color: "gray", marginTop: 20, marginLeft: 20, fontWeight: "bold" }}>FLYING FROM</Text>


                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />

                </View>
                <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 160, marginTop: -50 }}></ScrollView>


                <View style={{ marginBottom: 100 }}></View>
                <CheckBox
                    style={{ marginLeft: 135, marginTop: -40 }}
                    selected="true"
                />
                <Text style={{ marginLeft: 180, marginTop: -27 }}>I don't want flights</Text>

                <View style={{ width: 130, marginLeft: 160, marginTop: 20 }}>
                    <Button
                        title="BACK"
                        color="black"
                        onPress={this.Back}
                    />
                </View>
                <View style={{ width: 130, marginLeft: 310, marginTop: -34 }}>
                    <Button
                        title="CONTINUE"
                        color="gray"
                        onPress={this.Continue}
                    />
                </View>
                <View style={{ marginBottom: 50 }}></View>

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
