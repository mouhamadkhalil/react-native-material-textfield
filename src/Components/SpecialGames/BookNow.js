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
    ImageBackground,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Lightbox from 'react-native-lightbox-v2';
import DatePicker from 'react-native-datepicker';
import Chat from "../FanChat/chat";
import moment from 'moment';
import R from "res/R";;
import { get } from "../../helpers/services.js";

export default class BookNow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDone: false,
            searchText: "",
            idMatch: "",
            date: "2016-05-15",
            NumberOfTravelers: "",
            SpecialGameSelection: []
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
        console.log(this.props.route.params.idMatch)
        this.setState({ idMatch1: this.props.route.params.idMatch })
        const _this = this;
        get(`/mobile/game/GetHomePageDataMobile`)
            .then(response => {
                var SpecialGameSelection = response.SpecialGames.map(function (item) {
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
                        NumberOfTravelers: response.SpecialGames.Description
                    };
                });
                this.setState({ SpecialGameSelection: SpecialGameSelection });
                if (this.state.idMatch1 === this.state.SpecialGameSelection[1].idMatch) {
                    this.setState({ SpecialGameSelection: SpecialGameSelection });
                    this.setState({ HomeTeam: this.state.SpecialGameSelection[1].HomeTeam });
                    this.setState({ City: this.state.SpecialGameSelection[1].City });
                    this.setState({ AwayTeam: this.state.SpecialGameSelection[1].AwayTeam });
                    this.setState({ LeagueName: this.state.SpecialGameSelection[1].LeagueName });
                    this.setState({ TripDays: this.state.SpecialGameSelection[1].TripDays });
                    this.setState({ PricePerFan: response.SpecialGames[1].BasePricePerFan });
                    this.setState({ Stade: this.state.SpecialGameSelection[1].Stade });
                    this.setState({ NumberOfTravelers: response.SpecialGames[1].NumberOfTravelers });
                    this.setState({ SeatingCategory: response.SpecialGames[1].MatchBundleDetail[0].GameSeat.SeatCode });
                    this.setState({ hotelImage: response.SpecialGames[1].Image });
                    this.setState({ stadiumImage: response.SpecialGames[1].MatchBundleDetail[0].GameSeat.StadiumMap_IMG_v3 });
                    this.setState({ HotelName: response.SpecialGames[1].HotelName });
                    this.setState({ isDone: true });
                }
                else {
                    if (this.state.idMatch1 === this.state.SpecialGameSelection[0].idMatch) {
                        this.setState({ SpecialGameSelection: SpecialGameSelection });
                        this.setState({ HomeTeam: this.state.SpecialGameSelection[0].HomeTeam });
                        this.setState({ City: this.state.SpecialGameSelection[0].City });
                        this.setState({ AwayTeam: this.state.SpecialGameSelection[0].AwayTeam });
                        this.setState({ LeagueName: this.state.SpecialGameSelection[0].LeagueName });
                        this.setState({ TripDays: this.state.SpecialGameSelection[0].TripDays });
                        this.setState({ PricePerFan: response.SpecialGames[0].BasePricePerFan });
                        this.setState({ Stade: this.state.SpecialGameSelection[0].Stade });
                        this.setState({ NumberOfTravelers: response.SpecialGames[0].NumberOfTravelers });
                        this.setState({ SeatingCategory: response.SpecialGames[0].MatchBundleDetail[0].GameSeat.SeatCode });
                        this.setState({ hotelImage: response.SpecialGames[0].Image });
                        this.setState({ stadiumImage: response.SpecialGames[0].MatchBundleDetail[0].GameSeat.StadiumMap_IMG_v3 });
                        this.setState({ HotelName: response.SpecialGames[0].HotelName });
                        this.setState({ isDone: true });
                    }
                }
            }
            )
    }

    SendBooking = () => {
        const _this = this;
        const data = {
            NumberOfTravelers: this.state.NumberOfTravelers,
            budget: this.state.budget,
            HotelStars: this.state.HotelStars,
            Message: this.state.Message,
            "offerContacts": [
                {
                    Title: this.state.Title,
                    FirstName: this.state.FirstName,
                    LastName: this.state.LastName,
                    DateOfBirth: this.state.DateOfBirth,
                    Country: this.state.Country,
                    Phone: this.state.Phone,
                    Email: this.state.Email,
                }
            ],
        }
        if (this.state.Title === "" || this.state.FirstName === "" || this.state.LastName === "" || this.state.Phone === "" || this.state.Email === "" || this.state.DateOfBirth === "" || this.state.Country === "") {
            ToastAndroid.showWithGravity(
                'please fill out mendatory fields !',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        }

        else {
            //fetch the api for confirmation .....
        }
    }

    IncrementFan = () => {
        this.setState({ NumberOfTravelers: this.state.NumberOfTravelers + 1 });
    };

    DecrementFan = () => {
        this.setState({ NumberOfTravelers: this.state.NumberOfTravelers - 1 });
    };

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <ScrollView style={styles.container}>
                <ImageBackground source={R.images.gift_card} style={styles.headerBg}>
                    <Text style={styles.pageTitleText}>
                        Watch Blaugrana in Camp Nou
                    </Text>
                    <Text style={styles.pageText}>#FLYFOOTPROMISE</Text>
                </ImageBackground>
                <View style={{ backgroundColor: "white", width: 310, height: 80, marginLeft: 140, marginTop: -40 }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 10, marginTop: 15 }}>MATCH</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 140, marginTop: -18 }}>CITY</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 200, marginTop: -18 }}>DAYS</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 260, marginTop: -19 }}>PRICE</Text>
                    <Text style={{ fontSize: 7, marginLeft: 10, fontWeight: "bold", marginTop: 12 }}>{this.state.AwayTeam} vs {this.state.HomeTeam}</Text>
                    <Text style={{ fontSize: 9, marginLeft: 140, fontWeight: "bold", marginTop: -12 }}>{this.state.City}</Text>
                    <Text style={{ fontSize: 9, marginLeft: 200, fontWeight: "bold", marginTop: -12 }}>{this.state.TripDays}</Text>
                    <Text style={{ fontSize: 9, marginLeft: 260, fontWeight: "bold", marginTop: -12, color: "#8CD222" }}>{this.state.PricePerFan}$ Total *</Text>
                </View>
                <Text style={{ color: "black", fontWeight: "bold", marginLeft: 140, marginTop: 50 }}>Travel details </Text>
                {!this.state.isDone ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginLeft: 120 }} />
                    :
                    <>
                        <ScrollView style={{ backgroundColor: "white", width: 310, height: 100, marginLeft: 140, marginTop: 20 }}>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 15 }}>FANS</Text>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 170, marginTop: -16 }}>FLIGHT* </Text>
                            <TouchableOpacity style={{ width: 20, marginLeft: 40 }} onPress={this.DecrementFan}>
                                <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 0, marginTop: 11 }}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 100, marginTop: -31, width: 20 }} onPress={this.IncrementFan}>
                                <Text style={{ fontSize: 25, fontWeight: "bold" }}>+</Text>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: "bold", marginLeft: 70, marginTop: -28 }}>{this.state.NumberOfTravelers}</Text>
                            <TextInput
                                placeholder="Where are you departing from ?"
                                style={{ marginLeft: 170, fontSize: 9, marginTop: -22 }}></TextInput>
                            <ScrollView style={{ backgroundColor: "black", width: 130, height: 1, marginLeft: 170, marginTop: -5 }}></ScrollView>
                        </ScrollView>
                        <ScrollView style={{ backgroundColor: "white", width: 310, height: 430, marginLeft: 140, marginTop: 50 }}>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 15 }}>HOTEL</Text>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 170, marginTop: -17 }}>SEATING OPTIONS </Text>
                            <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 30, marginTop: 10, width: 150 }}>{this.state.HotelName}</Text>
                            <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 170, marginTop: -19 }}>{this.state.SeatingCategory}</Text>
                            <Text style={{ color: "gray", marginLeft: 60, marginTop: 30, fontSize: 12 }}>Breakfast </Text>
                            <Text style={{ color: "gray", marginLeft: 170, marginTop: -18, fontSize: 12 }}>{this.state.Stade} </Text>
                            <Text style={{ color: "gray", marginLeft: 170, marginTop: 5, fontSize: 12 }}>1 Seat </Text>
                            <TouchableOpacity>
                                {this.state.isDone ?
                                    <Lightbox >
                                        <Image source={this.state.hotelImage ? { uri: this.state.hotelImage } : null}
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
                                        <Image source={this.state.stadiumImage ? { uri: this.state.stadiumImage } : null}
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
                            <Text style={{ marginLeft: 260, color: "blue", fontWeight: "bold", width: 50, fontSize: 9, marginTop: -23 }}>Travel Insurance</Text>
                        </ScrollView>
                        <Text style={{ marginLeft: 140, color: "black", fontWeight: "bold", marginTop: 50 }}>Main Fan</Text>
                        <ScrollView style={{ backgroundColor: "white", width: 310, height: 670, marginLeft: 140, marginTop: 20 }}>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>TITLE*</Text>
                            <DropDownPicker
                                items={[
                                    { label: "Mr.", value: "Mr.", hidden: true },
                                    { label: "Ms.", value: "Ms." },
                                ]}
                                defaultValue={this.state.country}
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: "#fafafa", width: 150, marginLeft: 30, marginTop: 10 }}
                                itemStyle={{
                                    justifyContent: "flex-start",
                                }}
                                dropDownStyle={{ color: "gray", width: 150, marginLeft: 30 }}
                                onChangeItem={(item) =>
                                    this.setState({
                                        country: item.value,
                                    })
                                }
                            />
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>NAME*</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                            />
                            <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -38 }}></ScrollView>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>SURNAME*</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                            />
                            <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -38 }}></ScrollView>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>DATE OF BIRTH*</Text>
                            <DatePicker
                                style={{ width: 250, marginLeft: 30, marginTop: 20 }}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2050-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => { this.setState({ date: date }); }}
                            />
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>COUNTRY*</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                            />
                            <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -38 }}></ScrollView>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>EMAIL*</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                            />
                            <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -38 }}></ScrollView>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>PHONE NUMBER*</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                            />
                            <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -38 }}></ScrollView>
                        </ScrollView>
                        <ScrollView style={{ backgroundColor: "white", width: 310, height: 150, marginLeft: 140, marginTop: 50 }}>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                placeholder="Additional requests? Please write them here..."
                                style={{ fontSize: 12, marginTop: -20, paddingLeft: 20 }}
                            />
                        </ScrollView>
                        <ScrollView style={{ backgroundColor: "white", width: 170, height: 35, marginLeft: 280, marginTop: 30 }}>
                            <Button
                                onPress={this.SendBooking}
                                title="BOOK NOW"
                                color="#8CD222"
                            />
                        </ScrollView>
                        <View style={{ marginLeft: 100, marginTop: 20 }}>
                            <Chat />
                        </View>
                    </>
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1100,
        marginLeft: -110,
        width: 500,
        marginTop: -50,
        marginBottom: 0,
        backgroundColor: "#F5F7EC",
    },
    pageTitleText: {
        marginTop: 0,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 90
    },
    pageText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 90
    },
    headerBg: {
        height: 290,
        alignItems: "center",
        justifyContent: "center",
    },
});