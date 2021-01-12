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
    Button,
    SafeAreaView
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

import Carousel from 'react-native-snap-carousel';
const sourceFile = require('../../services.js');

export default class App extends React.Component {

    state = {
        activeIndex: 0,
        carouselItems: [
            {
                title: "Item 1",
                text: "Text 1",
            },
            {
                title: "Item 2",
                text: "Text 2",
            },
            {
                title: "Item 3",
                text: "Text 3",
            },
            {
                title: "Item 4",
                text: "Text 4",
            },
            {
                title: "Item 5",
                text: "Text 5",
            },
        ],
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
    }


    componentDidMount = () => {
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




    _renderItem({ item, index }) {
        return (
            <>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "white", marginTop: 30, width: 295, height: 250, marginLeft: 150, borderRadius: 20 }}>
                        <Text style={{ fontSize: 30, marginTop: 60, marginLeft: 10 }}></Text>
                        <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 10 }}></Text>
                        <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} > DAYS</Text>
                        <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                        <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20, fontSize: 10 }}> LEAGUE</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20 }}></Text>
                        <Text style={{ fontSize: 30, marginTop: -125, marginLeft: 170 }}>rter</Text>
                        <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 170 }}>dsfsfs</Text>
                        <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 170 }} > DAYS</Text>
                        <Text style={{ marginLeft: 210, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                        <Text style={{ marginLeft: 210 }} >FULHAN</Text>
                        <Text style={{ marginLeft: 210, marginTop: 20, fontSize: 10, width: 200 }}>  LEAGUE</Text>
                        <Text style={{ marginLeft: 210, marginTop: 20 }}>usa</Text>
                    </ScrollView>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: "red", width: 100, height: 50, marginLeft: 250, marginTop: -25 }}>
                    <ScrollView style={{ backgroundColor: "#62F622", width: 100, height: 50 }}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 15 }}>230 $<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Image source={Arrow} style={{ marginLeft: 80, marginTop: -10 }} />
                        <Text style={{ marginTop: -5, marginLeft: 10, fontSize: 9, fontWeight: "bold" }}>BOOK NOW</Text>
                    </ScrollView>
                </TouchableOpacity>
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, paddingTop: 50, marginTop: 0, marginLeft: 0,paddingRight:34 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                    <Carousel
                        style={{ marginLeft: 0 }}
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        sliderWidth={170}
                        itemWidth={290}
                        autoplay={true}
                        renderItem={this._renderItem}
                        onSnapToItem={index => this.setState({ activeIndex: index })} />
                </View>
            </SafeAreaView>
        );
    }
}