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
    AsyncStorage,
    SafeAreaView
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Image1 from "../../assets/games/image1.png";

import Chat from "../../assets/Images_Design/chat1.png";
import Messanger from "../../assets/images/messanger.png";
import Feedback from "../../assets/images/feedback.png";
import Whatsapp from "../../assets/images/whatsapp.png";
import AwesomeAlert from "react-native-awesome-alerts";

const sourceFile = require('../../services.js');

export default class MyTrips extends React.Component {

    state = {
        UpComingTrips: [],
        SavedTrips: [],
        PastTrips: [],
        upcomingFlag: false,
        savedFlag: false,
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

    getToken = async () => AsyncStorage.getItem('token');

    componentDidMount = async () => {
        var token = await this.getToken();
        fetch('https://apitest.fly-foot.com/api/mobile/game/myTrips', {
            method: 'GET',
            headers: {
                // "Accept": 'application/json',
                // "Content-Type": 'application/json',
                // "Authorization": 'Bearer ' + token,

                "Content-Type": sourceFile.Content_Type,
                "Accept": sourceFile.Accept,
                "ff_version": sourceFile.ff_version,
                "ff_language": sourceFile.ff_language,
                "source": sourceFile.source,
                "Authorization": 'Bearer ' + token
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
                this.setState({ UpComingTrips: response.UpComing })
                this.setState({ PastTrips: response.Saved })
                this.setState({ SavedTrips: response.Past })
                this.setState({ upcomingFlag: true })
            });
    }

    UpcomingTrips = () => {
        this.setState({ upcomingFlag: true })
        this.setState({ savedFlag: false })
        this.setState({ pastFlag: false })
    }

    SavedTrips = () => {
        this.setState({ savedFlag: true })
        this.setState({ upcomingFlag: false })
        this.setState({ pastFlag: false })
    }

    PastTrips = () => {
        this.setState({ pastFlag: true })
        this.setState({ upcomingFlag: false })
        this.setState({ savedFlag: false })
    }

    render() {
        const { showAlert } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: "lightblue", marginTop: 0, height: 200 }}>
                    <Text style={styles.pageTitleText}>
                        My trips
                    </Text>
                </View>
                <View style={{ backgroundColor: "blue", marginLeft: 140, marginTop: -20, width: 300, height: 50 }}>
                    <TouchableOpacity style={{ width: 100, height: 70 }} onPress={this.SavedTrips}>
                        <Text style={{ color: "white", fontWeight: "bold", marginTop: 10, marginLeft: 40 }}>SAVED</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: -59, marginLeft: 110, width: 100, height: 70 }} onPress={this.UpcomingTrips}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>UPCOMING</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 210, marginTop: -70, width: 90, height: 70 }} onPress={this.PastTrips}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>PAST</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 150 }}>
                    {this.state.upcomingFlag ?
                        <Text style={{ marginLeft: 40, marginTop: 150, fontSize: 19, fontWeight: "bold", color: "gray" }}>No Upcoming Trips Found!</Text> :
                        null
                    }
                </View>
                <View style={{ marginLeft: 165 }}>
                    {this.state.savedFlag ?
                        <Text style={{ marginLeft: 40, marginTop: 150, fontSize: 19, fontWeight: "bold", color: "gray" }}>No Saved Trips Found!</Text> :
                        null
                    }
                </View>
                <View style={{ marginLeft: 165 }}>
                    {this.state.pastFlag ?
                        <Text style={{ marginLeft: 40, marginTop: 150, fontSize: 19, fontWeight: "bold", color: "gray" }}>No Past Trips Found!</Text> :
                        null
                    }
                </View>
                <TouchableOpacity style={{ marginLeft: 360, marginTop: 110 }} onPress={() => {
                    this.showAlert();
                }}>
                    <Image source={Chat} style={{ width: 100, height: 100, marginTop: 10 }} />
                </TouchableOpacity>
                <View>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="CHAT WITH US ?"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        customView={this.renderCustomAlertView()}                      
                    />
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
        marginTop: 110,
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 250
    },
});