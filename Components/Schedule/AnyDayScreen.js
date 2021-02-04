import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Lightbox from 'react-native-lightbox-v2';
import Chat from "../../assets/Images_Design/chat1.png";
import AwesomeAlert from "react-native-awesome-alerts";
import Messanger from "../../assets/images/messanger.png";
import Feedback from "../../assets/images/feedback.png";
import Whatsapp from "../../assets/images/whatsapp.png";
import DownArrow from "../../assets/Images_Design/arrow_down.png";

const sourceFile = require('../../services.js');

export default class AnyDayScreen extends React.Component {

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
        showAlert: false,
    };

    showAlert = () => {
        this.setState({
            showAlert: true,
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false,
        });
    };


    renderCustomAlertView = () => {
        return (
            <>
                <View style={{ height: 200, width: 200 }}>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginLeft: 80 }}>Messanger</Text>
                        <Image source={Messanger} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginLeft: 80 }}>Whatsapp</Text>
                        <Image source={Whatsapp} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginLeft: 80 }}>Feedback</Text>
                        <Image source={Feedback} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                </View>

            </>
        );
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
                this.setState({ Picture1: response.GenericGames[0].MatchBundleHotels[0].Images[1] });
                this.setState({ Picture2: response.GenericGames[0].MatchBundleHotels[0].Images[2] });
                this.setState({ Picture3: response.GenericGames[0].MatchBundleHotels[0].Images[3] });
                this.setState({ Picture4: response.GenericGames[0].MatchBundleHotels[0].Images[4] });
            });
    }

    searchGame = () => {
        const urlSearch = `${API_URL}/mobile/game/search?text=${this.state.searchText}`;
        fetch(urlSearch, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
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

    render() {
        const { showAlert } = this.state;
        return (
            <ScrollView style={styles.container}>
                <Text
                    style={{
                        marginTop: 60,
                        color: "#4c0099",
                        fontSize: 70,
                        marginLeft: 200
                    }}
                >
                    DAY 3
                </Text>
                <Text style={{ color: "#4c0099", fontSize: 23, marginLeft: 195 }}>
                    3 planned activities
                </Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('activity card')}>
                    <Image source={DownArrow} style={{ marginLeft: 290, marginTop: 20, marginBottom: 20 }} />
                </TouchableOpacity>

                <ScrollView
                    style={{
                        backgroundColor: "#e0e0e0",
                        marginTop: 10,
                        width: 310,
                        height: 80,
                        marginLeft: 140
                    }}
                >
                    <Text
                        style={{
                            color: "#cc00cc",
                            marginLeft: 50,
                            marginTop: 20,
                            width: 190,
                        }}
                    >
                        Chance of rain, don't forget your umbrella!
          </Text>
                    <Text
                        style={{
                            fontSize: 35,
                            color: "#4c0099",
                            marginLeft: 250,
                            marginTop: -42,
                        }}
                    >
                        23&deg;
          </Text>
                </ScrollView>
                <ScrollView
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
                                <Image source={this.state.Picture3 ? { uri: this.state.Picture3 } : null}
                                    style={{ width: 150, height: 180, marginLeft: 0 }} />
                            </Lightbox>
                            :
                            <ActivityIndicator size="small" color="blue"
                                style={{ marginTop: 80, marginLeft: -20 }}
                            />}
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView
                    style={{
                        marginTop: -160,
                        backgroundColor: "white",
                        width: 150,
                        height: 160,
                        marginLeft: 300,
                    }}
                >
                    <TouchableOpacity>
                        {this.state.isDone ?
                            <Lightbox >
                                <Image source={this.state.Picture2 ? { uri: this.state.Picture2 } : null}
                                    style={{ width: 150, height: 180, marginLeft: 0 }} />
                            </Lightbox>
                            :
                            <ActivityIndicator size="small" color="blue"
                                style={{ marginTop: 80, marginLeft: -20 }}
                            />}
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView
                    style={{
                        marginTop: 10,
                        backgroundColor: "white",
                        width: 310,
                        height: 160,
                        marginLeft: 140,
                    }}
                >
                    <TouchableOpacity>
                        {this.state.isDone ?
                            <Lightbox >
                                <Image source={this.state.Picture1 ? { uri: this.state.Picture1 } : null}
                                    style={{ width: 310, height: 180, marginLeft: 0 }} />
                            </Lightbox>
                            :
                            <ActivityIndicator size="small" color="blue"
                                style={{ marginTop: 80, marginLeft: 0 }}
                            />}
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView
                    style={{
                        marginTop: 10,
                        backgroundColor: "white",
                        width: 150,
                        height: 160,
                        marginLeft: 140,
                    }}
                >
                    <TouchableOpacity>
                        {this.state.isDone ?
                            <Lightbox >
                                <Image source={this.state.Picture4 ? { uri: this.state.Picture4 } : null}
                                    style={{ width: 150, height: 180, marginLeft: 0 }} />
                            </Lightbox>
                            :
                            <ActivityIndicator size="small" color="blue"
                                style={{ marginTop: 80, marginLeft: -20 }}
                            />}
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView
                    style={{
                        marginTop: -160,
                        backgroundColor: "white",
                        width: 150,
                        height: 160,
                        marginLeft: 300,
                    }}
                >
                    <TouchableOpacity>
                        {this.state.isDone ?
                            <Lightbox >
                                <Image source={this.state.Picture2 ? { uri: this.state.Picture2 } : null}
                                    style={{ width: 150, height: 180, marginLeft: 0 }} />
                            </Lightbox>
                            :
                            <ActivityIndicator size="small" color="blue"
                                style={{ marginTop: 80, marginLeft: -20 }}
                            />}
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView
                    style={{
                        marginTop: 10,
                        backgroundColor: "white",
                        width: 310,
                        height: 160,
                        marginLeft: 140,
                    }}
                >
                    <TouchableOpacity>
                        {this.state.isDone ?
                            <Lightbox >
                                <Image source={this.state.Picture3 ? { uri: this.state.Picture3 } : null}
                                    style={{ width: 310, height: 180, marginLeft: 0 }} />
                            </Lightbox>
                            :
                            <ActivityIndicator size="small" color="blue"
                                style={{ marginTop: 80, marginLeft: 0 }}
                            />}
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView
                    style={{
                        marginTop: 10,
                        backgroundColor: "white",
                        width: 310,
                        height: 160,
                        marginLeft: 140,
                    }}
                >
                    <TouchableOpacity>
                        {this.state.isDone ?
                            <Lightbox >
                                <Image source={this.state.Picture1 ? { uri: this.state.Picture1 } : null}
                                    style={{ width: 310, height: 180, marginLeft: 0 }} />
                            </Lightbox>
                            :
                            <ActivityIndicator size="small" color="blue"
                                style={{ marginTop: 80, marginLeft: 0 }}
                            />}
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity onPress={() => {
                    this.showAlert();
                }}>
                    <Image source={Chat} style={{ width: 100, height: 100, marginLeft: 380 }} />
                </TouchableOpacity>
                <ScrollView style={{ backgroundColor: "red" }}>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="CHAT WITH US ?"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        customView={this.renderCustomAlertView()}
                    />
                </ScrollView>
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
});
