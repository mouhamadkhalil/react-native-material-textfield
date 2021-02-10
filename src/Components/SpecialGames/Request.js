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
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from 'react-native-datepicker';
import RadioButtonRN from 'radio-buttons-react-native';
import Chat from "../FanChat/chat";
import R from "res/R";
import { get, post } from "../../helpers/services.js";


const sourceFile = require('../../helpers/services.js');
const data = [
    {
        label: 'Doesnt matter, at least Iam there!'
    },
    {
        label: 'I want a good view of the game'
    },
    {
        label: 'I want to be close to the players'
    },
    {
        label: 'Once in a lifetime! Give me the best '
    },
];

export default class Request extends React.Component {

    state = {
        isDone: false,
        date: "2016-05-15",
        fanNumber: 2,
        suggestedGames: [],
        MultiDetails: [],
        OfferContacts: [],
        StartDate: "",
        EndDate: ""
    };

    componentDidMount() {
        try {
            this.GetHomePageDataMobile();
            this.getSuggestedGames();
        } catch { }
    }

    GetHomePageDataMobile = () => {
        const _this = this;
        get(`/mobile/game/GetHomePageDataMobile`)
            .then(response => {
                // console.log("my UpComingInvoices are :", response.UpComingInvoices)

            });
    }

    getSuggestedGames = () => {
        const _this = this;
        get(`/mobile/game/getSuggestedGames`)
            .then(response => {
                var data = response.map(function (item) {
                    return {
                        AdditionalMessage: item.AdditionalMessage,
                        AwayTeam: item.AwayTeam,
                        City: item.City,
                        GameCode: item.GameCode,
                        GameDate: item.GameDate,
                        HomeTeam: item.HomeTeam,
                        League: item.League,
                        LeagueName: item.LeagueName,
                        Stade: item.Stade,
                        StadeCity: item.StadeCity,
                        idMatch: item.idMatch
                    };
                });
                this.setState({ suggestedGames: data });
            });
    }

    SendRequest = () => {
        const _this = this;
        const data = {
            StartDate: this.state.StartDate,
            EndDate: this.state.EndDate,
            NumberOfTravelers: this.state.MultiDetails.NumberOfTravelers,
            HotelStars: this.state.MultiDetails.HotelStars,
            matchCategoryCode: this.state.MultiDetails.matchCategoryCode,
            AdditionalMessage: this.state.MultiDetails.AdditionalMessage,
            idDepartureCity: this.state.MultiDetails.idDepartureCity,
            budget: this.state.MultiDetails.budget,
        }

        post(`/mobile/game/saveBundleMulti`, data)
            .then(response => {
                var dataBundle = {
                    StartDate: response.StartDate,
                    EndDate: response.EndDate,
                    NumberOfTravelers: response.NumberOfTravelers,
                    HotelStars: response.HotelStars,
                    matchCategoryCode: response.matchCategoryCode,
                    AdditionalMessage: response.AdditionalMessage,
                    idDepartureCity: response.idDepartureCity,
                    budget: response.budget,
                };
                this.setState({ MultiDetails: dataBundle });

                // var dataContacts = response.OfferContacts.map(function (item) {
                //     return {
                //         Title: item.Title,
                //         FirstName: item.FirstName,
                //         LastName: item.LastName,
                //         Email: item.Email,
                //         Phone: item.Phone,
                //     };
                // });
                // this.setState({ OfferContacts: dataContacts });
                console.log("dataBundle", this.state.MultiDetails)
            });
    }

    IncrementFan = () => {
        this.setState({ fanNumber: this.state.fanNumber + 1 });
    };

    DecrementFan = () => {
        this.setState({ fanNumber: this.state.fanNumber - 1 });
    };

    searchGame = () => {
        const _this = this;
        get(`/mobile/game/search?text=${this.state.searchText}`)
            .then((response) => {
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
        const _this = this;
        get(`/mobile/game/getall?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}&idTeam=${this.state.idTeam}&order=${this.state.orderBy}`)
            .then((response) => {
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

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <ScrollView style={styles.container}>
                <Image source={R.images.football_bg} style={{ height: 200 }} />
                <ScrollView style={{ backgroundColor: "white", width: 310, height: 80, marginLeft: 140, marginTop: -40 }}>
                    <Text style={{ fontSize: 10, marginLeft: 10, fontWeight: "bold", marginTop: 30 }}>CHELSEA VS WOLVE</Text>
                    <Text style={{ fontSize: 10, marginLeft: 120, fontWeight: "bold", marginTop: -13 }}>Premiere league</Text>
                    <Text style={{ fontSize: 10, marginLeft: 210, fontWeight: "bold", marginTop: -13 }}>London</Text>
                    <Text style={{ fontSize: 10, marginLeft: 260, fontWeight: "bold", marginTop: -13 }}>27 Jan</Text>
                </ScrollView>
                <Text style={{ color: "black", fontWeight: "bold", marginLeft: 140, marginTop: 50 }}>Travel details </Text>
                <ScrollView style={{ backgroundColor: "white", width: 310, height: 500, marginLeft: 140, marginTop: 20 }}>

                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>TRIP DATES</Text>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>From</Text>

                    <DatePicker
                        style={{ width: 250, marginLeft: 30, marginTop: 20 }}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2050-06-01"
                        onDateChange={(startDate) => this.setState({ startDate })}
                        value={this.state.startDate}
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
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>To</Text>
                    <DatePicker
                        style={{ width: 250, marginLeft: 30, marginTop: 20 }}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2050-06-01"
                        confirmBtnText="Confirm"
                        onDateChange={(EndDate) => this.setState({ EndDate })}
                        value={this.state.EndDate}
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
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>FANS</Text>
                    <TouchableOpacity style={{ width: 20, marginLeft: 40 }} onPress={this.DecrementFan}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 0, marginTop: 11 }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 70, marginTop: -25 }}>{this.state.fanNumber}</Text>
                    <TouchableOpacity style={{ marginLeft: 105, marginTop: -25, width: 20 }} onPress={this.IncrementFan} >
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>+</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>BUDGET</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 20, marginTop: -49 }}></ScrollView>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>FLIGHT</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 20, marginTop: -49 }}></ScrollView>
                </ScrollView>
                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 140, marginTop: 50 }}>Hotel</Text>
                <ScrollView style={{ backgroundColor: "white", width: 310, height: 140, marginLeft: 140, marginTop: 30 }}>
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: 30, marginLeft: 20 }} />
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 40 }} />
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 60 }} />
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 80 }} />
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 100 }} />
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: 20, marginLeft: 20 }} />
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 40 }} />
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 60 }} />
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 80 }} />
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: 20, marginLeft: 20 }} />
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 40 }} />
                    <Image source={R.images.star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 60 }} />
                </ScrollView>
                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 140, marginTop: 50 }}>Stadium</Text>
                <ScrollView style={{ backgroundColor: "white", width: 310, height: 263, marginLeft: 140, marginTop: 30 }}>
                    <RadioButtonRN
                        data={data}
                        selectedBtn={(e) => console.log(e)}
                        style={{ marginTop: -10 }}
                    />
                </ScrollView>
                <Text style={{ marginLeft: 140, color: "black", fontWeight: "bold", marginTop: 50 }}>Your Contact Details</Text>
                <ScrollView style={{ backgroundColor: "white", width: 310, height: 430, marginLeft: 140, marginTop: 20 }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>TITLE*</Text>
                    <DropDownPicker
                        items={[
                            { label: "Mr.", value: "Mr.", hidden: true },
                            { label: "Ms.", value: "Ms." },
                        ]}
                        defaultValue={this.state.country}
                        containerStyle={{ height: 50 }}
                        style={{ backgroundColor: "#fafafa", width: 255, marginLeft: 30, marginTop: 10 }}
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
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -49 }}></ScrollView>

                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>SURNAME*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -49 }}></ScrollView>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>EMAIL*</Text>
                    <TextInput
                        autoCapitalize="none"
                        multiline={true}
                        numberOfLines={8}
                        type="emai"
                        keyboardType="email-address"
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -49 }}></ScrollView>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>PHONE NUMBER*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -49 }}></ScrollView>
                </ScrollView>
                <ScrollView style={{ backgroundColor: "white", width: 310, height: 150, marginLeft: 140, marginTop: 50 }}>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        placeholder="Please write the delivery address here ..."
                        style={{ fontSize: 12, marginTop: -20, paddingLeft: 20 }}
                    />
                </ScrollView>
                <ScrollView style={{ backgroundColor: "white", width: 170, height: 35, marginLeft: 280, marginTop: 30 }}>
                    <Button
                        onPress={this.SendRequest}
                        title="SEND REQUEST"
                        color="#8CD222"
                    />
                </ScrollView>
                <View style={{ marginTop: 40, marginLeft: 100 }}>
                    <Chat />

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
    },
});