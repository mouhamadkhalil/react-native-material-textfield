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
import Stadium from "../../assets/images/stadium.png";
import Hotel from "../../assets/images/hotel3.png";
import Insurnace from "../../assets/images/insurnace.png";
import GiftCard from "../../assets/games/GiftCard.png";
import Chat from "../../helpers/chat";

const sourceFile = require('../../helpers/services.js');

export default class BookNow extends React.Component {

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
        date: "2016-05-15"
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
                <ImageBackground source={GiftCard} style={styles.headerBg}>
                    <Text style={styles.pageTitleText}>
                        Watch Blaugrana in Camp Nou
                    </Text>
                    <Text style={styles.pageText}>#FLYFOOTPROMISE</Text>
                </ImageBackground>
                <ScrollView style={{ backgroundColor: "white", width: 310, height: 80, marginLeft: 140, marginTop: -40 }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 10, marginTop: 15 }}>MATCH</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 120, marginTop: -18 }}>CITY</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 180, marginTop: -18 }}>DAYS</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 240, marginTop: -19 }}>PRICE</Text>
                    <Text style={{ fontSize: 9, marginLeft: 10, fontWeight: "bold", marginTop: 12 }}>FC Barcelona vs  N/A</Text>
                    <Text style={{ fontSize: 9, marginLeft: 120, fontWeight: "bold", marginTop: -12 }}>Barcelona</Text>
                    <Text style={{ fontSize: 9, marginLeft: 180, fontWeight: "bold", marginTop: -12 }}>04</Text>
                    <Text style={{ fontSize: 9, marginLeft: 240, fontWeight: "bold", marginTop: -12, color: "#8CD222" }}>999$ Total *</Text>
                </ScrollView>
                <Text style={{ color: "black", fontWeight: "bold", marginLeft: 140, marginTop: 50 }}>Travel details </Text>
                <ScrollView style={{ backgroundColor: "white", width: 310, height: 100, marginLeft: 140, marginTop: 20 }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 15 }}>FANS</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 170, marginTop: -16 }}>FLIGHT* </Text>
                    <TouchableOpacity style={{ width: 20, marginLeft: 40 }}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 0, marginTop: 11 }}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 100, marginTop: -31, width: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>+</Text>
                    </TouchableOpacity>

                    <Text style={{ fontWeight: "bold", marginLeft: 70, marginTop: -28 }}>01</Text>
                    <TextInput
                        placeholder="Where are you departing from ?"
                        style={{ marginLeft: 170, fontSize: 9, marginTop: -22 }}></TextInput>
                    <ScrollView style={{ backgroundColor: "black", width: 130, height: 1, marginLeft: 170, marginTop: -5 }}></ScrollView>
                </ScrollView>
                <ScrollView style={{ backgroundColor: "white", width: 310, height: 430, marginLeft: 140, marginTop: 50 }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 15 }}>HOTEL</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 170, marginTop: -17 }}>SEATING OPTIONS </Text>
                    <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 30, marginTop: 10 }}>Arc La Rambla </Text>
                    <Text style={{ color: "blue", fontWeight: "bold", marginLeft: 170, marginTop: -19 }}>Category 3 </Text>
                    <Text style={{ color: "gray", marginLeft: 60, marginTop: 30, fontSize: 12 }}>Breakfast </Text>
                    <Text style={{ color: "gray", marginLeft: 170, marginTop: -18, fontSize: 12 }}>Camp Nou, Barcelona </Text>
                    <Text style={{ color: "gray", marginLeft: 170, marginTop: 5, fontSize: 12 }}>1 Seat </Text>
                    <TouchableOpacity>
                        {this.state.isDone ?
                            <Lightbox >
                                <Image source={this.state.Picture1 ? { uri: this.state.Picture1 } : null}
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
                                <Image source={this.state.Picture2 ? { uri: this.state.Picture2 } : null}
                                    style={{ width: 120, height: 120, marginLeft: 170, marginTop: -120 }} />
                            </Lightbox>
                            :
                            <ActivityIndicator size="small" color="blue"
                                style={{ marginTop: 80, marginLeft: 0 }}
                            />}
                    </TouchableOpacity>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 35 }}>PERKS</Text>
                    <Image source={Onspot} style={{ marginLeft: 20, marginTop: 10 }} />
                    <Image source={Hotel} style={{ marginLeft: 70, marginTop: -42 }} />
                    <Image source={Car1} style={{ marginLeft: 130, marginTop: -42 }} />
                    <Image source={Stadium} style={{ marginLeft: 190, marginTop: -41 }} />
                    <Image source={Insurnace} style={{ marginLeft: 250, marginTop: -41 }} />
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
                        title="BOOK NOW"
                        color="#8CD222"
                    />
                </ScrollView>
                <View style={{ marginLeft: 100, marginTop: 20 }}>
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
        marginTop: -50,
        marginBottom: 30,
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