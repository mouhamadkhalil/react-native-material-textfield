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
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Lightbox from 'react-native-lightbox-v2';
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
                    this.setState({ idMatch2: this.state.hotGameSelection[0].idMatch });
                    this.setState({ GameDate: this.state.hotGameSelection[0].GameDate.split("T13:00:00") });
                    this.setState({ HomeTeam: this.state.hotGameSelection[0].HomeTeam });
                    this.setState({ AwayTeam: this.state.hotGameSelection[0].AwayTeam });
                    this.setState({ StadeCity: this.state.hotGameSelection[0].StadeCity });
                    this.setState({ tripDays: this.state.hotGameSelection[0].TripDays });
                    this.setState({ pricePerFan: this.state.hotGameSelection[0].PricePerFan });
                    this.setState({ StartDate: response.Deals[0].StartDate.split("T00:00:00") });
                    this.setState({ EndDate: response.Deals[0].EndDate.split("T00:00:00") });
                    this.setState({ HotelName: response.Deals[0].HotelName });
                    this.setState({ NumberOfFans: '0' + response.Deals[0].NumberOfTravelers });
                    this.setState({ SeatingCategory: response.Deals[0].MatchBundleDetail[0].GameSeat.SeatCode });
                    this.setState({ Stade: response.Deals[0].MatchBundleDetail[0].Game.Stade });
                    this.setState({ Seats: response.Deals[0].MatchBundleDetail[0].GameSeat.Sequence });
                    this.setState({ RoomType: response.GamesList.Items[0].HotelRoomType });
                    this.setState({ HotelImage: response.GamesList.Items[0].Image });
                    this.setState({ StadiumImage: response.GamesList.Items[0].MatchBundleDetail[0].GameSeats[0].StadiumMap_IMG_v3 });
                    this.setState({ ExtraFeesPerFan: response.Deals[0].ExtraFeesPerFan });
                    this.setState({ isDone: true });
                }
                else
                    if (this.state.idMatch1 === this.state.hotGameSelection[1].idMatch) {
                        this.setState({ idMatch2: this.state.hotGameSelection[1].idMatch });
                        this.setState({ GameDate: this.state.hotGameSelection[1].GameDate.split("T19:00:00") });
                        this.setState({ HomeTeam: this.state.hotGameSelection[1].HomeTeam });
                        this.setState({ AwayTeam: this.state.hotGameSelection[1].AwayTeam });
                        this.setState({ StadeCity: this.state.hotGameSelection[1].StadeCity });
                        this.setState({ tripDays: this.state.hotGameSelection[1].TripDays });
                        this.setState({ pricePerFan: this.state.hotGameSelection[1].PricePerFan });
                        this.setState({ StartDate: response.Deals[1].StartDate.split("T00:00:00") });
                        this.setState({ EndDate: response.Deals[1].EndDate.split("T00:00:00") });
                        this.setState({ HotelName: response.Deals[1].HotelName });
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
                <View>
                    <Image source={R.images.all_games_bg} style={{ width: '100%' }} />
                    <View style={{ position: 'absolute', marginLeft: 210, marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }} >Trip Overview</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: "white", width: 310, height: 80, marginLeft: 140, marginTop: -40 }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 10, marginTop: 15, fontSize: 9 }}>DATE</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 60, marginTop: -12, fontSize: 9 }}>MATCH</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 150, marginTop: -12, fontSize: 9 }}>CITY</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 180, marginTop: -12, fontSize: 9 }}>DAYS</Text>
                    <Text style={{ color: "#8CD222", fontWeight: "bold", marginLeft: 250, marginTop: -12, fontSize: 9 }}>{this.state.pricePerFan}$/fan</Text>
                    <Text style={{ fontSize: 9, marginLeft: 10, fontWeight: "bold", marginTop: 18, color: "blue" }}>{this.state.GameDate}</Text>
                    <Text style={{ fontSize: 9, marginLeft: 60, fontWeight: "bold", marginTop: -12, color: "blue" }}>{this.state.HomeTeam} vs {this.state.AwayTeam}</Text>
                    <Text style={{ fontSize: 9, marginLeft: 150, fontWeight: "bold", marginTop: -12, color: "blue" }}>{this.state.StadeCity}</Text>
                    <Text style={{ fontSize: 9, marginLeft: 195, fontWeight: "bold", marginTop: -12, color: "blue" }}>{this.state.tripDays}</Text>
                   
                    <TouchableOpacity style={{ position: "absolute", right: 0, height: this.state.isButtonPressed ? 140 : 80, width: 100, padding: 10, backgroundColor: R.colors.greenLight, marginLeft: 10, zIndex: 1 }}
                        onPress={() => this.setState({ isButtonPressed: !this.state.isButtonPressed })}>
                        <Text style={{fontSize:9}}>{this.state.pricePerFan}$ / fan</Text>
                        <Image source={R.images.arrow_down} style={{ height: 14, width: 12, marginLeft: 65, marginTop: -12 }} />

                        <Text style={{fontSize:9}}>{this.state.pricePerFan * this.state.NumberOfFans + 2 * this.state.ExtraFeesPerFan}$ Total *</Text>

                      
                        <TouchableOpacity onPress={() => this.setState({ isButtonPressed: !this.state.isButtonPressed })} style={{ height: 50, width: 100, marginLeft: -10, marginRight: -10, padding: 10, backgroundColor: R.colors.green, display: this.state.isButtonPressed ? "flex" : "none", marginTop: 20 }}>
                            <Text style={{fontSize:7,color:"gray",fontWeight:"bold"}}>Base Price <Text style={{fontWeight:"bold", color:"gray",marginLeft:30}}>{this.state.pricePerFan}$ </Text></Text>
                            <Text style={{fontSize:7,color:"blue"}}>+ ON-SPOT SERVICE <Text style={{fontWeight:"bold", color:"blue",marginLeft:30}}>{this.state.ExtraFeesPerFan}$ </Text> </Text>
                            <Text style={{fontSize:7}}>Total/Fan <Text style={{fontWeight:"bold", color:"blue",marginLeft:30}}>{this.state.ExtraFeesPerFan + this.state.pricePerFan}$ </Text></Text>
                            <Text style={{fontSize:7}}>Total <Text style={{fontWeight:"bold", color:"blue",marginLeft:30}}>{this.state.pricePerFan * this.state.NumberOfFans + 2 * this.state.ExtraFeesPerFan}$ </Text></Text>
                            <Text style={{fontSize:7}}>*Price for 2 fans traveling together </Text>




                        </TouchableOpacity>
                    </TouchableOpacity>
                   
                   
                   
                    <Text style={{ fontSize: 9, marginLeft: 250, fontWeight: "bold", marginTop: -12, color: "blavk" }}></Text>
                </View>
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginLeft: 140, marginTop: 50 }}>
                    Semi-Package Details
                </Text>
                <View>
                    {!this.state.isDone ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginLeft: 120 }} />
                        :
                        <>
                            <View style={{ marginLeft: 140, backgroundColor: "white", width: 300, height: 550, marginTop: 30 }}>
                                <Text style={{ color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 30 }}>TRIP DATES</Text>
                                <Text style={{ fontSize: 12, marginTop: 10, paddingLeft: 30, color: "blue", fontWeight: "bold" }}>
                                    {this.state.StartDate} - {this.state.EndDate}
                                </Text>
                                <Text style={{ color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 30 }}>FANS</Text>
                                <Text style={{ fontSize: 12, marginTop: 10, paddingLeft: 30, color: "blue", fontWeight: "bold" }}>
                                    {this.state.NumberOfFans}
                                </Text>
                                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 15 }}>HOTEL</Text>
                                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 170, marginTop: -17 }}>SEATING OPTIONS </Text>
                                <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 30, marginTop: 10, width: 130, fontSize: 11 }}>{this.state.HotelName}</Text>
                                <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 170, marginTop: -30 }}>{this.state.SeatingCategory}</Text>
                                <Text style={{ color: "gray", marginLeft: 60, marginTop: 30, fontSize: 12 }}>{this.state.RoomType} x1 </Text>
                                <Text style={{ color: "gray", marginLeft: 170, marginTop: -18, fontSize: 12 }}>{this.state.Stade}, {this.state.StadeCity}</Text>
                                <Text style={{ color: "gray", marginLeft: 170, marginTop: 5, fontSize: 12 }}>{this.state.Seats} Seats </Text>
                                <TouchableOpacity>
                                    {this.state.isDone ?
                                        <Lightbox >
                                            <Image source={this.state.HotelImage ? { uri: this.state.HotelImage } : null}
                                                style={{ width: 120, height: 120, marginLeft: 30, marginTop: 20 }} />
                                        </Lightbox>
                                        :
                                        <ActivityIndicator size="small" color="blue"
                                            style={{ marginTop: 80, marginLeft: -60 }}
                                        />}
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    {this.state.isDone ?
                                        <Lightbox >
                                            <Image source={this.state.StadiumImage ? { uri: this.state.StadiumImage } : null}
                                                style={{ width: 120, height: 120, marginLeft: 170, marginTop: -120 }} />
                                        </Lightbox>
                                        :
                                        <ActivityIndicator size="small" color="blue"
                                            style={{ marginTop: 80, marginLeft: 0 }}
                                        />}
                                </TouchableOpacity>
                                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 35 }}>PERKS</Text>
                                <Image source={R.images.onspot} style={{ marginLeft: 20, marginTop: 10 }} />
                                <Image source={R.images.hotel} style={{ marginLeft: 70, marginTop: -42 }} />
                                <Image source={R.images.car} style={{ marginLeft: 130, marginTop: -42 }} />
                                <Image source={R.images.stadium} style={{ marginLeft: 190, marginTop: -41 }} />
                                <Image source={R.images.insurance} style={{ marginLeft: 250, marginTop: -41 }} />
                                <Text style={{ marginLeft: 30, color: "blue", fontWeight: "bold", width: 50, fontSize: 9 }}>On Spot Service</Text>
                                <Text style={{ marginLeft: 80, color: "blue", fontWeight: "bold", width: 50, fontSize: 9, marginTop: -23 }}>Airport Pick up </Text>
                                <Text style={{ marginLeft: 135, color: "blue", fontWeight: "bold", width: 50, fontSize: 9, marginTop: -23 }}>Airport Drop off</Text>
                                <Text style={{ marginLeft: 195, color: "blue", fontWeight: "bold", width: 50, fontSize: 9, marginTop: -23 }}>Stadium Tour</Text>
                                <Text style={{ marginLeft: 260, color: "blue", fontWeight: "bold", width: 50, fontSize: 9, marginTop: -23 }}>
                                    Travel Insurance</Text>
                            </View>
                            <View style={{ marginBottom: 50 }}></View>
                            <View style={{ width: 130, marginLeft: 160, marginTop: -20 }}>
                                <Button
                                    title="CUSTOMIZE"
                                    color="blue"
                                    onPress={this.Customize}
                                />
                            </View>
                            <View style={{ width: 130, marginLeft: 310, marginTop: -34 }}>
                                <Button
                                    title="SELECT FLIGHT"
                                    color="#8CD222"
                                    onPress={this.Flight}
                                />
                            </View>
                            <View style={{ marginLeft: 100, marginTop: 20 }}>
                                <Chat />
                            </View>
                        </>
                    }
                </View>
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
    pageTitleText: {
        marginTop: -30,
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 90
    },
    headerBg: {
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
});
