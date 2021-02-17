import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    Button,
    ScrollView,
    View,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Lightbox from 'react-native-lightbox-v2';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import Chat from "../FanChat/chat";
import R from "res/R";
import { get } from "../../helpers/services.js";

export default class TripOverViewScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDone: false,
            hotGameSelection: [],
        };
    }

    componentDidMount() {
        try {
            this.getData();
        } catch { }
    }

    getTripDays(date1, date2) {
        if (!date1 || !date1)
            return 0;
        let firstDate = moment(date1);
        let secondDate = moment(date2);
        return secondDate.diff(firstDate, 'days') + 1;
    }

    getData = () => {
        const _this = this;
        this.setState({ idMatch1: this.props.route.params.idMatch })
        get(`/mobile/game/GetHomePageDataMobile`)
            .then((response) => {
                var hotGameSelection = response.Deals.map(function (item) {
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
                        Team1Color1: game.Team1Color1,
                        Team1Color2: game.Team1Color2,
                        Team2Color2: game.Team2Color1,
                        Team2Color2: game.Team2Color2,
                        StadeCity: game.StadeCity,
                        PriceCaption: item.PriceCaption,
                        BackGroundImage: item.BackGroundImage,
                        SharingRoomNote: item.SharingRoomNote,
                        TripDays: _this.getTripDays(item.StartDate, item.EndDate),
                        PricePerFan: item.PricePerFan
                    };
                });
                this.setState({ hotGameSelection: hotGameSelection });
                this.setState({ idMatch2: this.state.hotGameSelection[0].idMatch });
                if (this.state.idMatch1 === this.state.hotGameSelection[0].idMatch) {
                    console.log("here:", this.state.hotGameSelection, response.Deals[0]);
                    this.setState({
                        idMatch2: this.state.hotGameSelection[0].idMatch,
                        GameDate: this.state.hotGameSelection[0].GameDate.split("T")[0].split("-").reverse().join("."),
                        HomeTeam: this.state.hotGameSelection[0].HomeTeam,
                        AwayTeam: this.state.hotGameSelection[0].AwayTeam,
                        StadeCity: this.state.hotGameSelection[0].StadeCity,
                        tripDays: this.state.hotGameSelection[0].TripDays,
                        pricePerFan: this.state.hotGameSelection[0].PricePerFan,
                        StartDate: response.Deals[0].StartDate.split("T")[0].split("-").reverse().join("."),
                        EndDate: response.Deals[0].EndDate.split("T")[0].split("-").reverse().join("."),
                        HotelName: response.Deals[0].HotelName,
                        HotelStars: response.Deals[0].HotelStars,
                        NumberOfFans: '0' + response.Deals[0].NumberOfTravelers,
                        SeatingCategory: response.Deals[0].MatchBundleDetail[0].GameSeat.SeatCode,
                        Stade: response.Deals[0].MatchBundleDetail[0].Game.Stade,
                        Seats: response.Deals[0].MatchBundleDetail[0].GameSeat.Sequence,
                        RoomType: response.GamesList.Items[0].HotelRoomType,
                        HotelImage: response.GamesList.Items[0].Image,
                        StadiumImage: response.GamesList.Items[0].MatchBundleDetail[0].GameSeats[0].StadiumMap_IMG_v3,
                        ExtraFeesPerFan: response.Deals[0].ExtraFeesPerFan,
                        isDone: true,
                        perks: {
                            AirPortDropoff: response.Deals[0].Service_AirPortDropOff,
                            AirPortPickup: response.Deals[0].Service_AirPortPickup,
                            CityTour: response.Deals[0].Service_CityTour,
                            Insurance: response.Deals[0].Service_Insurance,
                            OnSpot: response.Deals[0].Service_OnSpot,
                            StadiumTour: response.Deals[0].Service_StadiumTour,
                            Train: response.Deals[0].Service_Train,
                        }
                    })
                }
                else
                    if (this.state.idMatch1 === this.state.hotGameSelection[1].idMatch) {
                        this.setState({ idMatch2: this.state.hotGameSelection[1].idMatch });
                        this.setState({ GameDate: this.state.hotGameSelection[1].GameDate.split("T")[0].split("-").reverse().join(".") });
                        this.setState({ HomeTeam: this.state.hotGameSelection[1].HomeTeam });
                        this.setState({ AwayTeam: this.state.hotGameSelection[1].AwayTeam });
                        this.setState({ StadeCity: this.state.hotGameSelection[1].StadeCity });
                        this.setState({ tripDays: this.state.hotGameSelection[1].TripDays });
                        this.setState({ pricePerFan: this.state.hotGameSelection[1].PricePerFan });
                        this.setState({ StartDate: response.Deals[1].StartDate.split("T")[0] });
                        this.setState({ EndDate: response.Deals[1].EndDate.split("T")[0] });
                        this.setState({ HotelName: response.Deals[1].HotelName });
                        this.setState({ HotelStars: response.Deals[1].HotelStars });
                        this.setState({ NumberOfFans: '0' + response.Deals[0].NumberOfTravelers });
                        this.setState({ SeatingCategory: response.Deals[0].MatchBundleDetail[0].GameSeat.SeatCode });
                        this.setState({ Stade: response.Deals[1].MatchBundleDetail[0].Game.Stade });
                        this.setState({ Seats: response.Deals[1].MatchBundleDetail[0].GameSeat.Sequence });
                        this.setState({ RoomType: response.GamesList.Items[0].HotelRoomType });
                        this.setState({ HotelImage: response.GamesList.Items[2].Image });
                        this.setState({ StadiumImage: response.GamesList.Items[0].MatchBundleDetail[0].GameSeats[0].StadiumMap_IMG_v3 });
                        this.setState({ ExtraFeesPerFan: response.Deals[1].ExtraFeesPerFan });
                        this.setState({ isDone: true });
                    }
            });
    }

    Customize = () => {
        this.props.navigation.navigate('customize');
    };

    Flight = () => {
        this.props.navigation.navigate('flight');
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: "#eee", marginTop: 0 }}>
                    <ImageBackground source={R.images.all_games_bg} style={styles.headerBg}>
                        <Text style={styles.pageTitleText}>Trip Overview</Text>
                    </ImageBackground>
                </View>
                <View style={{
                    backgroundColor: "white", height: this.state.isButtonPressed ? 425 : 250, marginStart: 15, marginEnd: 15, marginTop: -40, padding: 0, shadowColor: "#000",
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 1.2,
                    shadowRadius: 2,
                    elevation: 5,
                }}>
                    <View style={{ padding: 0 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: "50%", padding: 20 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <LinearGradient
                                        colors={[this.state.Team1Color1 || "blue", this.state.Team1Color2 || "green"]}
                                        style={styles.linearGradient}
                                        start={[0, 0]}
                                        end={[1, 0]}
                                        locations={[0.5, 0.5]}
                                    ></LinearGradient>
                                    <Text style={{ ...styles.blueText, marginStart: 10 }}>{this.state.HomeTeam}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <LinearGradient
                                        colors={[this.state.Team2Color1 || "blue", this.state.Team2Color2 || "green"]}
                                        style={styles.linearGradient}
                                        start={[0, 0]}
                                        end={[1, 0]}
                                        locations={[0.5, 0.5]}
                                    ></LinearGradient>
                                    <Text style={{ ...styles.blueText, marginStart: 10 }}>{this.state.AwayTeam}</Text>
                                </View>

                            </View>
                            <Text style={{ width: "50%", ...styles.blueText, padding: 20 }}>{this.state.GameDate}</Text>
                        </View>
                        <View style={{ flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#eee" }}>
                            <Text style={{ flexBasis: "50%", ...styles.darkText, padding: 20, borderRightWidth: 1, borderColor: "#eee" }}>{this.state.tripDays} DAYS</Text>
                            <Text style={{ flexBasis: "50%", ...styles.darkText, padding: 20, textTransform: "uppercase" }}>{this.state.StadeCity}</Text>
                        </View>
                    </View>

                    {/* <Text style={{ color: "#8CD222", fontWeight: "bold", marginStart: 250, marginTop: -12, fontSize: 9 }}>{this.state.pricePerFan}$/fan</Text> */}

                    <TouchableOpacity style={{ position: "absolute", width: "100%", top: 155, height: this.state.isButtonPressed ? 140 : 80, backgroundColor: "#fff", zIndex: 1 }}
                        onPress={() => this.setState({ isButtonPressed: !this.state.isButtonPressed })}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                            <View style={{}}>
                                <Text style={{ fontSize: 17.5, color: R.colors.green, fontWeight: "bold" }}>{this.state.pricePerFan}$ / fan</Text>
                                <Text style={{ fontSize: 14, marginTop: 5 }}>{this.state.pricePerFan * this.state.NumberOfFans + 2 * this.state.ExtraFeesPerFan}$ Total *</Text>
                            </View>
                            <Image source={R.images.arrow_down} style={{ height: 14, width: 12 }} />
                        </View>
                        <TouchableOpacity onPress={() => this.setState({ isButtonPressed: !this.state.isButtonPressed })} style={{
                            height: 170, width: "100%", backgroundColor: "#fff", display: this.state.isButtonPressed ? "flex" : "none", padding: 20, width: "100%",
                            zIndex: 2
                        }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 13, color: "#666" }}>Base Price</Text>
                                <Text style={{ fontSize: 13, fontWeight: "bold", color: "#666" }}>{this.state.pricePerFan}$ </Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 15 }}>
                                <Text style={{ fontSize: 11.5, color: R.colors.blue }}>+ ON-SPOT SERVICE</Text>
                                <Text style={{ fontSize: 11.5, fontWeight: "bold", color: R.colors.blue }}>{this.state.ExtraFeesPerFan}$ </Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 13, color: "#212121" }}>Total/Fan</Text>
                                <Text style={{ fontWeight: "bold", color: R.colors.green }}>{this.state.ExtraFeesPerFan + this.state.pricePerFan}$ </Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 16, color: "#212121" }}>Total</Text>
                                <Text style={{ fontWeight: "bold", color: R.colors.green }}>{this.state.pricePerFan * this.state.NumberOfFans + 2 * this.state.ExtraFeesPerFan}$ </Text>
                            </View>
                            <Text style={{ fontSize: 9, color: "#999", marginTop: 10, marginBottom: 10 }}>*Price for 2 fans traveling together </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                </View>
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                    Semi-Package Details
                </Text>
                <View>
                    {!this.state.isDone ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginStart: 15 }} />
                        :
                        <>
                            <View style={{ marginStart: 15, marginEnd: 15, backgroundColor: "white", marginTop: 30 }}>
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>TRIP DATES</Text>
                                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                                        {this.state.StartDate} - {this.state.EndDate}
                                    </Text>
                                </View>
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>FANS</Text>
                                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                                        {this.state.NumberOfFans}
                                    </Text>
                                </View>
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>HOTEL</Text>
                                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold", maxWidth: 200 }}>{this.state.HotelName}</Text>
                                    <Image style={{ marginTop: 10 }} source={this.state.HotelStars == 3 ? R.images.threestars : this.state.HotelStars == 4 ? R.images.fourstars : R.images.fivestars}></Image>
                                    <Text style={{ color: "gray", marginTop: 30, fontSize: 16 }}>{this.state.RoomType} x1 </Text>

                                    {this.state.isDone ?
                                        <Lightbox >
                                            <Image source={this.state.HotelImage ? { uri: this.state.HotelImage } : null}
                                                style={{ width: "100%", height: 250, marginTop: 20 }} />
                                        </Lightbox>
                                        :
                                        <ActivityIndicator size="small" color="blue"
                                            style={{ marginTop: 80, marginStart: -60 }}
                                        />}
                                </View>
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>SEATING OPTIONS </Text>
                                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>{this.state.SeatingCategory}</Text>
                                    <Text style={{ color: "gray", fontSize: 16 }}>{this.state.Stade}, {this.state.StadeCity}</Text>
                                    <Text style={{ color: "gray", fontSize: 16 }}>{this.state.Seats} Seats </Text>
                                    <Image source={this.state.StadiumImage ? { uri: this.state.StadiumImage } : null}
                                        style={{ width: "100%", height: 200, marginTop: 30 }} />
                                </View>
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>PERKS</Text>
                                    <View style={styles.perksRow}>
                                        <View style={styles.perk}>
                                            <Image source={this.state.perks.OnSpot ? R.images.onspot : R.images.onspotGrey} style={styles.perkImage} />
                                            <Text style={{ ...styles.perkLabel, color: this.state.perks.OnSpot ? R.colors.blue : "#ddd" }}>On Spot Service</Text>
                                        </View>
                                        <View style={styles.perk}>
                                            <Image source={this.state.perks.AirPortPickup ? R.images.car : R.images.carGrey} style={styles.perkImage} />
                                            <Text style={{ ...styles.perkLabel, color: this.state.perks.AirPortPickup ? R.colors.blue : "#ddd" }}>Airport Pick up</Text>
                                        </View>
                                    </View>
                                    <View style={styles.perksRow}>
                                        <View style={styles.perk}>
                                            <Image source={this.state.perks.AirPortDropOff ? R.images.car : R.images.carGrey} style={styles.perkImage} />
                                            <Text style={{ ...styles.perkLabel, color: this.state.perks.AirPortDropoff ? R.colors.blue : "#ddd" }}>Airport Drop off</Text>
                                        </View>
                                        <View style={styles.perk}>
                                            <Image source={this.state.perks.StadiumTour ? R.images.stadium : R.images.stadiumGrey} style={styles.perkImage} />
                                            <Text style={{ ...styles.perkLabel, color: this.state.perks.StadiumTour ? R.colors.blue : "#ddd" }}>Stadium Tour</Text>
                                        </View>
                                    </View>
                                    <View style={styles.perksRow}>
                                        <View style={styles.perk}>
                                            <Image source={this.state.perks.CityTour ? R.images.hotel : R.images.hotelGrey} style={styles.perkImage} />
                                            <Text style={{ ...styles.perkLabel, color: this.state.perks.CityTour ? R.colors.blue : "#ddd" }}>City Tour</Text>
                                        </View>
                                        <View style={styles.perk}>
                                            <Image source={this.state.perks.Insurance ? R.images.insurance : R.images.insuranceGrey} style={styles.perkImage} />
                                            <Text style={{ ...styles.perkLabel, color: this.state.perks.Insurance ? R.colors.blue : "#ddd" }}>Insurance</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginStart: 15, marginEnd: 15, marginTop: 30 }}>
                                <TouchableHighlight style={{ width: "50%", height: 60, backgroundColor: R.colors.blue, alignItems: "center", justifyContent: "center" }} onPress={this.Customize}>
                                    <Text style={{ fontWeight: "bold", color: "#fff" }}>CUSTOMIZE</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={{ width: "50%", height: 60, backgroundColor: R.colors.green, alignItems: "center", justifyContent: "center" }} onPress={this.Flight}>
                                    <Text style={{ fontWeight: "bold" }}>SELECT FLIGHT</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{ martinStart: 100, marginTop: 20 }}>
                                <Chat />
                            </View>
                        </>
                    }
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: "#eeeeee",
    },
    pageTitleBar: {
        backgroundColor: "black",
        height: 8,
        width: 30,
    },
    pageTitleText: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold",
    },
    headerBg: {
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    blueText: {
        fontWeight: "bold",
        color: R.colors.blue,
        fontSize: 17.5
    },
    darkText: {
        fontWeight: "normal",
        color: "#151b20",
        fontSize: 14
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 20,
        width: 20,
    },
    perksRow: { flexDirection: "row", justifyContent: "space-between" },
    perkImage: { width: 42, height: 44 },
    perk: { width: "50%", alignItems: "center", height: 100 },
    perkLabel: { fontSize: 13, marginTop: 15 }
});
