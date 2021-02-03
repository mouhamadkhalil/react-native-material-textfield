import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    Button,
    ScrollView,
    View,
    CheckBox,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Arrow1 from "../../assets/Images_Design/arrow_right1.png";
import Arrow2 from "../../assets/Images_Design/arrow_right2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/notification1.png";
import Chat from "../../assets/Images_Design/chat1.png";
import Lightbox from 'react-native-lightbox-v2';
import Game from "../../assets/images/football.jpg";
import Onspot from "../../assets/images/onspot.png";
import Car1 from "../../assets/images/car1.png";
import DatePicker from 'react-native-datepicker';
import Stadium from "../../assets/images/stadium.png"
import Hotel from "../../assets/images/hotel3.png"
import Insurnace from "../../assets/images/insurnace.png";
import RadioButtonRN from 'radio-buttons-react-native';
import GiftCard from "../../assets/games/GiftCard.png";

const sourceFile = require('../../services.js');

const data = [
    {
        label: 'Category 1  +442$'
    },
    {
        label: 'Category 2 +222$'
    },
    {
        label: 'Category 3  +0$'
    },
];

export default class AnyDayHomeScreen extends React.Component {

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
        GameDate: "",
        LeaguesName: "",
        GameCode: "",
        HomeTeam: "",
        AwayTeam: "",
        StadeCity: "",
        date: "2016-05-15",
        fanNumber: 2,
        roomNumber: 1,
        Infant1: false,
        Infant2: false

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
                console.log("test", response.GenericGames[0].MatchBundleHotels[0]);
                this.setState({ Picture1: response.GamesList.Items[0].MatchBundleDetail[0].GameSeat.StadiumMap_IMG_v3 });
                this.setState({ Picture2: response.GamesList.Items[1].MatchBundleDetail[0].GameSeat.StadiumMap_IMG_v3 });
                this.setState({ Picture3: response.GenericGames[0].MatchBundleHotels[0].Images[3] });
                this.setState({ Picture4: response.GenericGames[0].MatchBundleHotels[0].Images[4] });
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
                this.setState({ GameDate: response[0].GameDate });
                this.setState({ LeaguesName: response[0].LeaguesName });
                this.setState({ GameCode: response[0].GameCode });
                this.setState({ HomeTeam: response[0].HomeTeam });
                this.setState({ AwayTeam: response[0].AwayTeam });
                this.setState({ StadeCity: response[0].StadeCity });
            });
    };

    Cancel = () => {
        this.props.navigation.navigate('tripoverview');
    }

    Flight = () => {
        this.props.navigation.navigate('flight');
    }

    IncrementFan = () => {
        this.setState({ fanNumber: this.state.fanNumber + 1 })
    }

    DecrementFan = () => {
        this.setState({ fanNumber: this.state.fanNumber - 1 })
    }

    IncrementRoom = () => {
        this.setState({ roomNumber: this.state.roomNumber + 1 })
    }

    DecrementRoom = () => {
        this.setState({ roomNumber: this.state.roomNumber - 1 })
    }

    Infants1 = () => {
        this.setState({ Infant1: true })
    }

    Infants2 = () => {
        this.setState({ Infant2: true })
    }

    DisableInfant = () => {
        this.setState({ Infant1: false })
        this.setState({ Infant2: false })

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ImageBackground source={GiftCard} style={styles.headerBg}>
                    <Text style={styles.pageTitleText}>
                        Customize Trip
                    </Text>
                </ImageBackground>
                <View style={{ backgroundColor: "white", width: 310, height: 80, marginLeft: 140, marginTop: -40 }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 10, marginTop: 15, fontSize: 9 }}>DATE</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 60, marginTop: -12, fontSize: 9 }}>MATCH</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 150, marginTop: -12, fontSize: 9 }}>CITY</Text>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 210, marginTop: -12, fontSize: 9 }}>DAYS</Text>
                    <Text style={{ color: "#8CD222", fontWeight: "bold", marginLeft: 250, marginTop: -12, fontSize: 9 }}>910$/fan</Text>
                    <Text style={{ fontSize: 9, marginLeft: 10, fontWeight: "bold", marginTop: 18, color: "blue" }}>13.06.21</Text>
                    <Text style={{ fontSize: 9, marginLeft: 60, fontWeight: "bold", marginTop: -12, color: "blue" }}>England vs Croatia</Text>
                    <Text style={{ fontSize: 9, marginLeft: 150, fontWeight: "bold", marginTop: -12, color: "blue" }}>Barcelona</Text>
                    <Text style={{ fontSize: 9, marginLeft: 210, fontWeight: "bold", marginTop: -12, color: "blue" }}>04</Text>
                    <Text style={{ fontSize: 9, marginLeft: 250, fontWeight: "bold", marginTop: -12, color: "blavk" }}>1912$ Total *</Text>
                </View>
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginLeft: 140, marginTop: 50 }}>
                    Semi-Package Details
                </Text>
                <View style={{ backgroundColor: "white", width: 310, height: 350, marginLeft: 140, marginTop: 20 }}>
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
                    <TouchableOpacity style={{ marginLeft: 105, marginTop: -25, width: 20 }} onPress={this.IncrementFan}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: "blue" }}>+</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginLeft: 140, marginTop: 50 }}>
                    Hotel
                </Text>
                <View style={{ backgroundColor: "white", width: 310, height: 800, marginLeft: 140, marginTop: 20 }}>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>ROOMS</Text>
                    <TouchableOpacity style={{ width: 20, marginLeft: 40 }} onPress={this.DecrementRoom}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 0, marginTop: 11 }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 70, marginTop: -25 }}>{this.state.roomNumber}</Text>
                    <TouchableOpacity style={{ marginLeft: 105, marginTop: -25, width: 20 }} onPress={this.IncrementRoom}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: "blue" }}>+</Text>
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 20, color: "gray" }}>#1</Text>
                    <View style={{ width: 80, marginLeft: 20, marginTop: 20 }}>
                        <Button
                            title="Single"
                            color="#8CD222"
                            onPress={this.DisableInfant}
                        />
                    </View>
                    <View style={{ width: 80, marginLeft: 120, marginTop: -34 }}>
                        <Button
                            title="Double"
                            color="#8CD222"
                            onPress={this.DisableInfant}
                        />
                    </View>
                    <View style={{ width: 80, marginLeft: 220, marginTop: -34 }}>
                        <Button
                            title="Triple"
                            color="#8CD222"
                            onPress={this.Infants1}
                        />
                    </View>

                    {this.state.Infant1 ?
                        <>
                            <CheckBox
                                selected="true"
                                style={{ marginLeft: 15, marginTop: 20 }}
                            />
                            <Text style={{ marginTop: -27, marginLeft: 47 }}>Infant Bed</Text>
                        </>
                        :
                        null}

                    <Text style={{ marginLeft: 20, color: "gray", marginTop: 40 }}>#2</Text>
                    <View style={{ width: 80, marginLeft: 20, marginTop: 20 }}>
                        <Button
                            title="Single"
                            color="#8CD222"
                            onPress={this.DisableInfant}
                        />
                    </View>
                    <View style={{ width: 80, marginLeft: 120, marginTop: -34 }}>
                        <Button
                            title="Double"
                            color="#8CD222"
                            onPress={this.DisableInfant}
                        />
                    </View>
                    <View style={{ width: 80, marginLeft: 220, marginTop: -34 }}>
                        <Button
                            title="Triple"
                            color="#8CD222"
                            onPress={this.Infants2}
                        />

                        {this.state.Infant2 ?
                            <>
                                <CheckBox
                                    selected="true"
                                    style={{ marginLeft: -205, marginTop: 20 }}
                                />
                                <Text style={{ marginTop: -27, marginLeft: -172 }}>Infant Bed</Text>
                            </>
                            :
                            null}
                    </View>

                    <View style={{ marginLeft: 20, marginTop: 40, width: 80 }}>
                        <Button
                            title="BROWSE"
                            color="#8CD222"
                            onPress={this.Browser}
                        />
                    </View>
                </View>
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginLeft: 140, marginTop: 50 }}>
                    Stadium
                </Text>
                <View style={{ backgroundColor: "white", width: 310, height: 500, marginLeft: 140, marginTop: 20 }}>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 20, marginLeft: 20 }}>WEMBLEY</Text>
                    <View
                        style={{
                            marginTop: 30,
                            backgroundColor: "white",
                            width: 150,
                            height: 160,
                            marginLeft: 140,
                        }}
                    >
                        <TouchableOpacity>
                            {this.state.isDone ?
                                <Lightbox >
                                    <Image source={this.state.Picture1 ? { uri: this.state.Picture1 } : null}
                                        style={{ width: 180, height: 180, marginLeft: -60 }} />
                                </Lightbox>
                                :
                                <ActivityIndicator size="small" color="blue"
                                    style={{ marginTop: 80, marginLeft: -20 }}
                                />}
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginTop: 40, marginLeft: 20 }}>SEATING OPTIONS</Text>
                    <RadioButtonRN
                        data={data}
                        selectedBtn={(e) => this.setState({ Picture1: this.state.Picture2 })}
                        style={{ marginTop: 20 }}
                    />
                </View>
                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 140, marginTop: 50 }}>PERKS</Text>
                <TouchableOpacity>
                    <Image source={Onspot} style={{ marginLeft: 140, marginTop: 10 }} />
                    <Text style={{ marginLeft: 143, color: "blue", fontWeight: "bold", width: 50, fontSize: 9 }}>
                        On Spot Service
                    </Text>
                </TouchableOpacity>
                <View style={{ width: 130, marginLeft: 160, marginTop: 20 }}>
                    <Button
                        title="CANCEL"
                        color="black"
                        onPress={this.Cancel}
                    />
                </View>
                <View style={{ width: 130, marginLeft: 310, marginTop: -34 }}>
                    <Button
                        title="CONTINUE"
                        color="#8CD222"
                        onPress={this.Continue}
                    />
                </View>
                <View style={{ marginBottom: 50 }}></View>
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
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
});
