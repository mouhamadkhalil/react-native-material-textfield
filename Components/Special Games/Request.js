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
import Lightbox from 'react-native-lightbox-v2';
import DatePicker from 'react-native-datepicker';
import Onspot from "../../assets/images/onspot.png";
import Car1 from "../../assets/images/car1.png";
import Stadium from "../../assets/images/stadium.png"
import Hotel from "../../assets/images/hotel3.png"
import Insurnace from "../../assets/images/insurnace.png";
import Star from "../../assets/images/star.png";
import RadioButtonRN from 'radio-buttons-react-native';
import Chat from "../../helpers/chat";


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
        ],
        date: "2016-05-15",
        fanNumber: 2

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
                this.setState({ Picture1: response.GenericGames[0].MatchBundleHotels[0].Images[3] });
                this.setState({
                    Picture2:
                        response.GamesList.Items[0].MatchBundleDetail[0].GameSeat.StadiumMap_IMG_v3,
                });
            });
    }

    IncrementFan = () => {
        this.setState({ fanNumber: this.state.fanNumber + 1 })
    }

    DecrementFan = () => {
        this.setState({ fanNumber: this.state.fanNumber - 1 })
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
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <ScrollView style={styles.container}>
                {/* <TextInput
                    style={{ paddingLeft: 10, borderRadius: 20, marginLeft: 190, marginTop: 30, backgroundColor: "white", width: 185, height: 35 }}
                    placeholder="  &nbsp;&nbsp;Search your game ... "
                    placeholderTextColor="#46D822"
                    autoCapitalize="none"
                    onChangeText={searchText => {
                        this.setState({ searchText });
                    }}
                    onSubmitEditing={this.searchGame}
                    value={this.state.searchText}
                /> */}

                <Image source={Game} style={{ height: 200 }} />
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
                        onDateChange={(date) => { this.setState({ date: date }) }}
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
                        onDateChange={(date) => { this.setState({ date: date }) }}
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
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: 30, marginLeft: 20 }} />
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 40 }} />
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 60 }} />
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 80 }} />
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 100 }} />
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: 20, marginLeft: 20 }} />
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 40 }} />
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 60 }} />
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 80 }} />
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: 20, marginLeft: 20 }} />
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 40 }} />
                    <Image source={Star} style={{ width: 15, height: 15, marginTop: -15, marginLeft: 60 }} />
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
        marginBottom: 30,
        backgroundColor: "#F5F7EC",
    },
});