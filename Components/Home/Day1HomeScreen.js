import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
    Button,
    AsyncStorage,
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

const sourceFile = require('../../services.js');

export default class Day1HomeScreen extends React.Component {

    state = {
        Picture1: "",
        Picture2: "",
        Picture3: "",
        Picture4: "",
        isDone: false,
        // isLoggedIn: false,
        // loginChecked: false,
        searchText: "",
        idMatch: "",
        City: "",
        Stade: "",
        GameDate: "",
        LeaguesName: "",
        GameCode: "",
        HomeTeam: "",
        AwayTeam: "",
        StadeCity: ""
    };

    //   async getItem(token){
    //     console.log("the state is : ",this.state.isLoggedIn)
    //     try{
    //         const value = await AsyncStorage.getItem(token);
    //         console.log("my token is : ",value);
    //         if(value !== null){
    //             this.setState({
    //                 isLoggedIn: true,
    //                 loginChecked: true
    //             })
    //         }
    //         else{
    //             this.setState({
    //                 isLoggedIn: false,
    //                 loginChecked: true
    //             })
    //         }
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    //     console.log(this.state.isLoggedIn)
    // }


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
                // this.setState({ isLoggedIn: true });
                // this.setState({ loginChecked: true });
            });

        // this.getItem(this.state.Token);
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

    render() {
        return (
            <ScrollView style={styles.container}>
                <TextInput
                    style={{ paddingLeft: 10, borderRadius: 20, marginLeft: 190, marginTop: 45, backgroundColor: "white", width: 185, height: 35 }}
                    placeholder="  &nbsp;&nbsp;Search your game ... "
                    placeholderTextColor="#46D822"
                    autoCapitalize="none"
                    onChangeText={searchText => {
                        this.setState({ searchText });
                    }}
                    onSubmitEditing={this.searchGame}
                    value={this.state.searchText}
                />

                <Text
                    style={{
                        alignContent: "center",
                        color: "#4c0099",
                        fontWeight: "bold",
                        marginTop: 30,
                        fontSize: 19,
                        marginLeft: 215
                    }}
                >
                    MONDAY 12 SEPT
          </Text>
                <TouchableOpacity onPress={this.searchGame} style={{ width: 40, marginLeft: 380, marginTop: -95 }}>
                    <Image source={Search} style={{ marginTop: 0, marginLeft: 0, height: 40, width: 40 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("hello Im Notification !")} style={{ width: 40, marginLeft: 430, marginTop: -30 }}>
                    <Image source={Notifictaion} style={{ marginTop: 0, marginLeft: 0, height: 20, width: 20 }} />
                </TouchableOpacity>
                <View style={{ marginTop: -24, width: 190 }}>
                    <TouchableOpacity>
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: 0 }} />
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        marginTop: 60,
                        color: "#4c0099",
                        fontSize: 70,
                        marginLeft: 140
                    }}
                >
                    Flight day
        </Text>
                <Text style={{ color: "#4c0099", fontSize: 23, marginLeft: 195 }}>
                    3 planned activities
        </Text>
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
                        Chance of rain in Barcelona, don't forget your umbrella!
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
                <TouchableOpacity>
                    <Image source={Chat} style={{ width: 100, height: 100, marginLeft: 380 }} />
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1100,
        marginLeft: -110,
        width: 500,
        marginTop: 30,
        marginBottom: 0,
        backgroundColor: "#F5F7EC",
    },
});
