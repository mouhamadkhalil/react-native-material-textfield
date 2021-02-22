import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    TouchableHighlight,
    ActivityIndicator
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Lightbox from 'react-native-lightbox-v2';
import moment from 'moment';
import Chat from "../FanChat/chat";
import R from "res/R";
import { get, servicesUrl } from "../../helpers/services.js";
import { HeaderBackground } from "../Common/HeaderBackground";
import { MatchHeader } from "../Trips/MatchHeader";
import { translate } from "../../helpers/utils";

export default class TripOverViewScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            gameCode: this.props?.route?.params?.gameCode,
            idHotel: -1,
            details: {},
            game: {},
            hotel: {},
            seating: {},
            perks: {},
            data: {},
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
        const params = `?customize=false&validateHotelPrice=false&hotelId=${this.state.idHotel}&hotelSource=R`;
        get(servicesUrl.getGameV2 + this.state.gameCode + params)
            .then((response) => {
                var game = response.MatchBundleDetail[0].Game;
                var hotel = response.SelectedHotel;
                hotel.Stars = new Array(parseInt(hotel.Rating)).fill(1);

                // test
                var selected = hotel.SelectedCategory;
                console.log(selected);

                var seating = response.MatchBundleDetail[0].GameSeat;
                var perks = {
                    OnSpot: response.Service_OnSpot,
                    AirPortPickup: response.Service_AirPortPickup,
                    AirPortDropOff: response.Service_AirPortDropOff,
                    StadiumTour: response.Service_StadiumTour,
                    CityTour: response.Service_CityTour,
                    Train: response.Service_Train,
                    Insurance: response.Service_Insurance,
                }
                var details = {
                    idMatchBundle: response.idMatchBundle,
                    BundleCode: response.BundleCode,
                    StartDate: response.StartDate,
                    EndDate: response.EndDate,
                    TripDays: this.getTripDays(response.StartDate, response.EndDate),
                    NumberOfTravelers: response.NumberOfTravelers,
                    BasePricePerFan: response.BasePricePerFan,
                    PricePerFan: response.PricePerFan,
                    ExtraFeesPerFan: response.ExtraFeesPerFan,
                    FinalPrice: response.FinalPrice,
                    FinalPricePerFan: response.FinalPricePerFan,
                    NumberOfRooms: response.NumberOfRooms,
                    SharingRoomNote: response.SharingRoomNote,
                }
                this.setState({ data: response, game, hotel, seating, perks, details, isLoading: false })
            });
    }

    Customize = () => {
        this.props.navigation.navigate('customize', { gameCode: this.state.game.GameCode });
    };

    Flight = () => {
        this.props.navigation.navigate('flight', { gameCode: this.state.game.GameCode });
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('tripOverview')} image={R.images.trip_bg}></HeaderBackground>

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} game={this.state.game} details={this.state.details} perks={this.state.perks} />

                {/* package details */}
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                    {translate('semiPackageDetails')}
                </Text>
                <View>
                    {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginStart: 15 }} />
                        :
                        <>
                            <View style={{ marginStart: 15, marginEnd: 15, backgroundColor: "white", marginTop: 30 }}>
                                {/* trip dates */}
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15, textTransform: 'uppercase' }}>
                                        {translate('tripDates')}
                                    </Text>
                                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                                        {moment(this.state.details.StartDate).format('DD.MM.YY')} - {moment(this.state.details.EndDate).format('DD.MM.YY')}
                                    </Text>
                                </View>

                                {/* fans */}
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15, textTransform: 'uppercase' }}>
                                        {translate('fans')}
                                    </Text>
                                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                                        {this.state.details.NumberOfTravelers}
                                    </Text>
                                </View>

                                {/* hotel */}
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15, textTransform: 'uppercase' }}>
                                        {translate('hotel')}
                                    </Text>
                                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold", maxWidth: 200 }}>
                                        {this.state.hotel.HotelName}
                                    </Text>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        {this.state.hotel.Stars.map(star => {
                                            return (
                                                <Icon name='star-outline' style={R.styles.starStyle} />
                                            );
                                        })}
                                    </View>
                                    <Text style={{ color: "gray", marginTop: 30, fontSize: 16 }}>
                                        {this.state.hotel.SelectedCategory.RoomType[0].TypeName + " x " + this.state.hotel.SelectedCategory.RoomType[0].NumRooms}
                                    </Text>

                                    <Lightbox >
                                        <Image source={{ uri: this.state.hotel.Image }}
                                            style={{ width: "100%", height: 250, marginTop: 20 }} />
                                    </Lightbox>

                                </View>

                                {/* seating options */}
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>
                                        {translate('seatingOptions')}
                                    </Text>
                                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                                        {this.state.seating.SeatCode}
                                    </Text>
                                    <Text style={{ color: "gray", fontSize: 16 }}>
                                        {this.state.game.Stade}, {this.state.game.StadeCity}
                                    </Text>
                                    <Text style={{ color: "gray", fontSize: 16 }}>
                                        {this.state.seating.InventoryTickets[0].qa + " " + translate('seats')}
                                    </Text>
                                    <Image source={{ uri: this.state.seating.StadiumMap_IMG_v3 }}
                                        style={{ width: "100%", height: 230, marginTop: 30 }} />
                                </View>

                                {/* perks */}
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

                            {/* buttons */}
                            <View style={{ width: '90%', alignSelf: 'center', flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
                                <TouchableHighlight style={{ width: "50%", height: 60, backgroundColor: R.colors.blue, alignItems: "center", justifyContent: "center" }} onPress={this.Customize}>
                                    <Text style={{ fontWeight: "bold", color: "#fff" }}>CUSTOMIZE</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={{ width: "50%", height: 60, backgroundColor: R.colors.greenLight, alignItems: "center", justifyContent: "center" }} onPress={this.Flight}>
                                    <Text style={{ fontWeight: "bold" }}>SELECT FLIGHT</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{ martinStart: 50, marginTop: -40 }}>
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
        borderWidth: 0.5,
        height: 20,
        width: 20,
    },
    perksRow: { flexDirection: "row", justifyContent: "space-between" },
    perkImage: { width: 42, height: 44 },
    perk: { width: "50%", alignItems: "center", height: 100 },
    perkLabel: { fontSize: 13, marginTop: 15 }
});
