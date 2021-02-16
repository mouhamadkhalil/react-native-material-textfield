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
    ToastAndroid,
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from 'react-native-datepicker';
import RadioButtonRN from 'radio-buttons-react-native';
import Chat from "../FanChat/chat";
import moment from 'moment';
import R from "res/R";
import { get, post } from "../../helpers/services.js";

const data = [
    {
        label: 'Doesnt matter, at least Iam there!',
        value: 4
    },
    {
        label: 'I want a good view of the game',
        value: 3
    },
    {
        label: 'I want to be close to the players',
        value: 2
    },
    {
        label: 'Once in a lifetime! Give me the best ',
        value: 1
    },
];

const dataHotel = [
    {
        label: <Image source={R.images.fivestars} />,
        value: 5
    },
    {
        label: <Image source={R.images.fourstars} />,
        value: 4
    },
    {
        label: <Image source={R.images.threestars} />,
        value: 3
    },
];

export default class Request extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDone: false,
            dateFrom: "2016-05-15",
            dateTo: "2016-05-15",
            suggestedGames: [],
            MultiDetails: [],
            StartDate: "",
            EndDate: "",
            NumberOfTravelers: 2,
            HotelStars: "",
            matchCategoryCode: "",
            budget: "",
            Message: "",
            idDepartureCity: "",

            OfferContacts: [],
            Title: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Phone: "",



            hotGameSelection: [],
        };
    }

    componentDidMount() {
        try {
            this.GetHomePageDataMobile();
        } catch { }
    }

    getTripDays(date1, date2) {
        if (!date1 || !date1)
            return 0;
        let firstDate = moment(date1);
        let secondDate = moment(date2);
        return secondDate.diff(firstDate, 'days') + 1;
    }

    GetHomePageDataMobile = () => {
        const _this = this;
        get(`/mobile/game/GetHomePageDataMobile`)
            .then(response => {
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
                this.setState({ HomeTeam: this.state.hotGameSelection[2].HomeTeam });
                this.setState({ AwayTeam: this.state.hotGameSelection[2].AwayTeam });
                this.setState({ City: this.state.hotGameSelection[2].City });
                this.setState({ LeagueName: this.state.hotGameSelection[2].LeagueName });
                this.setState({ GameDate: this.state.hotGameSelection[2].GameDate.split("T00:00:00") });
                this.setState({ isDone: true });
                console.log("suggestedgames", hotGameSelection)
            });
    }

    SendRequest = () => {
        const _this = this;
        const data = {
            NumberOfTravelers: this.state.NumberOfTravelers,
            StartDate: this.state.StartDate,
            EndDate: this.state.EndDate,
            budget: this.state.budget,
            HotelStars: this.state.HotelStars,
            matchCategoryCode: this.state.matchCategoryCode,
            idDepartureCity: this.state.idDepartureCity,
            Message: this.state.Message,

            "offerContacts": [
                {
                    Title: this.state.Title,
                    FirstName: this.state.FirstName,
                    LastName: this.state.LastName,
                    Phone: this.state.Phone,
                    Email: this.state.Email,
                }
            ],
        }
        if (this.state.Title === "" || this.state.FirstName === "" || this.state.LastName === "" || this.state.Phone === "" || this.state.Email === "") {
            ToastAndroid.showWithGravity(
                'please fill out mendatory fields !',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        }
        else {
            post(`/mobile/game/saveBundleMulti`, data)
                .then(response => {
                    var dataContacts = response.OfferContacts.map(function (item) {
                        return {
                            Title: item.Title,
                            FirstName: item.FirstName,
                            LastName: item.LastName,
                            Email: item.Email,
                            Phone: item.Phone,
                        };
                    });
                    this.setState({ OfferContacts: dataContacts });
                    console.log("Message", this.state.Message)
                    console.log("OfferContacts",this.state.OfferContacts)
                    var dataBundle = {
                        StartDate: response.StartDate,
                        EndDate: response.EndDate,
                        NumberOfTravelers: response.NumberOfTravelers,
                        HotelStars: response.HotelStars,
                        matchCategoryCode: response.matchCategoryCode,
                        Message: response.Message,
                        idDepartureCity: response.idDepartureCity,
                        budget: response.budget,
                    };
                    this.setState({ MultiDetails: dataBundle });
                    console.log("MultiDetails",this.state.MultiDetails)
                    this.props.navigation.navigate('confirmation');
                });
        }
    }

    IncrementFan = () => {
        this.setState({ NumberOfTravelers: this.state.NumberOfTravelers + 1 });
    };

    DecrementFan = () => {
        this.setState({ NumberOfTravelers: this.state.NumberOfTravelers - 1 });
    };


    render() {
        const { selectedStartDate } = this.state.StartDate;
        const StartDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Image source={R.images.all_games_bg} style={{ width: '100%' }} />
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', marginLeft: 80, marginTop: -30 }} >Request Trip</Text>
                    </View>
                </View>
                <ScrollView style={{ backgroundColor: "white", width: 310, height: 80, marginLeft: 140, marginTop: -40 }}>
                    <Text style={{ fontSize: 7, marginLeft: 10, fontWeight: "bold", marginTop: 30 }}>{this.state.HomeTeam} VS {this.state.AwayTeam}</Text>
                    <Text style={{ fontSize: 10, marginLeft: 120, fontWeight: "bold", marginTop: -13 }}>{this.state.LeagueName}</Text>
                    <Text style={{ fontSize: 10, marginLeft: 210, fontWeight: "bold", marginTop: -13 }}>{this.state.City}</Text>
                    <Text style={{ fontSize: 10, marginLeft: 260, fontWeight: "bold", marginTop: -13 }}>{moment(new Date(this.state.GameDate)).format('DD-MM')}</Text>
                </ScrollView>
                <Text style={{ color: "black", fontWeight: "bold", marginLeft: 140, marginTop: 50 }}>Travel details </Text>

                {!this.state.isDone ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginLeft: 120 }} />
                    :
                    <>
                        <ScrollView style={{ backgroundColor: "white", width: 310, height: 500, marginLeft: 140, marginTop: 20 }}>
                            <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>TRIP DATES</Text>
                            <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>From</Text>
                            <DatePicker
                                style={{ width: 250, marginLeft: 30, marginTop: 20 }}
                                date={this.state.dateFrom}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2021-05-01"
                                maxDate="2050-06-01"
                                onDateChange={(StartDate) => { this.setState({ StartDate: StartDate }); }}
                                value={this.state.StartDate}
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
                            />
                            <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>To</Text>
                            <DatePicker
                                style={{ width: 250, marginLeft: 30, marginTop: 20 }}
                                date={this.state.dateTo}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2050-06-01"
                                confirmBtnText="Confirm"
                                onDateChange={(EndDate) => this.setState({ EndDate: EndDate })}
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
                            />
                            <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>FANS</Text>
                            <TouchableOpacity style={{ width: 20, marginLeft: 40 }} onPress={this.DecrementFan}>
                                <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 0, marginTop: 11 }}>-</Text>
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 70, marginTop: -25 }}>{this.state.NumberOfTravelers}</Text>
                            <TouchableOpacity style={{ marginLeft: 105, marginTop: -25, width: 20 }} onPress={this.IncrementFan} >
                                <Text style={{ fontSize: 25, fontWeight: "bold" }}>+</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>BUDGET</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                onChangeText={(budget) => this.setState({ budget })}
                                placeholder="1000"
                                required
                                value={this.state.budget}
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
                        <Text style={{ color: "black", fontWeight: "bold", marginLeft: 140, marginTop: 50 }}>Hotel</Text>
                        <ScrollView style={{ backgroundColor: "white", width: 310, height: 300, marginLeft: 140, marginTop: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 20, marginTop: 20 }}>Hotel type</Text>
                            <RadioButtonRN
                                data={dataHotel}
                                selectedBtn={(e) => this.setState({ HotelStars: e.value })}
                                value={dataHotel.value}
                                style={{ marginTop: 20 }}
                            />
                        </ScrollView>
                        <Text style={{ color: "black", fontWeight: "bold", marginLeft: 140, marginTop: 50 }}>Stadium</Text>
                        <ScrollView style={{ backgroundColor: "white", width: 310, height: 350, marginLeft: 140, marginTop: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 20, marginTop: 20 }}>SEATS CATEGORY</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => this.setState({ matchCategoryCode: e.value })}
                                style={{ marginTop: 20 }}
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
                                        Title: item.value,
                                    })
                                }
                            />
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>NAME*</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                value={this.state.FirstName}
                                onChangeText={(FirstName) => this.setState({ FirstName })}
                                style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                            />
                            <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -49 }}></ScrollView>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>SURNAME*</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                value={this.state.LastName}
                                onChangeText={(LastName) => this.setState({ LastName })}

                                style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                            />
                            <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -49 }}></ScrollView>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>EMAIL*</Text>
                            <TextInput
                                autoCapitalize="none"
                                multiline={true}
                                numberOfLines={8}
                                type="email"
                                value={this.state.Email}
                                onChangeText={(Email) => this.setState({ Email })}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                            />
                            <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -49 }}></ScrollView>
                            <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>PHONE NUMBER*</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                value={this.state.Phone}
                                keyboardType="number-pad"
                                onChangeText={(Phone) => this.setState({ Phone })}
                                style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                            />
                            <ScrollView style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -49 }}></ScrollView>
                        </ScrollView>
                        <ScrollView style={{ backgroundColor: "white", width: 310, height: 150, marginLeft: 140, marginTop: 50 }}>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                value={this.state.Message}
                                onChangeText={Message => this.setState({ Message })}
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
        marginTop: 0,
    },
});