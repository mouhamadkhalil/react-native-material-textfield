import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    TouchableOpacity,
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import ImgAllGames from "../../assets/images/all-games.jpg";
import ImgArrowDown from "../../assets/Images_Design/arrow_down.png";
import ImgFlag from "../../assets/Images_Design/flag1.png";
import ImgShare from "../../assets/Images_Design/share.png";
import ImgArrowRight from "../../assets/Images_Design/arrow_right2.png";
import ImgCalendar from "../../assets/Images_Design/calendar-grey.png";
import ImgList from "../../assets/Images_Design/list-grey-icon.png";
import DropDownPicker from "react-native-dropdown-picker";
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';

const sourceFile = require('../../services.js');

export default class AllGames extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            orderBy: "date",
            allGames: []
        };
        this.getAllGames();
    }

    getAllGames = () => {
        const url = `${API_URL}/mobile/game/getall?pageNumber=1&pageSize=10&order=date`;
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
                var data = response.Items.map(function (item) {
                    var game = item.MatchBundleDetail[0].Game;
                    return {
                        idMatch: game.idMatch,
                        City: game.City,
                        Stade: game.Stade,
                        GameDate: game.GameDate,
                        LeagueName: game.LeagueName,
                        GameCode: game.GameCode,
                        HomeTeam: game.HomeTeam,
                        AwayTeam: game.AwayTeam,
                        StadeCity: game.StadeCity,
                        Team1Color1: game.Team1Color1,
                        Team1Color2: game.Team1Color2,
                        Team2Color1: game.Team2Color1,
                        Team2Color2: game.Team2Color2
                    };
                });
                this.setState({ allGames: data });
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
                this.setState({ GameDate1: response.Items[0].MatchBundleDetail[0].Game.GameDate });
                this.setState({ GameDate2: response.Items[1].MatchBundleDetail[0].Game.GameDate });
                this.setState({ GameCity1: response.Items[0].MatchBundleDetail[0].Game.City });
                this.setState({ GameCity2: response.Items[1].MatchBundleDetail[0].Game.City });
                this.setState({ LeaguesName: response.Items[0].MatchBundleDetail[0].Game.League });
                this.setState({ DaysLeft: response.Items[0].MatchBundleDetail[0].GameSeat.Sequence });
                this.setState({ GamePrice1: response.Items[0].MatchBundleDetail[0].GameSeats[0].ExtraCostPerFan });
                this.setState({ GamePrice2: response.Items[0].MatchBundleDetail[0].GameSeats[0].ExtraCost });
            });
    };

    _renderItem1({ item, index, state }) {
        return (
            <TouchableOpacity style={{ marginTop: 60, width: 140, height: 250, marginLeft: 150 }}>
                <ScrollView style={{ backgroundColor: "white", borderRadius: 20 }}>
                    <Text style={{ fontSize: 30, marginTop: 30, marginLeft: 10 }}>30</Text>
                    <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 12 }}>Dec</Text>
                    <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >4 DAYS</Text>
                    <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                    <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20 }}>PREMIERE LEAGUE</Text>
                    <Text style={{ marginLeft: 55, marginTop: 20 }}>LONDON</Text>
                </ScrollView>
                <TouchableOpacity style={{ backgroundColor: "red", width: 100, height: 50, marginLeft: 20, marginTop: -25 }}>
                    <ScrollView style={{ backgroundColor: "#62F622", width: 100, height: 50 }}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 15 }}>730$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Image source={Arrow} style={{ marginLeft: 80, marginTop: -10 }} />
                        <Text style={{ marginTop: -5, marginLeft: 10, fontSize: 9, fontWeight: "bold" }}>BOOK NOW</Text>
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    _renderItem2({ item, index }) {
        return (
            <>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "white", marginTop: 30, width: 295, height: 250, marginLeft: 150, borderRadius: 20 }}>
                        <Text style={{ fontSize: 30, marginTop: 60, marginLeft: 10 }}>30</Text>
                        <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 10 }}>Dec</Text>
                        <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 10 }} >4 DAYS</Text>
                        <Text style={{ marginLeft: 55, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                        <Text style={{ marginLeft: 55 }} >FULHAN</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20, fontSize: 10 }}>PREMIERE LEAGUE</Text>
                        <Text style={{ marginLeft: 55, marginTop: 20 }}>MUNICH</Text>
                        <Text style={{ fontSize: 30, marginTop: -125, marginLeft: 170 }}>21</Text>
                        <Text style={{ fontSize: 20, marginTop: -5, marginLeft: 170 }}>Jan</Text>
                        <Text style={{ fontSize: 12, marginTop: 20, marginLeft: 170 }} >4 DAYS</Text>
                        <Text style={{ marginLeft: 210, marginTop: -85, fontSize: 13 }}>TOTTENHAM</Text>
                        <Text style={{ marginLeft: 210 }} >FULHAN</Text>
                        <Text style={{ marginLeft: 210, marginTop: 20, fontSize: 10, width: 200 }}>PREMIERE LEAGUE</Text>
                        <Text style={{ marginLeft: 210, marginTop: 20 }}>USA</Text>
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
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* <TextInput
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
                */}
                <Image source={Game} style={{ height: 200 }} />
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
                {/* carousel 1 */}
                <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: 0, marginRight: 40 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <Carousel
                            style={{ marginLeft: 50 }}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.carouselItems}
                            sliderWidth={170}
                            itemWidth={290}
                            // autoplay={true}
                            renderItem={this._renderItem1}
                            onSnapToItem={index => this.setState({ activeIndex: index })} />
                    </View>
                </SafeAreaView>
                {/* carousal 2 */}
                <SafeAreaView style={{ flex: 1, paddingTop: 50, marginTop: 0, marginLeft: 0, paddingRight: 34 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <Carousel
                            style={{ marginLeft: 0 }}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.carouselItems}
                            sliderWidth={170}
                            itemWidth={290}
                            autoplay={true}
                            renderItem={this._renderItem2}
                            onSnapToItem={index => this.setState({ activeIndex: index })} />
                    </View>
                </SafeAreaView>
                {/* carousel 1 */}
                <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: 0, marginRight: 40 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <Carousel
                            style={{ marginLeft: 50 }}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.carouselItems}
                            sliderWidth={170}
                            itemWidth={290}
                            // autoplay={true}
                            renderItem={this._renderItem1}
                            onSnapToItem={index => this.setState({ activeIndex: index })} />
                    </View>
                </SafeAreaView>
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
        marginBottom: 30,
        backgroundColor: "#EEEEEE",
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 20,
        width: 20,
    },
});
