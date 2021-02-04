import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    View,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Button,
    Dimensions
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import LocationIcon from "../../assets/Images_Design/location-icon.png";
import CalendarIcon from "../../assets/Images_Design/calendar.png";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/bell.png";
import Card1 from "../../assets/Images_Design/card1.png";
import Card2 from "../../assets/Images_Design/card2.png";
import Btn1 from "../../assets/Images_Design/btn1.png";
import Btn2 from "../../assets/Images_Design/btn2.png";
import BtnBg from "../../assets/Images_Design/btn-bg.png";
import Arrow from "../../assets/Images_Design/arrow_right1.png";
import Liverppol from "../../assets/Images_Design/liverpool.png";
import Real from "../../assets/Images_Design/real.png";
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Image1 from "../../assets/games/image1.png";
import Image2 from "../../assets/games/image2.png";
import Image3 from "../../assets/games/image3.png";
import Image4 from "../../assets/games/image4.png";
import Image5 from "../../assets/games/image5.png";
import Image6 from "../../assets/games/image6.png";
import Image7 from "../../assets/games/image7.png";
import Image8 from "../../assets/games/image8.png";
import Image9 from "../../assets/games/image9.png";
import Image10 from "../../assets/games/image10.png";
import Image11 from "../../assets/games/image11.png";
import Image12 from "../../assets/games/image12.png";
import Image13 from "../../assets/games/image13.png";
import Image14 from "../../assets/games/image14.png";
import Image15 from "../../assets/games/image15.png";
import headerBg from "../../assets/images/leagues-mobile-header-background.jpg";
import Autocomplete from "react-native-autocomplete-input";

import Chat from "../../assets/Images_Design/chat1.png";
import Messanger from "../../assets/images/messanger.png";
import Feedback from "../../assets/images/feedback.png";
import Whatsapp from "../../assets/images/whatsapp.png";
import AwesomeAlert from "react-native-awesome-alerts";

const sourceFile = require('../../services.js');
const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemWeight = Math.round(itemWidth * 3 / 4);

export default class Leagues extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;
        this.state = {
            allLeagues: [{
                ID: "",
                Value: "",
                disabled: "",
                ExtraField: "",
            }],
            showAlert: false,
        };
    }

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
        const url = `${API_URL}/mobile/leagues/all`;
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
                var data = response.map(function (item) {
                    return {
                        ID: item.idMatch,
                        Value: item.Value,
                        disabled: item.disabled,
                        ExtraField: item.ExtraField,
                    };
                });
                this.setState({ allLeagues: data });
            });
    }

    render() {
        const { showAlert } = this.state;
        return (
            <ScrollView style={styles.container}>
                <ImageBackground source={headerBg} style={styles.headerBg}>
                    <Text style={styles.pageTitleText}>
                        LEAGUES
                    </Text>
                </ImageBackground>
                <Text style={styles.sectionHeading}>European</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image1} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image2} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image3} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>Spain</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image4} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image5} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image6} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>Uk</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image7} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image8} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>Italy</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image9} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>Germany</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image10} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>France</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image11} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>International</Text>
                <View style={{ ...styles.teamsWrap, marginBottom: 80 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image12} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image13} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image14} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image15} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ marginLeft: 250, marginTop: -80 }} onPress={() => {
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
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fafafa",
    },
    sectionHeading: {
        fontWeight: "bold",
        fontSize: 26,
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto"
    },
    teamImage: {
        marginTop: 50,
        width: 70,
        height: 70,
        marginLeft: 20,
        marginRight: 20
    },
    teamCircle: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    teamsWrap: {
        flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"
    },
    headerBg: {
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 20,
        width: 20,
    },
    pageTitleBar: {
        backgroundColor: "black",
        height: 8,
        width: 30,
        marginLeft: 30,
        marginTop: 35
    },
    pageTitleText: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold",
    },
    specialGameMeta: {
        color: "white", fontSize: 18
    }
});