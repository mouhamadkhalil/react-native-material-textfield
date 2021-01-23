import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    Linking,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Flyfoot from "../../assets/Images_Design/flyfoot1.png";
import Flag2 from "../../assets/Images_Design/flag2.png";
import Chat from "../../assets/Images_Design/msg1.png";
import Question from "../../assets/Images_Design/faq1.png";
import Setting from "../../assets/Images_Design/setting1.png";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Arrow1 from "../../assets/Images_Design/arrow_right1.png";
import Arrow2 from "../../assets/Images_Design/arrow_right2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/notification1.png";

const sourceFile = require('../../services.js');

export default class Info extends React.Component {

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
        StadeCity: ""
    };

    FAQ = () => {
        this.props.navigation.navigate('FAQ');
    }

    searchGame = () => {
        const urlSearch = `${API_URL}/mobile/game/search?text=${this.state.searchText}`
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
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity onpress={() => Linking.openURL('http://google.com')}>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 70 }}>
                        <Image source={Flyfoot} style={{ width: 20, height: 25, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ marginLeft: 100, color: "blue", fontSize: 15, marginLeft: 60, marginTop: -25 }}
                            onPress={() => {
                                Linking.openURL('https://fly-foot.com/en/about/aboutus');
                            }}>
                            About us
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>

                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                        <Image source={Chat} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -25 }}
                            onPress={() => {
                                Linking.openURL('https://fly-foot.com/en/about/contact');
                            }}>
                            Get in touch
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.FAQ}>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                        <Image source={Question} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>FAQ</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                        <Image source={Setting} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}
                            onPress={() => {
                                Linking.openURL('https://fly-foot.com/en/about/TC');
                            }}>
                            Terms & conditions
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
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
        marginTop: 0,
        marginBottom: 10,
        backgroundColor: "#F5F7EC",
    },
});
